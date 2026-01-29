/** @type {import('tailwindcss').Config} */
import typography from "@tailwindcss/typography"

module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // extend: {
    //   colors: {
    //     bg: "#0F172A", // Background utama - Midnight Blue
    //     surface: "#1E293B", //Card / Surface - Dark Slate
    //     text: "#E5E7EB", // Text utama - Soft White
    //     muted: "#94A3B8", // Text secondary - Muted Gray
    //     accent: "#FB7185", // Accent utama - Sakura Pink
    //     accent2: "#A78BFA", // Accent alternatif - Soft Violet
    //   },
    // }
    extend: {
      colors: {
        bg: "#F8FAFC", // Background utama - Sakura Mist
        surface: "#FFFFFF", // Card / Surface - Soft White
        surface_darkmode: "#0F172A", // Card / Surface - Ink Black
        border: "#E2E8F0", // Border / Divider - Light Ink

        text: "#0F172A", // Text utama - Ink Black
        text_darkmode: "#FFFFFF", // Text utama - Soft White
        text_muted: "#64748B", // Text secondary - Cool Gray

        muted: "#0F172A", // x - Cool Gray

        accent: "#FB7185", // Accent utama - Sakura Pink
        accent2: "#A78BFA", // Accent pendukung - Soft Violet

        highlight: "#E0F2FE", // Highlight lembut - Sky Tint
      },
    }

    ,
  },
  plugins: [typography],
}
