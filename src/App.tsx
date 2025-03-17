import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import { PageTransition } from './components/NavigationEffects';
import AIModelShowcase from './components/AIModelShowcase.tsx';
import BackgroundPattern from './components/BackgroundPattern';
import './index.css';

/**
 * App Component
 * 
 * Main application component that sets up routing and layout structure.
 * Implements a museum-style design with sophisticated animations and transitions.
 * 
 * Features:
 * - Responsive layout with proper content hierarchy
 * - Animated page transitions using Framer Motion
 * - Three.js background patterns for visual interest
 * - Proper z-indexing for layered components
 */

// Animation configuration for page transitions
const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.6, ease: 'easeOut' }
};

/**
 * HomePage Component
 * 
 * Landing page featuring the AIModelShowcase centerpiece.
 * The showcase is a Three.js visualization that serves as the main attraction.
 */
const HomePage = () => (
  <motion.div
    {...fadeIn}
    className="min-h-screen relative"
  >
    <AIModelShowcase />
  </motion.div>
);

/**
 * ProjectsPage Component
 * 
 * Displays a grid of project cards showcasing various works.
 * Features a responsive layout that adjusts from 1 to 3 columns based on screen size.
 * 
 * Styling:
 * - Drop shadows for better text contrast against the animated background
 * - Responsive padding and maximum width constraints
 * - Proper spacing between elements using Tailwind's space utilities
 */
const ProjectsPage = () => (
  <motion.div
    {...fadeIn}
    className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 relative"
  >
    <div className="max-w-7xl w-full space-y-16 relative z-10">
      <div className="text-center">
        <h1 className="text-4xl font-light tracking-wider text-museum-text drop-shadow-lg">
          Selected Works
        </h1>
        <p className="mt-4 text-xl text-museum-text/90 font-light drop-shadow-lg">
          A curated collection of technical achievements and creative explorations
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Project cards will go here */}
      </div>
    </div>
  </motion.div>
);

/**
 * ContactPage Component
 * 
 * Contact information and form display.
 * Features a frosted glass effect container with proper contrast against the background.
 * 
 * Styling:
 * - Backdrop blur for depth
 * - Subtle border for container definition
 * - Drop shadows for text contrast
 * - Proper spacing and maximum width constraints
 */
const ContactPage = () => (
  <motion.div
    {...fadeIn}
    className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 relative"
  >
    <div className="max-w-3xl w-full relative z-10">
      <div className="text-center space-y-8">
        <h1 className="text-4xl font-light tracking-wider text-museum-text drop-shadow-lg">
          Let's Connect
        </h1>
        <p className="text-xl text-museum-text/90 font-light leading-relaxed drop-shadow-lg">
          I'm always interested in discussing new projects, creative ideas, or opportunities to be part of your visions.
        </p>
      </div>
      <div className="mt-12 space-y-8">
        <div className="backdrop-blur-md bg-museum-text/[0.02] border border-museum-text/10 rounded-sm p-8 space-y-6 shadow-xl">
          {/* Contact form or information will go here */}
        </div>
      </div>
    </div>
  </motion.div>
);

/**
 * AppRoutes Component
 * 
 * Configures application routes with transition effects.
 * Wraps routes in PageTransition component for smooth navigation animations.
 */
const AppRoutes = () => (
  <PageTransition>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  </PageTransition>
);

/**
 * Main App Component
 * 
 * Root component that sets up the application structure.
 * 
 * Layout Structure:
 * 1. Router wrapper for navigation
 * 2. Background pattern layer (z-index: 0)
 * 3. Content layer with navbar and main content (z-index: 10)
 * 
 * The z-index layering ensures proper stacking of components while
 * maintaining interaction capabilities where needed.
 */
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-museum-bg text-museum-text relative">
        <BackgroundPattern />
        <div className="relative z-10">
          <Navbar />
          <main className="relative">
            <AppRoutes />
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
