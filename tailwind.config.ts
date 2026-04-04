/** @type {import('tailwindcss').Config} */
import typography from "@tailwindcss/typography"

module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bground: "#ffffff",
        primer: "#09637E",
        sekunder: "#088395",
        tersier: "#7AB2B2",
        kuarter: "#EBF4F4",
        abu: "#6B7280",
      },
    }
    ,
  },
  plugins: [typography],
}
