/** @type {import('tailwindcss').Config} */
export default {
  // Define which files Tailwind should scan for class names
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Includes all JS/TS files in src
  ],
  theme: {
    extend: {
      // Custom color palette extension
      // These colors can be used as: bg-museum-bg, text-museum-text, etc.
      colors: {
        'museum-bg': 'rgb(248 250 252)',        // Very subtle cool white
        'museum-text': 'rgb(30 58 138)',        // Dark blue
        'museum-hover': 'rgb(59 130 246)',      // Bright blue
        'museum-accent': 'rgb(96 165 250)',     // Light blue
        'museum-surface': 'rgb(249 250 252)',   // Card background
        // Dark mode colors (to be used with dark mode toggle later)
        'museum-dark': {
          bg: '#0A0A0A',
          text: '#F5F5F5',
          hover: '#6B6B6B',
        },
      },
      backgroundColor: {
        'museum-bg': 'rgb(var(--tw-bg-opacity) 249 250 251)', // Very light blue-gray
      },
      // Custom font family extension
      // Can be used as: font-inter
      fontFamily: {
        'inter': ['Inter', 'sans-serif'], // Fallback to system sans-serif
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideOut: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(-100%)', opacity: '0' },
        },
        loadingBar: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      animation: {
        slideIn: 'slideIn 0.3s ease-out',
        slideOut: 'slideOut 0.3s ease-in',
        loadingBar: 'loadingBar 1.5s infinite',
        fadeIn: 'fadeIn 0.3s ease-out',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      textShadow: {
        'glow': '0 0 5px rgba(74, 59, 50, 0.3)',
        'active': '0 0 8px rgba(74, 59, 50, 0.4)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-subtle': 'linear-gradient(to bottom right, rgb(248 250 252), rgb(244 247 250))',
        'gradient-card': 'linear-gradient(to bottom right, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
        'gradient-glow': 'radial-gradient(circle at center, rgba(96,165,250,0.1) 0%, rgba(96,165,250,0) 70%)',
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'glow': '0 0 15px rgba(96, 165, 250, 0.15)',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    function ({ addUtilities }) {
      addUtilities({
        '.text-shadow-glow': {
          'text-shadow': '0 0 5px rgba(59, 130, 246, 0.2)',
        },
        '.text-shadow-active': {
          'text-shadow': '0 0 8px rgba(59, 130, 246, 0.3)',
        },
        '.bg-museum-bg': {
          'background-image': 'var(--tw-gradient-subtle)',
          'background-attachment': 'fixed',
        },
        '.text-shadow-museum': {
          'text-shadow': '0 0 8px rgba(59, 130, 246, 0.3)'
        },
        '.bg-glass': {
          'background': 'rgba(255, 255, 255, 0.1)',
          'backdrop-filter': 'blur(12px)',
          'border': '1px solid rgba(255, 255, 255, 0.1)',
        },
        '.bg-glass-hover': {
          'background': 'rgba(255, 255, 255, 0.15)',
          'backdrop-filter': 'blur(12px)',
          'border': '1px solid rgba(255, 255, 255, 0.2)',
        },
        '.text-glow': {
          'text-shadow': '0 0 8px rgba(59, 130, 246, 0.3)',
        },
      });
    },
  ],
}

/**
 * Learning Exercises:
 * 
 * 1. Color System Extension
 *    - Add semantic color variations (primary, secondary, accent)
 *    - Create dark mode variants
 *    - Add opacity variations
 * 
 * 2. Typography System
 *    - Define custom font sizes
 *    - Add custom line heights
 *    - Create text presets (heading-1, body-large, etc.)
 * 
 * 3. Spacing System
 *    - Create custom spacing scale
 *    - Add component-specific spacing
 *    - Define responsive spacing variants
 * 
 * 4. Component Patterns
 *    - Create reusable component classes
 *    - Define common layout patterns
 *    - Add responsive variants
 * 
 * 5. Animation System
 *    - Define custom transitions
 *    - Add keyframe animations
 *    - Create interactive states
 */ 