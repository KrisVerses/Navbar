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

export const LoadingBar = () => (
    <div className="absolute top-0 left-0 h-0.5 bg-museum-text/20 w-full overflow-hidden">
        <div className="h-full w-1/3 bg-museum-text animate-loadingBar" />
    </div>
);

export const PageTransition = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

export const NavigationIndicator = () => {
    const [isNavigating, setIsNavigating] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setIsNavigating(true);
        const timer = setTimeout(() => setIsNavigating(false), 500);
        return () => clearTimeout(timer);
    }, [location]);

    if (!isNavigating) return null;

    return <LoadingBar />;
}; 