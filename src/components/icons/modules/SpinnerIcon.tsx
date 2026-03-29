import { SVGProps } from "react";

export function SpinnerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 200" {...props}>
      <defs>
        <radialGradient
          id="spinnerGradient"
          cx=".66"
          cy=".3125"
          gradientTransform="scale(1.5)"
        >
          <stop offset="0" stopColor="currentColor" />
          <stop offset=".3" stopColor="currentColor" stopOpacity=".9" />
          <stop offset=".6" stopColor="currentColor" stopOpacity=".6" />
          <stop offset=".8" stopColor="currentColor" stopOpacity=".3" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle
        fill="none"
        stroke="url(#spinnerGradient)"
        strokeWidth="15"
        strokeLinecap="round"
        strokeDasharray="200 1000"
        cx="100"
        cy="100"
        r="70"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          dur="2s"
          values="360 100 100;0 100 100"
          repeatCount="indefinite"
        />
      </circle>

      <circle
        fill="none"
        opacity=".2"
        stroke="currentColor"
        strokeWidth="15"
        strokeLinecap="round"
        cx="100"
        cy="100"
        r="70"
      />
    </svg>
  );
}