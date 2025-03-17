/**
 * HamburgerMenu Component
 * 
 * An animated hamburger menu button with smooth transitions
 * and accessibility features. Demonstrates React component patterns
 * and animation techniques.
 * 
 * Key Concepts:
 * 1. Component Props
 * 2. Animation States
 * 3. Accessibility
 * 4. Event Handling
 * 5. CSS Transitions
 * 
 * Learning Exercises:
 * 
 * Exercise 1 - State Management:
 * - How is the menu state tracked?
 * - What triggers state changes?
 * - Study prop handling
 * 
 * Exercise 2 - Animation:
 * - Analyze transition effects
 * - Understand timing functions
 * - Study transform properties
 * 
 * Exercise 3 - Accessibility:
 * - Identify ARIA attributes
 * - Study keyboard navigation
 * - Understand focus management
 * 
 * Exercise 4 - Styling:
 * - Study CSS organization
 * - Analyze responsive design
 * - Understand theme integration
 */

import { motion } from 'framer-motion';

/**
 * Component Props
 * 
 * Clear type definitions improve code maintainability.
 * Consider expanding with additional customization options.
 */
interface HamburgerMenuProps {
    isOpen: boolean;
    onClick: () => void;
    className?: string;
}

/**
 * Animation Variants
 * 
 * Framer Motion configurations for menu transitions.
 * Experiment with different timing and effects.
 */
const variants = {
    open: {
        rotate: 45,
        y: 7,
        transition: { duration: 0.2 }
    },
    closed: {
        rotate: 0,
        y: 0,
        transition: { duration: 0.2 }
    }
};

/**
 * Main Component Implementation
 * 
 * The component manages:
 * 1. Button state
 * 2. Click handling
 * 3. Animation states
 * 4. Accessibility
 * 
 * Learning Challenge:
 * - Add hover effects
 * - Implement custom animations
 * - Create theme variations
 */
export const HamburgerMenu = ({ isOpen, onClick, className = '' }: HamburgerMenuProps) => {
    return (
        <button
            onClick={onClick}
            className={`relative w-10 h-10 focus:outline-none ${className}`}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
        >
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2">
                {/* Top bar */}
                <motion.span
                    animate={isOpen ? 'open' : 'closed'}
                    variants={variants}
                    className="w-6 h-0.5 bg-gray-900 origin-center"
                />
                {/* Middle bar */}
                <motion.span
                    animate={{ opacity: isOpen ? 0 : 1 }}
                    transition={{ duration: 0.2 }}
                    className="w-6 h-0.5 bg-gray-900"
                />
                {/* Bottom bar */}
                <motion.span
                    animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-6 h-0.5 bg-gray-900 origin-center"
                />
            </div>
        </button>
    );
};

/**
 * Further Learning Resources:
 * 
 * 1. Framer Motion:
 *    https://www.framer.com/motion/
 * 
 * 2. ARIA Practices:
 *    https://www.w3.org/WAI/ARIA/apg/patterns/button/
 * 
 * 3. CSS Transforms:
 *    https://developer.mozilla.org/en-US/docs/Web/CSS/transform
 * 
 * Practice Projects:
 * 1. Create custom menu animations
 * 2. Build a theme switcher
 * 3. Implement gesture controls
 */

// Hamburger Menu Icon Component
const MenuIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="white"
    >
        {/* Three lines for hamburger icon */}
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
        />
    </svg>
);

// Close/X Icon Component
const CloseIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="white"
    >
        {/* X shape */}
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
        />
    </svg>
);

export { MenuIcon, CloseIcon };