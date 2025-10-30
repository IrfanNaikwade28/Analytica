/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0A003D",
        secondary: "#5E17EB",
        accent: "#B13BFF",
        highlight: "#FFD34E",
        ink: "#0F0F14",
      },
      boxShadow: {
        glow: "0 10px 30px rgba(177,59,255,0.4)",
        soft: "0 8px 30px rgba(0,0,0,0.12)",
        card: "0 6px 15px rgba(0,0,0,0.2)",
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2.5s ease-in-out infinite',
        shimmer: 'shimmer 2.2s linear infinite',
        marquee: 'marquee 25s linear infinite',
        fadeUp: 'fadeUp 0.7s ease forwards',
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(1200px 600px at 10% -10%, #5e17eb33, transparent 60%), radial-gradient(1200px 600px at 90% 20%, #b13bff33, transparent 60%), radial-gradient(1000px 500px at 50% 120%, #0ea5e933, transparent 60%), linear-gradient(180deg, #070a16 0%, #0b1020 40%, #0a0f21 100%)',
      },
    },
  },
  plugins: [],
}