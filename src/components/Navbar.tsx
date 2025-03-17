import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import BackgroundPattern from './BackgroundPattern';
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
