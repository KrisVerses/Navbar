import { useEffect, useRef } from 'react';

/**
 * BackgroundPattern Component
 * 
 * Creates an animated background with floating triangular shapes using Three.js.
 * The triangles slowly rotate and move in a wave-like pattern to create
 * a subtle, ethereal atmosphere without interfering with the main content.
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