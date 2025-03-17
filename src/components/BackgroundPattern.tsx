import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * BackgroundPattern Component
 * 
 * Creates an animated background with floating triangular shapes using Three.js.
 * The triangles slowly rotate and move in a wave-like pattern to create
 * a subtle, ethereal atmosphere without interfering with the main content.
 */
const BackgroundPattern = () => {
    // Reference to the container div for Three.js scene
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;

        // Initialize Three.js scene
        const scene = new THREE.Scene();

        // Setup camera with perspective that works well for background elements
        const camera = new THREE.PerspectiveCamera(
            50, // Field of view - chosen for subtle perspective effect
            container.clientWidth / container.clientHeight,
            0.1,
            1000
        );
        camera.position.z = 50; // Position camera to view all triangles

        // Initialize renderer with transparency support
        const renderer = new THREE.WebGLRenderer({
            antialias: true, // Smooth edges
            alpha: true,     // Enable transparency
        });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setClearColor(0x000000, 0); // Transparent background
        container.appendChild(renderer.domElement);

        // Create triangular geometry
        const triangles: THREE.Mesh[] = [];
        const triangleGeometry = new THREE.BufferGeometry();
        // Define equilateral triangle vertices
        const vertices = new Float32Array([
            -1.0, -0.866, 0,    // bottom left
            1.0, -0.866, 0,     // bottom right
            0.0, 0.866, 0,      // top
        ]);
        triangleGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

        // Create multiple triangles with random positions and rotations
        for (let i = 0; i < 15; i++) {
            // Material with very low opacity to create subtle effect
            const material = new THREE.MeshBasicMaterial({
                color: 0xA28A77,      // Warm, neutral color matching the theme
                transparent: true,
                opacity: 0.03,        // Very subtle visibility
                side: THREE.DoubleSide // Visible from both sides
            });

            const triangle = new THREE.Mesh(triangleGeometry, material);

            // Randomize position within a reasonable view area
            triangle.position.set(
                (Math.random() - 0.5) * 100,  // X spread
                (Math.random() - 0.5) * 100,  // Y spread
                (Math.random() - 0.5) * 50    // Z spread (smaller to keep in view)
            );

            // Random initial rotation
            triangle.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );

            // Random size variation
            triangle.scale.setScalar(10 + Math.random() * 20);

            triangles.push(triangle);
            scene.add(triangle);
        }

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);

            // Update each triangle's rotation and position
            triangles.forEach((triangle, i) => {
                // Slow, continuous rotation
                triangle.rotation.x += 0.0005;
                triangle.rotation.y += 0.0003;
                // Gentle floating motion using sine wave
                triangle.position.y += Math.sin(Date.now() * 0.001 + i) * 0.02;
            });

            renderer.render(scene, camera);
        };

        // Responsive handling
        const handleResize = () => {
            if (!container) return;

            const width = container.clientWidth;
            const height = container.clientHeight;

            // Update camera aspect ratio
            camera.aspect = width / height;
            camera.updateProjectionMatrix();

            // Update renderer size
            renderer.setSize(width, height);
        };

        window.addEventListener('resize', handleResize);
        animate();

        // Cleanup function
        return () => {
            window.removeEventListener('resize', handleResize);

            // Dispose of Three.js resources to prevent memory leaks
            renderer.dispose();
            triangleGeometry.dispose();
            triangles.forEach(triangle => {
                if (triangle.material instanceof THREE.Material) {
                    triangle.material.dispose();
                }
            });

            // Remove canvas element
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: 0 }}
        />
    );
};

export default BackgroundPattern; 