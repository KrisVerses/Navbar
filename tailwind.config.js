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
        'museum-bg': '#E5E1DB',      // Light warm beige for background
        'museum-text': '#4A3B32',    // Rich dark brown for text
        'museum-hover': '#6B4F3D',   // Slightly lighter brown for hover states
      },
      // Custom font family extension
      // Can be used as: font-inter
      fontFamily: {
        'inter': ['Inter', 'sans-serif'], // Fallback to system sans-serif
      },
    },
  },
  plugins: [], // Add Tailwind plugins here if needed
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