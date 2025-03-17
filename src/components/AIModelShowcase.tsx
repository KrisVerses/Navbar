import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

interface Node {
    position: THREE.Vector3;
    velocity: THREE.Vector3;
    connections: number[];
}

const AIModelShowcase = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        console.log('Initializing Three.js scene');
        if (!containerRef.current) {
            console.error('Container ref is null');
            return;
        }

        let isActive = true;
        const container = containerRef.current;

        // Scene setup
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);

        // Camera setup
        const camera = new THREE.PerspectiveCamera(
            60,
            container.clientWidth / container.clientHeight,
            0.1,
            1000
        );
        camera.position.set(0, 0, 80);
        camera.lookAt(0, 0, 0);

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: false
        });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 1);
        container.appendChild(renderer.domElement);

        // Post-processing
        const composer = new EffectComposer(renderer);
        const renderPass = new RenderPass(scene, camera);
        composer.addPass(renderPass);

        const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(container.clientWidth, container.clientHeight),
            1.5,
            0.5,
            0.85
        );
        composer.addPass(bloomPass);

        // Controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.rotateSpeed = 0.5;
        controls.enableZoom = false;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.5;

        // Particle system
        const nodeCount = 150;
        const nodes: Node[] = [];
        const positions = new Float32Array(nodeCount * 3);
        const colors = new Float32Array(nodeCount * 3);
        const connections: [number, number][] = [];

        // Color palette
        const baseColors = [
            new THREE.Color('#E6D5C9').multiplyScalar(3),
            new THREE.Color('#A28A77').multiplyScalar(3),
            new THREE.Color('#BFA58E').multiplyScalar(3)
        ];

        // Initialize nodes
        for (let i = 0; i < nodeCount; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(Math.random() * 2 - 1);
            const radius = 20 + Math.random() * 10;

            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.sin(phi) * Math.sin(theta);
            const z = radius * Math.cos(phi);

            nodes.push({
                position: new THREE.Vector3(x, y, z),
                velocity: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.05,
                    (Math.random() - 0.5) * 0.05,
                    (Math.random() - 0.5) * 0.05
                ),
                connections: []
            });

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            const color = baseColors[Math.floor(Math.random() * baseColors.length)];
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
        }

        // Create connections
        for (let i = 0; i < nodeCount; i++) {
            const maxConnections = 3;
            const currentConnections = [];

            for (let j = 0; j < nodeCount; j++) {
                if (i !== j && currentConnections.length < maxConnections) {
                    const distance = nodes[i].position.distanceTo(nodes[j].position);
                    if (distance < 15) {
                        currentConnections.push(j);
                        connections.push([i, j]);
                    }
                }
            }
            nodes[i].connections = currentConnections;
        }

        // Create particles
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 3,
            sizeAttenuation: true,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        // Create connections
        const lineGeometry = new THREE.BufferGeometry();
        const lineMaterial = new THREE.LineBasicMaterial({
            vertexColors: true,
            blending: THREE.AdditiveBlending,
            transparent: true,
            opacity: 0.5
        });

        const linePositions = new Float32Array(connections.length * 6);
        const lineColors = new Float32Array(connections.length * 6);
        lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
        lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

        const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
        scene.add(lines);

        // Animation
        const animate = () => {
            if (!isActive) return;

            requestAnimationFrame(animate);
            controls.update();

            const time = Date.now() * 0.001;
            const positions = particles.geometry.attributes.position.array as Float32Array;
            const linePositions = lines.geometry.attributes.position.array as Float32Array;

            // Update particles
            nodes.forEach((node, i) => {
                node.velocity.add(new THREE.Vector3(
                    (Math.random() - 0.5) * 0.02,
                    (Math.random() - 0.5) * 0.02,
                    (Math.random() - 0.5) * 0.02
                ));

                node.position.add(node.velocity);

                const radius = node.position.length();
                if (radius > 30) {
                    node.position.setLength(30);
                    node.velocity.multiplyScalar(-0.8);
                }

                node.position.y += Math.sin(time + i * 0.1) * 0.03;

                positions[i * 3] = node.position.x;
                positions[i * 3 + 1] = node.position.y;
                positions[i * 3 + 2] = node.position.z;
            });

            // Update connections
            connections.forEach((connection, i) => {
                const [from, to] = connection;
                const fromPos = nodes[from].position;
                const toPos = nodes[to].position;

                linePositions[i * 6] = fromPos.x;
                linePositions[i * 6 + 1] = fromPos.y;
                linePositions[i * 6 + 2] = fromPos.z;
                linePositions[i * 6 + 3] = toPos.x;
                linePositions[i * 6 + 4] = toPos.y;
                linePositions[i * 6 + 5] = toPos.z;
            });

            particles.geometry.attributes.position.needsUpdate = true;
            lines.geometry.attributes.position.needsUpdate = true;

            composer.render();
        };

        // Handle resize
        const handleResize = () => {
            if (!container) return;

            const width = container.clientWidth;
            const height = container.clientHeight;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();

            renderer.setSize(width, height);
            composer.setSize(width, height);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        // Start animation
        try {
            console.log('Starting animation');
            animate();
            setIsLoading(false);
        } catch (err) {
            console.error('Animation error:', err);
            setError(err instanceof Error ? err.message : 'Failed to initialize visualization');
            setIsLoading(false);
        }

        // Cleanup
        return () => {
            console.log('Cleaning up Three.js scene');
            isActive = false;
            window.removeEventListener('resize', handleResize);

            scene.remove(particles);
            scene.remove(lines);
            geometry.dispose();
            material.dispose();
            lineGeometry.dispose();
            lineMaterial.dispose();
            renderer.dispose();
            composer.dispose();

            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div className="relative w-full min-h-[800px] flex items-center justify-center py-16">
            <div className="relative w-full max-w-7xl mx-auto">
                {/* Three.js Container */}
                <div
                    ref={containerRef}
                    className="w-full h-[700px] relative bg-black"
                    style={{
                        zIndex: 1,
                        position: 'relative'
                    }}
                />

                {/* Decorative Frame - In front of canvas but allowing pointer events to pass through */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ zIndex: 2 }}
                >
                    {/* Main frame */}
                    <div className="absolute inset-8">
                        {/* Outer frame with gradient */}
                        <div className="absolute inset-0 border-[1px] border-[#A28A77] rounded-sm overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-b from-[#A28A77]/5 to-transparent opacity-30" />
                        </div>

                        {/* Inner frame details */}
                        <div className="absolute inset-[2px] border-[1px] border-[#A28A77]/20 rounded-sm" />

                        {/* Corner Accents */}
                        <div className="absolute top-6 left-6 w-16 h-16 border-t-[1px] border-l-[1px] border-[#A28A77] opacity-60" />
                        <div className="absolute top-6 right-6 w-16 h-16 border-t-[1px] border-r-[1px] border-[#A28A77] opacity-60" />
                        <div className="absolute bottom-6 left-6 w-16 h-16 border-b-[1px] border-l-[1px] border-[#A28A77] opacity-60" />
                        <div className="absolute bottom-6 right-6 w-16 h-16 border-b-[1px] border-r-[1px] border-[#A28A77] opacity-60" />

                        {/* Additional corner details */}
                        <div className="absolute top-0 left-0 w-24 h-[1px] bg-gradient-to-r from-[#A28A77] to-transparent opacity-40" />
                        <div className="absolute top-0 right-0 w-24 h-[1px] bg-gradient-to-l from-[#A28A77] to-transparent opacity-40" />
                        <div className="absolute bottom-0 left-0 w-24 h-[1px] bg-gradient-to-r from-[#A28A77] to-transparent opacity-40" />
                        <div className="absolute bottom-0 right-0 w-24 h-[1px] bg-gradient-to-l from-[#A28A77] to-transparent opacity-40" />

                        <div className="absolute top-0 left-0 w-[1px] h-24 bg-gradient-to-b from-[#A28A77] to-transparent opacity-40" />
                        <div className="absolute top-0 right-0 w-[1px] h-24 bg-gradient-to-b from-[#A28A77] to-transparent opacity-40" />
                        <div className="absolute bottom-0 left-0 w-[1px] h-24 bg-gradient-to-t from-[#A28A77] to-transparent opacity-40" />
                        <div className="absolute bottom-0 right-0 w-[1px] h-24 bg-gradient-to-t from-[#A28A77] to-transparent opacity-40" />
                    </div>
                </div>

                {/* Loading/Error States */}
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm" style={{ zIndex: 20 }}>
                        <div className="text-[#E6D5C9] text-lg">Initializing...</div>
                    </div>
                )}
                {error && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm" style={{ zIndex: 20 }}>
                        <div className="text-red-400 text-lg">{error}</div>
                    </div>
                )}

                {/* Description */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-center pointer-events-none" style={{ zIndex: 3 }}>
                    <div className="max-w-2xl mx-auto space-y-4 backdrop-blur-sm bg-black/30 p-6 rounded-sm border border-[#A28A77]/20">
                        <h2 className="font-light text-2xl tracking-wider text-[#E6D5C9]">
                            Synaptic Resonance
                        </h2>
                        <p className="text-[#E6D5C9]/90 text-sm leading-relaxed font-light tracking-wide">
                            A dynamic visualization of artificial neural pathways, where luminous nodes forge ephemeral connections in an ever-evolving dance of digital consciousness. Each point represents a thought spark, while the flowing lines between them trace the paths of idea transmission through the network.
                        </p>
                        <div className="pt-2">
                            <span className="text-[#E6D5C9]/70 text-xs tracking-widest uppercase">
                                Interactive Installation • 2024
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIModelShowcase; 