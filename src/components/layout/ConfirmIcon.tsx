export function Spinner() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><radialGradient id="a12" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)"><stop offset="0" stopColor="#000000"></stop><stop offset=".3" stopColor="#000000" stopOpacity=".9"></stop><stop offset=".6" stopColor="#000000" stopOpacity=".6"></stop><stop offset=".8" stopColor="#000000" stopOpacity=".3"></stop><stop offset="1" stopColor="#000000" stopOpacity="0"></stop></radialGradient><circle transform-origin="center" fill="none" stroke="url(#a12)" stroke-width="15" stroke-linecap="round" stroke-dasharray="200 1000" stroke-dashoffset="0" cx="100" cy="100" r="70"><animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="2" values="360;0" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform></circle><circle transform-origin="center" fill="none" opacity=".2" stroke="#000000" stroke-width="15" stroke-linecap="round" cx="100" cy="100" r="70"></circle></svg>
  )
}
export function SuccessIcon() {
  return (
    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500">
      <svg
        className="w-4 h-4 text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        viewBox="0 0 24 24"
      >
        <path d="M5 13l4 4L19 7" />
      </svg>
    </div>
  )
}

export function ErrorIcon() {
  return (
    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-red-500">
      <svg
        className="w-4 h-4 text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        viewBox="0 0 24 24"
      >
        <path d="M6 18L18 6M6 6l12 12" />
      </svg>
    </div>
  )
}

export function WarningIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="16 29 480 414" width="100%" height="100%">
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

