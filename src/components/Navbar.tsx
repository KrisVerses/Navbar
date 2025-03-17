import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MenuIcon, CloseIcon } from './HamburgerMenu';
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
const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        // Navigation container with fixed positioning
        // z-50 ensures navbar stays above other content
        <nav className="fixed top-0 left-0 right-0 bg-museum-bg border-b border-museum-text/10 z-50">
            {/* 
        Responsive container with maximum width
        - max-w-7xl: Sets a max-width of 80rem (1280px)
        - mx-auto: Centers the container
        - px-4: Base padding of 1rem
        - sm:px-6: Increases padding to 1.5rem on small screens
        - lg:px-8: Increases padding to 2rem on large screens
      */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* 
          Flex container for navbar content
          - h-16: Fixed height of 4rem
          - justify-between: Spaces logo and navigation links
          - items-center: Vertically centers all items
        */}
                <div className="flex justify-between items-center h-16">
                    {/* 
            Logo/Brand link
            - font-semibold: Bolder font weight for emphasis
            - transition-colors: Smooth color transition on hover
          */}
                    <Link
                        to="/"
                        className="text-museum-text text-lg font-semibold hover:text-museum-hover transition-colors"
                    >
                        Museum
                    </Link>
                    {/* 
            Desktop Navigation - Hidden on mobile
            - gap-8: Adds 2rem spacing between links
            - hidden md:flex: Hides links on medium and larger screens
          */}
                    <div className="hidden md:flex gap-8">
                        <Link
                            to="/"
                            className="text-museum-text hover:text-museum-hover transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            to="/projects"
                            className="text-museum-text hover:text-museum-hover transition-colors"
                        >
                            Projects
                        </Link>
                        <Link
                            to="/contact"
                            className="text-museum-text hover:text-museum-hover transition-colors"
                        >
                            Contact
                        </Link>
                    </div>
                    {/* 
            Mobile Menu Button - Hidden on desktop
            - text-museum-text: Custom theme color
            - md:hidden: Hides button on medium and larger screens
          */}
                    <button className="text-museum-text md:hidden"
                        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {/* 
              Hamburger menu icon
              - svg: Vector graphics for scalable icons
              - fill-none: No fill color
              - viewBox: Defines the size of the icon
              - stroke: Color of the icon
            */}
                        {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
                    </button>
                    {/* 
            Mobile Menu Panel - Hidden on desktop
            - absolute: Positions the panel absolutely within the navbar
            - top-16: Places the panel 4rem from the top of the navbar
            - left-0: Places the panel flush with the left edge of the navbar
            - right-0: Places the panel flush with the right edge of the navbar
            - w-full: Makes the panel full width
            - bg-museum-bg: Background color of the panel
            - shadow-lg: Adds a shadow for depth
            - md:hidden: Hides the panel on medium and larger screens
            - transition-all: Applies transitions to all properties
            - duration-300: Duration of the transition
            - ease-in-out: Smooth transition
            - ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}: Opacity and visibility based on menu state
          */}
                    <div
                        className={`
              absolute top-16 left-0 right-0 w-full
              bg-museum-bg shadow-lg
              md:hidden
              transition-all duration-300 ease-in-out
              ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
            `}
                    >
                        <div className="px-4 py-2 space-y-2">
                            <Link
                                to="/"
                                className="block text-museum-text hover:text-museum-hover transition-colors py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                to="/projects"
                                className="block text-museum-text hover:text-museum-hover transition-colors py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Projects
                            </Link>
                            <Link
                                to="/contact"
                                className="block text-museum-text hover:text-museum-hover transition-colors py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Contact
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
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