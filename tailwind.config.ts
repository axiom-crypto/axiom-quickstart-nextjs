/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: "680px",
      lg: "1040px",
    },
    colors: {
      "light": "#ffffff",
      "dark": "#000000",
      "highlight": "#99b9f6",
      "accent": "#008aff",
      "text": "#333333",
      "midtone": "#999999",
      "lightline": "#e0e0e0",
      "lightgrey": "#f8f9fa",
      "background": "#ffffff",
      "bg-fade": "#e9f5fc",
      "buttonbg": "#007bff",
      "buttonbg-hover": "#0056b3",
      "container": {
        "main": "#f8f9fa",
        "main-selected": "#e9f5fc",
      },
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        'md': '12px 20px 0px rgba(0, 0, 0, 0.3)',
      },
      animation: {
        'pulse-click': 'pulse 1.2s cubic-bezier(0.25, 0, 0.75, 1) infinite',
      },
    },
  },
  plugins: [],
}