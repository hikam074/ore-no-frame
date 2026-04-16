'use client'

import { createSupabaseBrowser } from "@/lib/supabase/client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { EyeClosedIcon, EyeIcon, HouseIcon } from "lucide-react"
import { showError, showGlobalLoading } from "@/lib/toast"
import { setFlash } from "@/lib/flash"


export default function Page() {
    const supabase = createSupabaseBrowser()
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const handleLogin = async () => {
        showGlobalLoading("Logging in...")
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password
            })
            if (error) {
                throw new Error(error.message)
            }
            else {
                setFlash("success", "Login success! Welcome");

                await router.refresh();
                router.push("/");
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                showError(err.message)
            } else {
                showError("Login failed")
            }
        }

    }
    return (
        <article className="flex flex-col gap-10 justify-center items-center text-center p-8 text-sekunder rounded shadow-lg">
            <Link href="/" className="flex gap-2">
                <HouseIcon className="" />
                <span className="my-auto">サイドフレーム</span>
            </Link>
            <header className="w-full">
                <h1 className="text-xl font-bold">Welcome Back!</h1>
                <p className="font-light text-primer">Login</p>
            </header>
            <section className="w-full space-y-6">
                <div className="w-full text-primer">
                    <label htmlFor="email" className="bg-white px-1 absolute -translate-y-3 translate-x-2" >Email</label>
                    <input name="email" type="email" onChange={e => setEmail(e.target.value)} className="w-full border border-tersier p-2 pt-3 rounded-md" />
                </div>
                <div className="w-full text-primer">
                    <label htmlFor="password" className="bg-white px-1 absolute -translate-y-3 translate-x-2" >Password</label>
                    <input name="password" type={isPasswordVisible ? "text" : "password"} onChange={e => setPassword(e.target.value)} className="w-full border border-tersier p-2 pt-3 rounded-md" />
                    <div className="w-full flex justify-end px-2">
                        <EyeIcon width={28} height={28} className={`bg-white p-1 absolute -translate-y-9 ${isPasswordVisible ? "" : "hidden"}`} onClick={() => setIsPasswordVisible(false)}/>
                        <EyeClosedIcon width={28} height={28} className={`bg-white p-1 absolute -translate-y-9 ${isPasswordVisible ? "hidden" : ""}`} onClick={() => setIsPasswordVisible(true)}/>
                    </div>
                </div>
                <button onClick={handleLogin} className="p-2 bg-sekunder w-full rounded-md text-white font-semibold">Login</button>
            </section>
        </article>
    )
}