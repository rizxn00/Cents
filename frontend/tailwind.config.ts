import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class', 
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(100%)', opacity: '0' },
        },
        press: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.93)' },
          'to': { transform: 'scale(1)' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(100%)', opacity: '0'},
          '100%': { transform: 'translateX(0)', opacity: '1'}
        },
        slideRight: {
          '0%': { transform: 'translateX(-100%)', opacity: '0'},
          '100%': { transform: 'translateX(0)', opacity: '1'}
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        slideUp: 'slideUp 0.3s ease-in-out',
        slideDown: 'slideDown 0.3s ease-in-out',
        press: 'press 0.2s ease-in-out',
        slideLeft: 'slideLeft 1s ease-in-out',
        slideRight: 'slideRight 1s ease-in-out',
        fadeInUp: 'fadeInUp 0.5s ease-out forwards'
      },
    },
  },
  plugins: [],
};
export default config;
