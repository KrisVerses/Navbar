import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
/**
 * Navbar Component
 * 
 * A responsive navigation bar that implements:
 * - Fixed positioning at the top of the viewport
 * - Responsive container with max-width
 * - Flexbox layout for navigation items
 * - Custom color theming from Tailwind config
 * - Hover state transitions
 * 
 * Key patterns demonstrated:
 * 1. React Router integration for client-side navigation
 * 2. Tailwind utility-first CSS approach
 * 3. Responsive design patterns
 * 4. Accessibility considerations
 */
const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/projects', label: 'Projects' },
    { path: '/contact', label: 'Contact' }
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'backdrop-blur-md bg-museum-bg/30' : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                            className="text-xl font-light tracking-wider text-museum-text"
                        >
                            Museum
                        </motion.span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map(({ path, label }) => (
                            <Link
                                key={path}
                                to={path}
                                className="relative group"
                            >
                                <motion.span
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                                    className={`text-sm tracking-wider font-light ${location.pathname === path
                                        ? 'text-museum-text'
                                        : 'text-museum-text/70 hover:text-museum-text transition-colors duration-300'
                                        }`}
                                >
                                    {label}
                                </motion.span>
                                {location.pathname === path && (
                                    <motion.div
                                        layoutId="underline"
                                        className="absolute left-0 right-0 h-px bg-museum-text/30"
                                        style={{ bottom: '-4px' }}
                                        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="relative w-8 h-8 flex items-center justify-center"
                            aria-label="Toggle menu"
                        >
                            <div className="absolute w-5 h-5">
                                <span
                                    className={`absolute h-px bg-museum-text transform transition-all duration-300 ease-in-out ${isOpen
                                        ? 'w-5 rotate-45 top-2.5'
                                        : 'w-4 -translate-y-1'
                                        }`}
                                />
                                <span
                                    className={`absolute h-px bg-museum-text transform transition-all duration-300 ease-in-out ${isOpen
                                        ? 'w-5 -rotate-45 top-2.5'
                                        : 'w-3 translate-y-1'
                                        }`}
                                />
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                        className="md:hidden backdrop-blur-md bg-museum-bg/30"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-2">
                            {navLinks.map(({ path, label }) => (
                                <Link
                                    key={path}
                                    to={path}
                                    className={`block py-2 text-sm tracking-wider font-light ${location.pathname === path
                                        ? 'text-museum-text'
                                        : 'text-museum-text/70'
                                        }`}
                                >
                                    {label}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;

/**
 * Learning Exercises:
 * 
 * 1. Mobile Responsiveness
 *    - Add a hamburger menu for mobile screens
 *    - Implement a sliding menu panel
 *    - Use Tailwind's responsive prefixes (sm:, md:, lg:)
 * 
 * 2. Active Link Styling
 *    - Add visual indication for current route
 *    - Use NavLink component from react-router-dom
 *    - Implement custom active styles
 * 
 * 3. Animation Enhancement
 *    - Add subtle animations for hover states
 *    - Implement a slide-in animation for page transitions
 *    - Add loading states for navigation
 * 
 * 4. Accessibility Improvements
 *    - Add ARIA labels
 *    - Implement keyboard navigation
 *    - Add skip-to-main-content link
 * 
 * 5. Theme Switching
 *    - Add light/dark mode toggle
 *    - Implement color scheme preference detection
 *    - Add smooth theme transitions
 */
