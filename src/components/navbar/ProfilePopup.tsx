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
import { AtSignIcon, CircleUserIcon, LayoutDashboardIcon, LogOutIcon, NotebookTextIcon, ShieldUserIcon, SquarePenIcon } from "lucide-react"

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
            message: "Anda perlu log in kembali nanti untuk mengakses semua fitur."
        });
        if (!ok) return;

        showGlobalLoading("Logging out...")

        await supabase.auth.signOut()
        setFlash("success", "Logged out!");
    }

    return createPortal(
        <div onClick={e => e.stopPropagation()} ref={popupRef} className="
            fixed right-1 top-10 bg-white p-3 shadow-xl flex flex-col z-[999] rounded-b
            transition-all duration-200
            scale-100 opacity-100
        "
        >
            {user &&
                <div className="w-full h-full">
                    <p className="text-primer text-sm font-semibold">{user ? user?.name : ''}</p>
                    <div className="text-tersier text-xs font-thin flex items-center mt-1">
                        <AtSignIcon height={16} />
                        <span>{capitalize(user ? user?.email : '')}</span>
                    </div>
                    <div className="text-tersier text-xs font-thin flex items-center mt-1">
                        <ShieldUserIcon height={16} />
                        <span>{capitalize(user ? user?.role : '')}</span>
                    </div>
                    <div className="flex flex-col items-end w-full mt-3">
                        <Link href="/dashboard" className="text-sekunder flex items-center font-medium text-sm gap-1 border-t w-full py-2 hover:bg-kuarter">
                            <LayoutDashboardIcon height={20} />
                            <span>Dashboard</span>
                        </Link>
                        <Link href="/dashboard/artikel-anda" className="text-sekunder flex items-center font-medium text-sm gap-1 border-t w-full py-2 hover:bg-kuarter">
                            <NotebookTextIcon height={20} />
                            <span>Artikel Anda</span>
                        </Link>
                        <Link href="/create-artikel" className="text-sekunder flex items-center font-medium text-sm gap-1 border-t w-full py-2 hover:bg-kuarter">
                            <SquarePenIcon height={20} />
                            <span>Buat Artikel</span>
                        </Link>
                        <Link href="/dashboard/profil" className="text-sekunder flex items-center font-medium text-sm gap-1 border-t w-full py-2 hover:bg-kuarter">
                            <CircleUserIcon height={20} />
                            <span>Profil</span>
                        </Link>
                        <button onClick={logout} className="text-sekunder flex items-center font-medium text-sm gap-1 border-y w-full py-2 hover:bg-kuarter">
                            <LogOutIcon height={20} />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            }
            {!user &&
                <div className="w-full h-full">
                    <p className="text-tersier text-xs font-thin">Login to access all the features</p>
                    <Link href="/login">
                        <button className="text-primer border px-2 py-1 text-xs mt-2 w-full hover:bg-kuarter">Login</button>
                    </Link>
                </div>
            }
        </div>,
        document.body
    )
}
export default ProfilePopup