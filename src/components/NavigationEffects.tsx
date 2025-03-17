import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * NavigationEffects Component
 * 
 * Provides visual feedback during navigation:
 * 1. Loading bar animation at the top of the navbar
 * 2. Page transition effects using Framer Motion
 * 3. Loading state indicators
 */

/**
 * Page transition and loading animations
 * Combines loading indicator and page transitions for better performance
 */

interface PageTransitionProps {
    children: React.ReactNode;
}

export const PageTransition = ({ children }: PageTransitionProps) => {
    const location = useLocation();

    // Animation variants with right-to-left slide
    const pageVariants = {
        initial: {
            opacity: 0,
            x: 100, // Start from right
            scale: 0.95
        },
        animate: {
            opacity: 1,
            x: 0, // Slide to center
            scale: 1
        },
        exit: {
            opacity: 0,
            x: -100, // Exit to left
            scale: 0.95
        }
    };

    return (
        <div className="relative w-full overflow-hidden">
            {/* Loading bar - Always mounted but conditionally visible */}
            <motion.div
                className="fixed top-0 left-0 h-0.5 bg-museum-text/20 w-full overflow-hidden z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="h-full w-1/3 bg-museum-text"
                    animate={{
                        x: ["-100%", "200%"],
                        transition: {
                            repeat: Infinity,
                            duration: 1.5,
                            ease: "linear"
                        }
                    }}
                />
            </motion.div>

            {/* Page content with transitions */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={location.pathname}
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{
                        duration: 0.5,
                        ease: [0.25, 0.1, 0.25, 1], // Custom easing for smoother motion
                        opacity: { duration: 0.3 }
                    }}
                    className="w-full transform-gpu" // Hardware acceleration
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}; 