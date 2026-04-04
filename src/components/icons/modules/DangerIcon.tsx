export function DangerIcon({ className }: { className?: string }) {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="16 29 480 414" width="100%" height="100%">
            <g fill="#f8e152">
                <rect x="237" y="160" width="40" height="150" rx="30" />
                <circle cx="257" cy="360" r="20" />
                <animateTransform
                    attributeName="transform"
                    type="translate"
                    values="0,-400; 0,0; 0,0"
                    keyTimes="0; 0.5; 1"
                    dur="1.5s"
                    repeatCount="indefinite"
                    calcMode="spline"
                    keySplines="0.25 0.1 0.25 1; 0 0 1 1"
                />
            </g>
            <path d="M476.8 380.4L282.8 56.2c-12.1-19.9-39.4-19.9-51.5 0L37.2 380.4c-12.5 20.8 2.5 47.6 27.3 47.6h386.9c24.8 0 39.8-26.8 27.3-47.6z"
                fill="none"
                stroke="#f8e152"
                strokeWidth="25"
                strokeLinecap="round"
                strokeLinejoin="round" />
        </svg>
    )
}