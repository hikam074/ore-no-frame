export default function ToggleButton({
    value,
    onChange,
    className = ""
}: {
    value: boolean
    onChange: (value: boolean) => void
    className?: string
}) {
    return (
        <button
            type="button"
            onClick={() => onChange(!value)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 
        ${value ? "bg-green-500" : "bg-gray-300"} ${className}`}
            aria-pressed={value}
        >
            <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300
          ${value ? "translate-x-6" : "translate-x-1"}`}
            />
        </button>
    )
}