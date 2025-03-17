/**
 * BackgroundPattern Component
 * 
 * A dynamic background pattern generator using HTML Canvas and requestAnimationFrame.
 * This component demonstrates advanced canvas manipulation and animation techniques.
 * 
 * Key Concepts:
 * 1. Canvas Context Management
 * 2. Dynamic Pattern Generation
 * 3. Animation Loop Optimization
 * 4. Responsive Design
 * 
 * Learning Exercises:
 * 
 * Exercise 1 - Canvas Basics:
 * - How is the canvas sized and scaled?
 * - What's the difference between canvas dimensions and CSS dimensions?
 * - How does device pixel ratio affect rendering?
 * 
 * Exercise 2 - Pattern Generation:
 * - Analyze how dots are positioned
 * - Understand the connection line logic
 * - Study the animation timing system
 * 
 * Exercise 3 - Performance:
 * - How is the animation loop optimized?
 * - What techniques prevent memory leaks?
 * - How is canvas clearing and redrawing managed?
 * 
 * Exercise 4 - Customization:
 * Try modifying these aspects:
 * - Change dot colors and sizes
 * - Adjust movement patterns
 * - Modify connection line rules
 */

import { useEffect, useRef } from 'react';

interface Point {
    x: number;
    y: number;
    vx: number;
    vy: number;
}

/**
 * Configuration Constants
 * 
 * These values control the visual appearance and behavior of the pattern.
 * Experiment with these values to understand their impact on the animation.
 */
const CONFIG = {
    // ... existing configuration ...
};

/**
 * Utility Functions
 * 
 * These helper functions handle common calculations and operations.
 * Understanding these is crucial for canvas-based animations.
 */
const utils = {
    // ... existing utility functions ...
};

/**
 * Main Component Implementation
 * 
 * The component handles:
 * 1. Canvas setup and cleanup
 * 2. Animation frame management
 * 3. Pattern generation and updates
 * 4. Window resize handling
 * 
 * Learning Challenge:
 * - Add mouse interaction effects
 * - Implement color transitions
 * - Create new pattern variations
 */
const BackgroundPattern = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);

        // Pattern configuration
        const dots: { x: number; y: number; size: number; speedX: number; speedY: number }[] = [];
        const numDots = 50;
        const colors = [
            'rgba(59, 130, 246, 0.1)',  // blue-500
            'rgba(37, 99, 235, 0.1)',   // blue-600
            'rgba(29, 78, 216, 0.1)',   // blue-700
            'rgba(30, 64, 175, 0.08)',  // blue-800
        ];

        // Initialize dots
        for (let i = 0; i < numDots; i++) {
            dots.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 4 + 2,
                speedX: (Math.random() - 0.5) * 0.3,
                speedY: (Math.random() - 0.5) * 0.3
            });
        }

        // Animation
        let animationFrameId: number;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw and update dots
            dots.forEach((dot, index) => {
                // Update position
                dot.x += dot.speedX;
                dot.y += dot.speedY;

                // Wrap around edges
                if (dot.x < 0) dot.x = canvas.width;
                if (dot.x > canvas.width) dot.x = 0;
                if (dot.y < 0) dot.y = canvas.height;
                if (dot.y > canvas.height) dot.y = 0;

                // Draw dot
                ctx.beginPath();
                ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
                ctx.fillStyle = colors[index % colors.length];
                ctx.fill();

                // Draw connections
                dots.forEach((otherDot, otherIndex) => {
                    if (index !== otherIndex) {
                        const dx = dot.x - otherDot.x;
                        const dy = dot.y - otherDot.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);

                        if (distance < 100) {
                            ctx.beginPath();
                            ctx.moveTo(dot.x, dot.y);
                            ctx.lineTo(otherDot.x, otherDot.y);
                            ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - distance / 100)})`;
                            ctx.lineWidth = 0.5;
                            ctx.stroke();
                        }
                    }
                });
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', setCanvasSize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none opacity-50"
            style={{ zIndex: -1 }}
        />
    );
};

export default BackgroundPattern;

/**
 * Further Learning Resources:
 * 
 * 1. Canvas API Documentation:
 *    https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
 * 
 * 2. Animation Techniques:
 *    https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
 * 
 * 3. Performance Optimization:
 *    https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas
 * 
 * Practice Projects:
 * 1. Create a particle rain effect
 * 2. Build an interactive flow field
 * 3. Implement a cellular automaton
 */ 