'use client'

import { useUser } from "../auth/AuthProvider"
import { createSupabaseBrowser } from "@/lib/supabase/client"
import { capitalize } from "@/utils/capitalize"
import { useRouter } from "next/navigation"
import { createPortal } from "react-dom"
import { useEffect, useRef } from "react"
import Link from "next/link"

type ProfilePopupProps = {
    open: boolean
    onClose: () => void
}

const ProfilePopup = ({ open, onClose }: ProfilePopupProps) => {
    const popupRef = useRef<HTMLDivElement>(null)
    const user = useUser()
    const supabase = createSupabaseBrowser()
    const router = useRouter()

    useEffect(() => {
        if (!open) return
        const handleClickOutside = ((e: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
                onClose()
            }
        })
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [open, onClose])

    if (!open) return null
    if (typeof window === "undefined") return null

    const logout = async () => {
        await supabase.auth.signOut()
        router.push('/auth/login')
        router.refresh()
    }

    return createPortal(
        <div onClick={e => e.stopPropagation()} ref={popupRef} className="
            fixed right-1 top-10 bg-white p-3 shadow-xl flex flex-col items-end z-[999] rounded-b
            transition-all duration-200
            scale-100 opacity-100
        "
        >
            <p className="text-accent text-sm font-semibold">{user ? user?.name : ''}</p>
            <p className="text-text_muted text-xs font-thin">{capitalize(user ? user?.email : '')}</p>
            <p className="text-text_muted text-xs font-thin">{capitalize(user ? user?.role : 'Silahkan login untuk mengakses fitur lengkap')}</p>
            {user &&
                <button className="text-accent border px-2 py-1 text-xs mt-4" onClick={logout}>Logout</button>
            }
            {!user &&
                <Link href="/auth/login">
                    <button className="text-accent border px-2 py-1 text-xs mt-4">Login</button>
                </Link>
            }
        </div>,
        document.body
    )
}
export default ProfilePopup