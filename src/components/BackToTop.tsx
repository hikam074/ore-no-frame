"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"

type Props = {
  footerRef: React.RefObject<HTMLDivElement | null> 
}

const BackToTop = ({ footerRef }: Props ) => {
  const pathname = usePathname()
  const isAtAdmin = pathname.startsWith("/admin")

  const [visible, setVisible] = useState(false)
  const [onFooter, setOnFooter] = useState(false)

  // show / hide berdasarkan scroll
  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 50)
    }

    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // detect footer
  useEffect(() => {
    if (!footerRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setOnFooter(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    observer.observe(footerRef.current)
    return () => observer.disconnect()
  }, [footerRef])

  if (!visible) return null

  return (
    <button
      onClick={() =>
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
      className={`
        fixed bottom-6 z-50
        ${isAtAdmin
          ? "right-6"
          : "right-6 sm:left-6 sm:right-auto"}
        rounded-full p-4 shadow-lg transition-all duration-300 border border-accent
        ${
          onFooter
            ? "bg-text_darkmode text-accent"
            : "bg-accent text-surface hover:opacity-90"
        }
      `}
      aria-label="Back to top"
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  )
}

export default BackToTop