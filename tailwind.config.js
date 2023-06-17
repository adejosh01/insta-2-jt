/** @type {import('tailwindcss').Config} */
module.exports = {
  node: "jit",
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms"),
   require("tailwind-scrollbar"),
   require("tailwind-scrollbar-hide"),
  
  ],
}
