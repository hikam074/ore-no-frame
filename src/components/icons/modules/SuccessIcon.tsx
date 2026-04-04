export function SuccessIcon({ className }: { className?: string }) {
    return (
        <svg
            className={`${className} w-4 h-4 text-white`}
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
        >
            <path d="M5 13l4 4L19 7" />
        </svg>
    )
}
