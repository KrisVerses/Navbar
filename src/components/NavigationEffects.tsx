import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * NavigationEffects Component
 * 
 * Provides visual feedback during navigation:
 * 1. Loading bar animation at the top of the navbar
 * 2. Page transition effects
 * 3. Loading state indicators
 */

export const LoadingBar = () => (
    <div className="absolute top-0 left-0 h-0.5 bg-museum-text/20 w-full overflow-hidden">
        <div className="h-full w-1/3 bg-museum-text animate-loadingBar" />
    </div>
);

export const PageTransition = ({ children }: { children: React.ReactNode }) => {
    const [isVisible, setIsVisible] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setIsVisible(true);
        return () => setIsVisible(false);
    }, [location]);

    return (
        <div
            className={`
        transition-all duration-300 ease-out
        ${isVisible ? 'animate-slideIn' : 'animate-slideOut'}
      `}
        >
            {children}
        </div>
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