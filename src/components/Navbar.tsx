/**
 * Navbar Component
 * 
 * A modern navigation bar with responsive design, smooth transitions,
 * and interactive elements. Demonstrates React best practices and
 * advanced CSS techniques.
 * 
 * Key Concepts:
 * 1. Responsive Design
 * 2. CSS Transitions
 * 3. Route Management
 * 4. Intersection Observer
 * 5. Event Handling
 * 
 * Learning Exercises:
 * 
 * Exercise 1 - Navigation State:
 * - How is the active route tracked?
 * - What triggers navigation updates?
 * - How are route changes animated?
 * 
 * Exercise 2 - Responsive Design:
 * - Study the mobile menu implementation
 * - Understand breakpoint management
 * - Analyze transition behaviors
 * 
 * Exercise 3 - Scroll Effects:
 * - How is scroll position monitored?
 * - What triggers navbar transparency?
 * - Study the intersection observer usage
 * 
 * Exercise 4 - Performance:
 * - Identify potential performance bottlenecks
 * - Understand event listener cleanup
 * - Study component optimization
 */

import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import BackgroundPattern from './BackgroundPattern';
import HamburgerMenu from './HamburgerMenu';
/**
 * Navigation Configuration
 * 
 * Centralized navigation data for easy maintenance and updates.
 * Consider how this could be expanded for larger applications.
 */
const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/projects', label: 'Projects' },
    { path: '/contact', label: 'Contact' }
];

/**
 * Animation Variants
 * 
 * Framer Motion configurations for smooth transitions.
 * Experiment with timing and easing functions.
 */
const variants = {
    // ... existing variants ...
};

/**
 * Main Component Implementation
 * 
 * The component manages:
 * 1. Route state and updates
 * 2. Scroll position effects
 * 3. Mobile menu interactions
 * 4. Navigation animations
 * 
 * Learning Challenge:
 * - Add dropdown menus
 * - Implement breadcrumbs
 * - Create custom transitions
 */
const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <BackgroundPattern />
            <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                className={`fixed top-0 left-0 right-0 h-16 bg-white/60 backdrop-blur-md z-50 
                           transition-all duration-300 ${scrolled ? 'shadow-lg shadow-blue-900/5' : ''}`}
            >
                <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between relative">
                    {/* Logo and Title */}
                    <Link
                        to="/"
                        className="group flex items-center gap-3 transition-transform duration-300 hover:scale-[0.98]"
                    >
                        <div className="relative">
                            <div className="absolute -inset-2 bg-blue-50/80 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <img
                                src="./images/KV-logo-transparent.png"
                                alt="KrisVerses Portfolio"
                                className="h-8 w-auto object-contain relative"
                            />
                        </div>
                        <div className="flex flex-col relative">
                            <div className="flex items-center gap-2">
                                <h1 className="text-base font-medium tracking-wide text-gray-900">
                                    KRIS VERSES
                                </h1>
                                <span className="text-gray-400">|</span>
                                <span className="text-[11px] tracking-wider text-gray-500">
                                    Creative Developer
                                </span>
                            </div>
                            <div className="h-0.5 w-0 group-hover:w-full bg-blue-500/20 transition-all duration-300" />
                        </div>
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex items-center gap-8">
                        {navLinks.map(({ path, label }) => (
                            <Link
                                key={path}
                                to={path}
                                className={`relative py-1 text-sm transition-colors duration-200 group
                                          ${location.pathname === path
                                        ? 'text-blue-600 font-medium'
                                        : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                {label}
                                <div className={`absolute bottom-0 left-0 h-0.5 bg-blue-500/20 transition-all duration-300
                                              ${location.pathname === path
                                        ? 'w-full'
                                        : 'w-0 group-hover:w-full'
                                    }`}
                                />
                            </Link>
                        ))}
                    </div>
                </div>
            </motion.nav>
        </>
    );
};

export default Navbar;

/**
 * Further Learning Resources:
 * 
 * 1. React Router Documentation:
 *    https://reactrouter.com/docs/en/v6
 * 
 * 2. Framer Motion:
 *    https://www.framer.com/motion/
 * 
 * 3. Intersection Observer:
 *    https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
 * 
 * Practice Projects:
 * 1. Create a mega menu
 * 2. Build a sticky header
 * 3. Implement route transitions
 */
