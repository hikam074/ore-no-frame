'use client'

import { createSupabaseBrowser } from "@/lib/supabase/client"
import { ChangeEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { capitalize } from "@/utils/capitalize"
import Link from "next/link"
import { House } from "lucide-react"
import { showError, showGlobalLoading } from "@/lib/toast"
import { setFlash } from "@/lib/flash"

export default function LoginPage() {
    const supabase = createSupabaseBrowser()
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const handleLogin = async () => {
        showGlobalLoading("Logging in...")
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password
            })
            if (error) {
                // setFlash("error", "Login gagal");
                // return;
                throw new Error(error.message)
            }
            // dismissLoading()

            setFlash("success", "Login berhasil");

            router.push("/");
            router.refresh();

        } catch (err: unknown) {
            if (err instanceof Error) {
                showError(err.message)
            } else {
                showError("Login gagal")
            }
        }

    }


    return (
        <article className="flex flex-col gap-10 justify-center items-center text-center bg-surface p-8 text-accent rounded shadow-lg">
            <Link href="/" className="flex gap-2">
                <House className="" />
                <span className="my-auto">俺のフレーム</span>
            </Link>
            <header className="w-full">
                <h1 className="text-xl font-bold">Selamat Datang Kembali!</h1>
                <p className="font-light text-text_muted">Silahkan login</p>
            </header>
            <section className="w-full space-y-6">
                <InputForm name="email" type="text" onChange={e => setEmail(e.target.value)} />
                <InputForm name="password" type="password" onChange={e => setPassword(e.target.value)} />
                <button onClick={handleLogin} className="p-2 bg-accent2 w-full rounded-md text-surface font-semibold">Login</button>
            </section>
        </article>
    )
}
export function InputForm({ name, type, onChange }: { name: string, type: string, onChange: (e: ChangeEvent<HTMLInputElement>) => void }) {
    return (
        <div className="w-full  text-accent2">
            <label htmlFor={name}
                className="bg-surface px-1 absolute -translate-y-3 translate-x-2"
            >{capitalize(name)}</label>
            <input name={name} type={type} onChange={onChange}
                className="w-full border border-border p-2 pt-3 rounded-md text-surface_darkmode" />
        </div>
    )
}