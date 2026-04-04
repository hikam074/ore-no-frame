export function ErrorIcon({ className }: { className?: string }) {
    return (

        <svg
            className={`${className} w-4 h-4 text-white`}
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
        >
            <path d="M6 18L18 6M6 6l12 12" />
        </svg>

    )
}
