'use client'

import { useUser } from "../auth/AuthProvider"
import { createSupabaseBrowser } from "@/lib/supabase/client"
import { capitalize } from "@/utils/modules/capitalize"
import { createPortal } from "react-dom"
import { useEffect, useRef } from "react"
import { useConfirm } from "@/components/layout/ConfirmContext";
import Link from "next/link"
import { showGlobalLoading } from "@/lib/toast"
import { setFlash } from "@/lib/flash"

type ProfilePopupProps = {
    open: boolean
    onClose: () => void
}

const ProfilePopup = ({ open, onClose }: ProfilePopupProps) => {
    const popupRef = useRef<HTMLDivElement>(null)
    const { user } = useUser()
    const supabase = createSupabaseBrowser()
    const { confirm } = useConfirm()

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
        onClose()
        // konfirmasi
        const ok = await confirm({
            type: 'warning',
            title: "Logout?",
            message: "You need to log in next time to access more features."
        });
        if (!ok) return;

        showGlobalLoading("Logging out...")

        await supabase.auth.signOut()
        setFlash("success", "Logged out!");
    }

    return createPortal(
        <div onClick={e => e.stopPropagation()} ref={popupRef} className="
            fixed right-1 top-10 bg-white p-3 shadow-xl flex flex-col items-end z-[999] rounded-b
            transition-all duration-200
            scale-100 opacity-100
        "
        >
            <p className="text-accent text-sm font-semibold">{user ? user?.name : ''}</p>
            <p className="text-text_muted text-xs font-thin">{user ? user?.email : ''}</p>
            <p className="text-text_muted text-xs font-thin">{capitalize(user ? user?.role : 'Login to access all the features')}</p>
            {user &&
                <div className="gap-2 flex flex-col items-end">
                    <Link href="/create-review" onClick={onClose}>
                        <button className="text-accent border px-2 py-1 text-xs">Create Review</button>
                    </Link>
                    <Link href="/dashboard" onClick={onClose}>
                    <button className="text-accent border px-2 py-1 text-xs">Dashboard</button>
                    </Link>
                    <button className="text-accent border px-2 py-1 text-xs" onClick={logout}>Logout</button>
                </div>
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