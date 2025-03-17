import { Link } from 'react-router-dom';

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
            Navigation links container
            - gap-8: Adds 2rem spacing between links
          */}
          <div className="flex gap-8">
            {/* 
              Individual nav links
              - text-museum-text: Custom theme color
              - hover:text-museum-hover: Color change on hover
              - transition-colors: Smooth color transition
            */}
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