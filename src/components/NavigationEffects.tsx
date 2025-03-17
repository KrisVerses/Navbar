import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return children;
};

export default PageTransition; 