// frontend/tailwind.config.js - COMPLETE UI OVERHAUL

/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      // New light and friendly color palette
      colors: {
        'cream': '#f7f5f2',       // Soft off-white background
        'teal-deep': '#14b8a6',    // Main accent color
        'coral-warm': '#ff7f50',  // Call-to-action button color
        'blue-soft': '#60a5fa',    // Secondary accent
        'text-main': '#1f2937',   // Dark gray for text
        'text-light': '#6b7280',  // Lighter gray for descriptions
      },
      boxShadow: {
        'subtle': '0 4px 12px rgba(0, 0, 0, 0.05)',
        'medium': '0 8px 24px rgba(0, 0, 0, 0.08)',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
      },
    },
  },
  plugins: [],
}