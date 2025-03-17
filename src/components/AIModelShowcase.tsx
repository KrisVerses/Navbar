import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import * as tf from '@tensorflow/tfjs';
import p5 from 'p5';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

/**
 * AIModelShowcase Component
 * 
 * A sophisticated 3D visualization that combines Three.js, TensorFlow.js, and p5.js
 * to create an interactive neural network representation.
 * 
 * Learning Exercises:
 * 1. Particle Systems: Study how the nodes are created and animated
 *    - Examine the particle geometry and shader material
 *    - Understand how positions, colors, and sizes are updated
 * 
 * 2. Interactive 3D: Learn about user interaction in Three.js
 *    - Study the OrbitControls implementation
 *    - Understand raycasting for particle selection
 *    - See how mouse events affect the visualization
 * 
 * 3. Neural Networks: Explore the TensorFlow.js integration
 *    - Look at how the model is structured
 *    - Understand how predictions influence particle movement
 *    - Study the relationship between AI and visualization
 * 
 * 4. Creative Coding: Learn about creative visualization
 *    - See how p5.js creates the background flow field
 *    - Study the shader effects and post-processing
 *    - Understand how multiple libraries work together
 */

interface NeuralNode {
    position: THREE.Vector3;
    target: THREE.Vector3;
    velocity: THREE.Vector3;
    connections: number[];
    activation: number;
    isSecondStrand: boolean;
    baseAngle: number;
    heightProgress: number;
}

interface MoodSettings {
    backgroundColor: string;
    particleColors: number[][];
    animationSpeed: number;
    waveIntensity: number;
    pattern: 'spiral' | 'sphere' | 'cube' | 'wave' | 'explosion' | 'flow';
    patternParams: {
        radius?: number;
        spread?: number;
        size?: number;
        amplitude?: number;
        frequency?: number;
        wavelength?: number;
        flowSpeed?: number;
    };
    bloomStrength: number;
    description: string;
}

interface DynamicMoodSettings extends MoodSettings {
    intensity: number;
    complexity: number;
    symmetry: number;
}

const moodPresets: Record<string, MoodSettings> = {
    calm: {
        backgroundColor: '#0a0f18',
        particleColors: [
            [1.0, 1.0, 1.0],     // Pure White
            [0.7, 0.9, 1.0],     // Neural Blue
            [0.8, 0.95, 1.0],    // Digital Cyan
            [0.75, 0.85, 1.0],   // Tech Blue
        ],
        animationSpeed: 0.08,
        waveIntensity: 0.5,
        pattern: 'flow',
        patternParams: {
            radius: 25,
            spread: 45,
            frequency: 0.15,
            amplitude: 10,
            wavelength: 4,
            flowSpeed: 0.05
        },
        bloomStrength: 0.6,
        description: 'A sophisticated neural network visualization with smooth, flowing connections representing AI processing patterns.'
    },
    energetic: {
        backgroundColor: '#0f1a2d',
        particleColors: [
            [1.0, 1.0, 1.0],     // Pure White
            [0.9, 0.7, 1.0],     // Innovation Purple
            [0.7, 0.9, 1.0],     // Tech Blue
            [1.0, 0.8, 0.6],     // Warm Intelligence
        ],
        animationSpeed: 0.8,
        waveIntensity: 2.5,
        pattern: 'explosion',
        patternParams: {
            radius: 30,
            spread: 55,
            frequency: 1.8,
            amplitude: 12
        },
        bloomStrength: 1.0,
        description: 'Dynamic neural pathways showcasing the power of AI-driven solutions and rapid information processing.'
    },
    melancholic: {
        backgroundColor: '#1a1a2d',
        particleColors: [
            [0.9, 0.9, 1.0],     // Ethereal White
            [0.7, 0.7, 0.9],     // Deep Learning Purple
            [0.6, 0.8, 1.0],     // Algorithm Blue
            [0.8, 0.7, 0.9],     // Quantum Purple
        ],
        animationSpeed: 0.15,
        waveIntensity: 0.8,
        pattern: 'wave',
        patternParams: {
            amplitude: 10,
            frequency: 0.4,
            spread: 45,
            radius: 20
        },
        bloomStrength: 0.5,
        description: 'Complex wave patterns representing deep learning algorithms processing intricate data structures.'
    },
    joyful: {
        backgroundColor: '#0d1f2d',
        particleColors: [
            [1.0, 1.0, 1.0],     // Pure White
            [0.8, 1.0, 0.9],     // AI Mint
            [0.7, 0.9, 1.0],     // Innovation Blue
            [0.9, 0.8, 1.0],     // Tech Purple
        ],
        animationSpeed: 0.5,
        waveIntensity: 1.8,
        pattern: 'sphere',
        patternParams: {
            radius: 25,
            spread: 50,
            frequency: 1.2,
            amplitude: 12
        },
        bloomStrength: 0.8,
        description: 'An energetic visualization of AI networks collaborating in perfect harmony, showcasing the beauty of intelligent systems.'
    }
};

const analyzeMood = (input: string): DynamicMoodSettings => {
    const mood = input.toLowerCase();
    const words = mood.split(' ');

    // Analyze emotional intensity
    const intensityWords = ['very', 'extremely', 'slightly', 'somewhat', 'really', 'quite'];
    let intensity = 1.0;
    words.forEach(word => {
        if (intensityWords.includes(word)) {
            intensity *= word === 'very' || word === 'extremely' ? 1.5 :
                word === 'slightly' ? 0.5 : 0.8;
        }
    });

    // Analyze emotional complexity
    const complexityWords = ['mixed', 'confused', 'complicated', 'complex', 'simple', 'clear'];
    let complexity = 1.0;
    words.forEach(word => {
        if (complexityWords.includes(word)) {
            complexity *= word === 'mixed' || word === 'confused' ? 1.5 :
                word === 'simple' || word === 'clear' ? 0.7 : 1.0;
        }
    });

    // Analyze emotional symmetry
    const symmetryWords = ['balanced', 'unbalanced', 'chaotic', 'orderly', 'harmonious'];
    let symmetry = 1.0;
    words.forEach(word => {
        if (symmetryWords.includes(word)) {
            symmetry *= word === 'balanced' || word === 'harmonious' ? 1.2 :
                word === 'chaotic' ? 0.5 : 1.0;
        }
    });

    // Determine base mood and color scheme
    let baseMood: MoodSettings;
    if (mood.includes('happ') || mood.includes('joy') || mood.includes('excit')) {
        baseMood = moodPresets.joyful;
    } else if (mood.includes('sad') || mood.includes('depress') || mood.includes('melanchol')) {
        baseMood = moodPresets.melancholic;
    } else if (mood.includes('energ') || mood.includes('activ') || mood.includes('power')) {
        baseMood = moodPresets.energetic;
    } else {
        baseMood = moodPresets.calm;
    }

    // Create dynamic settings based on analysis
    const dynamicSettings: DynamicMoodSettings = {
        ...baseMood,
        intensity,
        complexity,
        symmetry,
        animationSpeed: baseMood.animationSpeed * intensity,
        waveIntensity: baseMood.waveIntensity * intensity,
        patternParams: {
            ...baseMood.patternParams,
            radius: (baseMood.patternParams.radius || 15) * (symmetry * 0.5 + 0.5),
            spread: (baseMood.patternParams.spread || 35) * complexity,
            amplitude: (baseMood.patternParams.amplitude || 10) * intensity,
            frequency: (baseMood.patternParams.frequency || 0.5) * complexity,
        },
        description: `A ${intensity > 1.2 ? 'highly' : intensity < 0.8 ? 'subtly' : ''} 
                     ${complexity > 1.2 ? 'complex' : complexity < 0.8 ? 'simple' : ''} 
                     ${symmetry > 1.2 ? 'harmonious' : symmetry < 0.8 ? 'dynamic' : ''} 
                     pattern reflecting ${input}.`
    };

    return dynamicSettings;
};

const AIModelShowcase = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const p5ContainerRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentMood, setCurrentMood] = useState<string>('calm');
    const [moodDescription, setMoodDescription] = useState<string>(moodPresets.calm.description);
    const animationSettingsRef = useRef<MoodSettings>(moodPresets.calm);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const bloomPassRef = useRef<UnrealBloomPass | null>(null);

    // Function to update mood settings - defined outside useEffect
    const updateMoodSettings = (mood: string) => {
        if (!sceneRef.current || !rendererRef.current || !bloomPassRef.current) return;

        let newSettings: MoodSettings;
        newSettings = moodPresets[mood as keyof typeof moodPresets] || moodPresets.calm;

        // Update animation settings
        animationSettingsRef.current = newSettings;
        setMoodDescription(newSettings.description);

        // Update scene properties
        sceneRef.current.background = new THREE.Color(newSettings.backgroundColor);
        sceneRef.current.fog = new THREE.FogExp2(newSettings.backgroundColor, 0.002);
        bloomPassRef.current.strength = newSettings.bloomStrength;
    };

    useEffect(() => {
        if (!containerRef.current || !p5ContainerRef.current) return;

        let isActive = true;
        const container = containerRef.current;
        const p5Container = p5ContainerRef.current;

        // Initialize TensorFlow model
        const initModel = async () => {
            try {
                const model = tf.sequential();
                model.add(tf.layers.dense({ units: 32, inputShape: [3], activation: 'tanh' }));
                model.add(tf.layers.dense({ units: 16, activation: 'relu' }));
                model.add(tf.layers.dense({ units: 3, activation: 'tanh' }));
                await model.compile({ optimizer: 'adam', loss: 'meanSquaredError' });
                return model;
            } catch (error) {
                console.error('Model initialization error:', error);
                throw error;
            }
        };

        // Scene setup
        const scene = new THREE.Scene();
        sceneRef.current = scene;
        scene.background = new THREE.Color(moodPresets[currentMood].backgroundColor);
        scene.fog = new THREE.FogExp2(moodPresets[currentMood].backgroundColor, 0.002);

        // Camera setup
        const camera = new THREE.PerspectiveCamera(
            60,
            container.clientWidth / container.clientHeight,
            0.1,
            1000
        );
        camera.position.set(40, 0, 0);
        camera.lookAt(0, 0, 0);

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
        });
        rendererRef.current = renderer;
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Post-processing setup
        const composer = new EffectComposer(renderer);
        const renderPass = new RenderPass(scene, camera);
        composer.addPass(renderPass);

        const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(container.clientWidth, container.clientHeight),
            1.0,
            0.4,
            0.85
        );
        bloomPassRef.current = bloomPass;
        bloomPass.threshold = 0.15;
        bloomPass.strength = moodPresets[currentMood].bloomStrength;
        bloomPass.radius = 0.5;
        composer.addPass(bloomPass);

        // Interactive controls setup
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.enableZoom = true;
        controls.zoomSpeed = 0.8;
        controls.minDistance = 30;
        controls.maxDistance = 100;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.2;
        controls.enablePan = false;
        controls.rotateSpeed = 0.5;
        controls.target.set(0, 0, 0);
        controls.update();

        // Mouse interaction setup
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        let selectedNode: number | null = null;
        let hoveredNode: number | null = null;

        // Helper functions for node interaction
        const handleNodeHover = (index: number) => {
            if (hoveredNode === index) return;

            if (hoveredNode !== null && hoveredNode !== selectedNode) {
                resetNodeColor(hoveredNode);
            }

            hoveredNode = index;
            if (hoveredNode !== selectedNode) {
                const colors = particles.geometry.attributes.color.array as Float32Array;
                colors[hoveredNode * 3] = 0.9;
                colors[hoveredNode * 3 + 1] = 0.9;
                colors[hoveredNode * 3 + 2] = 0.9;
                particles.geometry.attributes.color.needsUpdate = true;
            }
        };

        const resetHoveredNode = () => {
            if (hoveredNode !== null && hoveredNode !== selectedNode) {
                resetNodeColor(hoveredNode);
            }
            hoveredNode = null;
        };

        const handleNodeSelect = (index: number) => {
            if (selectedNode !== null) {
                resetNodeColor(selectedNode);
            }

            selectedNode = selectedNode === index ? null : index;

            if (selectedNode !== null) {
                const colors = particles.geometry.attributes.color.array as Float32Array;
                colors[index * 3] = 1.0;
                colors[index * 3 + 1] = 1.0;
                colors[index * 3 + 2] = 1.0;

                const sizes = particles.geometry.attributes.size.array as Float32Array;
                sizes[index] = 4.0;
                particles.geometry.attributes.size.needsUpdate = true;
            }

            particles.geometry.attributes.color.needsUpdate = true;
        };

        const resetNodeColor = (index: number) => {
            const colors = particles.geometry.attributes.color.array as Float32Array;
            const intensity = 0.7 + Math.random() * 0.3;
            colors[index * 3] = intensity;
            colors[index * 3 + 1] = intensity;
            colors[index * 3 + 2] = intensity;
            particles.geometry.attributes.color.needsUpdate = true;
        };

        // Event listeners for particle interaction only
        const onMouseMove = (event: MouseEvent) => {
            // Update mouse position
            const rect = container.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / container.clientWidth) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / container.clientHeight) * 2 + 1;

            // Handle hover effects
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObject(particles);

            if (intersects.length > 0 && intersects[0].index !== undefined) {
                handleNodeHover(intersects[0].index);
                container.style.cursor = 'pointer';
            } else {
                resetHoveredNode();
                container.style.cursor = 'default';
            }
        };

        const onClick = (event: MouseEvent) => {
            // Update mouse position
            const rect = container.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / container.clientWidth) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / container.clientHeight) * 2 + 1;

            // Handle node selection
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObject(particles);

            if (intersects.length > 0 && intersects[0].index !== undefined) {
                handleNodeSelect(intersects[0].index);
            }
        };

        const onWheel = (event: WheelEvent) => {
            event.preventDefault(); // Prevent page scroll

            // Update camera zoom
            const delta = -Math.sign(event.deltaY);
            const zoomSpeed = controls.zoomSpeed;
            const distance = camera.position.distanceTo(controls.target);
            const newDistance = Math.max(
                controls.minDistance,
                Math.min(controls.maxDistance, distance - delta * zoomSpeed * 2)
            );

            camera.position.setLength(newDistance);
            camera.updateProjectionMatrix();

            // Visual feedback
            container.style.cursor = 'zoom-in';
            setTimeout(() => {
                container.style.cursor = 'default';
            }, 300);
        };

        // Add event listeners
        container.addEventListener('mousemove', onMouseMove);
        container.addEventListener('click', onClick);
        container.addEventListener('wheel', onWheel, { passive: false });
        container.addEventListener('contextmenu', (event) => event.preventDefault());

        // Neural network visualization
        const nodeCount = 300; // Increased for more complexity

        // Enhanced pastel color palette - AI-themed
        const pastelColors = [
            [1.0, 1.0, 1.0],     // Pure White
            [0.7, 0.9, 1.0],     // Neural Blue
            [0.9, 0.7, 1.0],     // Quantum Purple
            [0.8, 1.0, 0.9],     // AI Mint
            [1.0, 0.85, 0.7],    // Warm Intelligence
        ];

        // Initialize nodes with helix distribution
        const nodes: NeuralNode[] = [];
        const positions = new Float32Array(nodeCount * 3);
        const colors = new Float32Array(nodeCount * 3);
        const sizes = new Float32Array(nodeCount);

        // Helix parameters
        const helixRadius = 15;
        const helixHeight = 40;
        const helixTurns = 2;
        const helixOffset = Math.PI; // Offset between the two strands

        // Initialize nodes with helix distribution
        for (let i = 0; i < nodeCount; i++) {
            // Determine which strand this node belongs to
            const isSecondStrand = i >= nodeCount / 2;
            const strandIndex = isSecondStrand ? i - nodeCount / 2 : i;
            const progress = (strandIndex / (nodeCount / 2)) * Math.PI * 2 * helixTurns;

            // Calculate helix position
            const angle = progress + (isSecondStrand ? helixOffset : 0);
            const heightProgress = (strandIndex / (nodeCount / 2)) * 2 - 1; // -1 to 1

            const position = new THREE.Vector3(
                Math.cos(angle) * helixRadius,
                heightProgress * helixHeight,
                Math.sin(angle) * helixRadius
            );

            nodes.push({
                position,
                target: position.clone(),
                velocity: new THREE.Vector3(),
                connections: [],
                activation: Math.random(),
                isSecondStrand,
                baseAngle: angle,
                heightProgress
            });

            positions[i * 3] = position.x;
            positions[i * 3 + 1] = position.y;
            positions[i * 3 + 2] = position.z;

            // Assign strand-specific colors
            const color = pastelColors[isSecondStrand ? 1 : 2];
            colors[i * 3] = color[0];
            colors[i * 3 + 1] = color[1];
            colors[i * 3 + 2] = color[2];

            sizes[i] = 1.0 + Math.random() * 0.5;
        }

        // Create particles
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        // Custom shader material with enhanced effects
        const material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                pixelRatio: { value: renderer.getPixelRatio() }
            },
            vertexShader: `
                attribute float size;
                attribute vec3 color;
                varying vec3 vColor;
                uniform float time;
                
                void main() {
                    vColor = color;
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    
                    // Enhanced pulse effect with multiple frequencies
                    float mainPulse = sin(time * 0.5 + position.x * 0.02 + position.y * 0.02 + position.z * 0.02) * 0.15;
                    float microPulse = sin(time * 2.0 + position.x * 0.05) * 0.05;
                    float finalPulse = mainPulse + microPulse + 0.9;
                    
                    gl_PointSize = size * (350.0 / length(mvPosition.xyz)) * finalPulse;
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                varying vec3 vColor;
                
                void main() {
                    vec2 xy = gl_PointCoord.xy - vec2(0.5);
                    float r = length(xy);
                    
                    // Enhanced particle glow effect
                    float glow = exp(-r * 3.0);
                    float core = 1.0 - smoothstep(0.3, 0.5, r);
                    float halo = (1.0 - smoothstep(0.4, 0.5, r)) * 0.5;
                    
                    vec3 finalColor = vColor * core + vColor * glow * 0.5;
                    float alpha = core + halo;
                    
                    gl_FragColor = vec4(finalColor, alpha);
                }
            `,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        // Initialize p5 instance
        new p5((p: p5) => {
            let flowField: number[][] = [];
            const scale = 20;
            const cols = Math.floor(p.width / scale);
            const rows = Math.floor(p.height / scale);

            p.setup = () => {
                const canvas = p.createCanvas(p5Container.clientWidth, p5Container.clientHeight);
                canvas.parent(p5Container);
                p.background(8, 8, 8, 0);
                p.noFill();

                // Initialize flow field
                for (let x = 0; x < cols; x++) {
                    flowField[x] = [];
                    for (let y = 0; y < rows; y++) {
                        flowField[x][y] = p.noise(x * 0.1, y * 0.1) * p.TWO_PI;
                    }
                }
            };

            p.draw = () => {
                p.clear();
                p.stroke(255, 255, 255, 15);
                p.strokeWeight(0.5);

                for (let x = 0; x < cols; x++) {
                    for (let y = 0; y < rows; y++) {
                        const angle = flowField[x][y];
                        const centerX = x * scale;
                        const centerY = y * scale;

                        p.push();
                        p.translate(centerX, centerY);
                        p.rotate(angle);
                        p.line(0, 0, scale * 0.5, 0);
                        p.pop();

                        flowField[x][y] += 0.001;
                    }
                }
            };

            p.windowResized = () => {
                p.resizeCanvas(p5Container.clientWidth, p5Container.clientHeight);
            };
        });

        // Animation loop with controls update
        let frame = 0;
        let tfModel: tf.Sequential | null = null;

        const animate = async () => {
            if (!isActive) return;

            requestAnimationFrame(animate);
            frame++;

            // Update controls first
            controls.update();

            // Rest of the animation code...
            const time = Date.now() * 0.001;
            material.uniforms.time.value = time;

            // Update particles with helix motion
            const positions = particles.geometry.attributes.position.array as Float32Array;
            const colors = particles.geometry.attributes.color.array as Float32Array;

            nodes.forEach((node, i) => {
                const settings = animationSettingsRef.current;
                const time = Date.now() * 0.001;

                let targetX = 0, targetY = 0, targetZ = 0;
                const nodeTime = time + i * 0.1;

                switch (settings.pattern) {
                    case 'flow':
                        // Calm: Smooth, flowing wave pattern
                        const flowTime = time * settings.patternParams.flowSpeed!;
                        const baseFreq = settings.patternParams.frequency!;
                        const waveLength = settings.patternParams.wavelength!;

                        // Calculate multiple smooth waves for more organic movement
                        const wave1 = Math.sin(nodeTime * baseFreq + (node.position.x / waveLength));
                        const wave2 = Math.cos(nodeTime * baseFreq * 0.5 + (node.position.z / waveLength));
                        const wave3 = Math.sin(flowTime * 0.7 + (node.position.x + node.position.z) / waveLength);

                        // Combine waves with different weights for smooth flow
                        const combinedWave = (wave1 * 0.4 + wave2 * 0.3 + wave3 * 0.3) * settings.patternParams.amplitude!;

                        // Create a flowing circular pattern
                        const flowRadius = settings.patternParams.radius!;
                        const flowAngle = (i / nodeCount) * Math.PI * 2 + flowTime * 0.2;
                        const radialOffset = Math.sin(flowTime + i * 0.1) * 5;

                        targetX = Math.cos(flowAngle) * (flowRadius + radialOffset) + Math.sin(flowTime * 0.2) * 5;
                        targetY = combinedWave + Math.sin(flowTime * 0.15 + i * 0.05) * 2;
                        targetZ = Math.sin(flowAngle) * (flowRadius + radialOffset) + Math.cos(flowTime * 0.2) * 5;
                        break;

                    case 'explosion':
                        // Energetic: Dynamic explosive pattern with orbital motion
                        const explosionRadius = settings.patternParams.radius! * (1 + Math.sin(nodeTime) * 0.3);
                        const explosionAngle = (i / nodeCount) * Math.PI * 2 + time * settings.animationSpeed;
                        const verticalMotion = Math.sin(nodeTime * 2) * settings.patternParams.amplitude!;
                        const orbitSpeed = time * settings.animationSpeed * 2;

                        targetX = Math.cos(explosionAngle) * explosionRadius * (1 + Math.sin(orbitSpeed) * 0.3);
                        targetY = verticalMotion + Math.sin(time * 3 + i) * settings.patternParams.spread! * 0.3;
                        targetZ = Math.sin(explosionAngle) * explosionRadius * (1 + Math.cos(orbitSpeed) * 0.3);
                        break;

                    case 'wave':
                        // Melancholic: Slow, undulating waves with gentle drift
                        const baseX = (i % 10) * 4 - 20;
                        const baseZ = Math.floor(i / 10) * 4 - 20;
                        const wavePhase = baseX * settings.patternParams.frequency! + time * settings.animationSpeed;
                        const primaryWave = Math.sin(wavePhase) * settings.patternParams.amplitude!;
                        const secondaryWave = Math.cos(wavePhase * 0.5) * settings.patternParams.amplitude! * 0.5;

                        targetX = baseX + Math.sin(time * 0.2 + i * 0.05) * 2;
                        targetY = primaryWave + secondaryWave;
                        targetZ = baseZ + Math.cos(time * 0.2 + i * 0.05) * 2;
                        break;

                    case 'sphere':
                        // Joyful: Bouncing, pulsing sphere with orbital motion
                        const phi = Math.acos(-1 + (2 * i) / nodeCount);
                        const theta = Math.sqrt(nodeCount * Math.PI) * phi + time * settings.animationSpeed;
                        const radius = settings.patternParams.radius! * (1 + Math.sin(nodeTime * 2) * 0.2);
                        const bounce = Math.sin(time * 3) * settings.patternParams.amplitude! * 0.3;

                        targetX = radius * Math.cos(theta) * Math.sin(phi);
                        targetY = radius * Math.sin(theta) * Math.sin(phi) + bounce;
                        targetZ = radius * Math.cos(phi);
                        break;
                }

                // Enhanced particle effects based on mood
                const particleEffect = (() => {
                    switch (settings.pattern) {
                        case 'explosion':
                            // Energetic particles pulse more dramatically and move faster
                            return {
                                randomness: 0.4,
                                pulseSpeed: 4.0,
                                pulseIntensity: 0.5,
                                lerpFactor: 0.15
                            };
                        case 'sphere':
                            // Joyful particles bounce and pulse rhythmically
                            return {
                                randomness: 0.2,
                                pulseSpeed: 3.0,
                                pulseIntensity: 0.3,
                                lerpFactor: 0.1
                            };
                        case 'wave':
                            // Melancholic particles move slowly with subtle variations
                            return {
                                randomness: 0.05,
                                pulseSpeed: 1.5,
                                pulseIntensity: 0.15,
                                lerpFactor: 0.03
                            };
                        default:
                            // Ultra-smooth calm particles
                            return {
                                randomness: 0.01,      // Minimal random movement
                                pulseSpeed: 0.8,       // Very slow pulse
                                pulseIntensity: 0.15,  // Subtle size changes
                                lerpFactor: 0.015      // Super smooth transitions
                            };
                    }
                })();

                // Apply mood-specific movement
                const lerpFactor = particleEffect.lerpFactor;
                node.position.x += (targetX - node.position.x) * lerpFactor;
                node.position.y += (targetY - node.position.y) * lerpFactor;
                node.position.z += (targetZ - node.position.z) * lerpFactor;

                // Add mood-specific random motion
                const randomness = particleEffect.randomness;
                node.position.x += (Math.random() - 0.5) * randomness;
                node.position.y += (Math.random() - 0.5) * randomness;
                node.position.z += (Math.random() - 0.5) * randomness;

                // Enhanced particle size pulsing based on mood
                const basePulse = Math.sin(time * particleEffect.pulseSpeed + i * 0.1) * particleEffect.pulseIntensity + 1.0;

                if (selectedNode === i) {
                    // Selected node has more dramatic effects
                    const selectionPulse = Math.sin(time * 5.0) * 0.4 + 1.2;
                    sizes[i] = 2.5 * selectionPulse;

                    // More dramatic color for selected node
                    colors[i * 3] = 1.0;
                    colors[i * 3 + 1] = 1.0;
                    colors[i * 3 + 2] = 1.0;
                } else if (hoveredNode === i) {
                    // Hovered node has moderate effects
                    const hoverPulse = Math.sin(time * 3.0) * 0.3 + 1.1;
                    sizes[i] = 2.0 * hoverPulse;

                    // Enhanced hover color based on mood
                    const baseColor = settings.particleColors[node.isSecondStrand ? 1 : 2];
                    colors[i * 3] = Math.min(baseColor[0] + 0.2, 1.0);
                    colors[i * 3 + 1] = Math.min(baseColor[1] + 0.2, 1.0);
                    colors[i * 3 + 2] = Math.min(baseColor[2] + 0.2, 1.0);
                } else {
                    // Normal state with mood-specific animation
                    sizes[i] = 1.2 * basePulse;

                    // Dynamic color variation based on mood
                    const colorIndex = (i % settings.particleColors.length);
                    const baseColor = settings.particleColors[colorIndex];
                    const colorPulse = Math.sin(time * 2 + i * 0.1) * 0.1;

                    colors[i * 3] = Math.min(baseColor[0] + colorPulse, 1.0);
                    colors[i * 3 + 1] = Math.min(baseColor[1] + colorPulse, 1.0);
                    colors[i * 3 + 2] = Math.min(baseColor[2] + colorPulse, 1.0);
                }

                // Update positions
                positions[i * 3] = node.position.x;
                positions[i * 3 + 1] = node.position.y;
                positions[i * 3 + 2] = node.position.z;
            });

            particles.geometry.attributes.position.needsUpdate = true;
            particles.geometry.attributes.size.needsUpdate = true;
            particles.geometry.attributes.color.needsUpdate = true;

            // Render after all updates
            composer.render();
        };

        // Initialize and start
        const init = async () => {
            try {
                tfModel = await initModel();
                await tfModel.compile({ optimizer: 'adam', loss: 'meanSquaredError' });
                animate();
                setIsLoading(false);
            } catch (err) {
                console.error('Initialization error:', err);
                setError(err instanceof Error ? err.message : 'Failed to initialize');
                setIsLoading(false);
            }
        };

        // Handle resize
        const handleResize = () => {
            if (!container || !p5Container) return;

            const width = container.clientWidth;
            const height = container.clientHeight;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();

            renderer.setSize(width, height);
            composer.setSize(width, height);
        };

        window.addEventListener('resize', handleResize);

        // Start initialization
        init();

        // Cleanup
        return () => {
            isActive = false;
            window.removeEventListener('resize', handleResize);

            // Remove all event listeners
            container.removeEventListener('mousemove', onMouseMove);
            container.removeEventListener('click', onClick);
            container.removeEventListener('wheel', onWheel);
            container.removeEventListener('contextmenu', (event) => event.preventDefault());

            if (scene) {
                scene.remove(particles);
            }
            if (geometry) {
                geometry.dispose();
            }
            if (material) {
                material.dispose();
            }
            if (renderer) {
                renderer.dispose();
            }
            if (composer) {
                composer.dispose();
            }
            if (tfModel) {
                tfModel.dispose();
            }
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }

            // Clear refs
            sceneRef.current = null;
            rendererRef.current = null;
            bloomPassRef.current = null;
        };
    }, [currentMood]);

    return (
        <div className="relative w-full h-[calc(100vh-4rem)] mt-16 overflow-hidden" style={{ backgroundColor: moodPresets[currentMood].backgroundColor }}>
            <div ref={containerRef} className="absolute inset-0">
                <div ref={p5ContainerRef} className="absolute inset-0 opacity-15" />
            </div>

            {/* Interaction Guide - Moved to top-left with improved spacing */}
            <div className="absolute top-12 left-[420px] z-10 bg-black/40 backdrop-blur-lg rounded-xl border border-white/20 p-5">
                <p className="text-white/90 text-sm font-medium mb-4">Interaction Guide</p>
                <ul className="space-y-3 text-white/70 text-sm">
                    <li className="flex items-center space-x-3">
                        <span className="w-1.5 h-1.5 bg-white/70 rounded-full"></span>
                        <span>Click particles to select</span>
                    </li>
                    <li className="flex items-center space-x-3">
                        <span className="w-1.5 h-1.5 bg-white/70 rounded-full"></span>
                        <span>Scroll to zoom in/out</span>
                    </li>
                </ul>
            </div>

            {/* Mood Controls - Moved to top-right with improved spacing */}
            <div className="absolute top-12 right-12 z-10 bg-black/40 backdrop-blur-lg rounded-xl border border-white/20 p-6 w-80 space-y-6 shadow-xl">
                <div className="space-y-3">
                    <label className="text-white/90 text-sm font-medium">Select Mood</label>
                    <select
                        value={currentMood}
                        onChange={(e) => {
                            const newMood = e.target.value;
                            setCurrentMood(newMood);
                            updateMoodSettings(newMood);
                        }}
                        className="w-full bg-black/50 text-white rounded-lg px-4 py-3 
                                 border border-white/20 
                                 focus:outline-none focus:ring-2 focus:ring-white/30
                                 appearance-none cursor-pointer
                                 hover:bg-black/60 transition-colors duration-200"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 1rem center',
                            backgroundSize: '1.5em 1.5em',
                            paddingRight: '2.5rem'
                        }}
                    >
                        <option value="calm" className="bg-[#0a0f18] text-white">Calm</option>
                        <option value="energetic" className="bg-[#0f1a2d] text-white">Energetic</option>
                        <option value="melancholic" className="bg-[#1a1a2d] text-white">Melancholic</option>
                        <option value="joyful" className="bg-[#0d1f2d] text-white">Joyful</option>
                    </select>
                </div>

                <div className="pt-2 border-t border-white/10">
                    <p className="text-white/70 text-sm leading-relaxed italic">{moodDescription}</p>
                </div>
            </div>

            {/* Project Description - Adjusted spacing and width */}
            <div className="absolute inset-x-0 bottom-16 px-12 pointer-events-none">
                <div className="max-w-5xl mx-auto"> {/* Increased max-width */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative pointer-events-auto"
                    >
                        <div className="relative p-8 bg-black/40 backdrop-blur-lg rounded-xl border border-white/20">
                            <div className="space-y-8"> {/* Increased spacing */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-4xl font-light tracking-wider text-white/95 mb-3"> {/* Increased size */}
                                            AI-Powered Creative Solutions
                                        </h2>
                                        <p className="text-white/60 text-sm tracking-wider uppercase">
                                            Transforming Ideas into Digital Reality
                                        </p>
                                    </div>
                                    <Link
                                        to="/projects"
                                        className="px-6 py-3 bg-white/10 border border-white/20 rounded-lg
                                                 text-white/90 text-sm tracking-wide font-medium
                                                 hover:bg-white/20 transition-all duration-300
                                                 flex items-center space-x-3"
                                    >
                                        <span>View Projects</span>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8"> {/* Increased gap */}
                                    <div className="space-y-3">
                                        <h3 className="text-white/90 font-medium text-lg">AI Integration</h3>
                                        <p className="text-white/70 text-sm leading-relaxed">
                                            Seamlessly blending artificial intelligence with creative design to deliver next-generation digital experiences.
                                        </p>
                                    </div>
                                    <div className="space-y-3">
                                        <h3 className="text-white/90 font-medium text-lg">Interactive Design</h3>
                                        <p className="text-white/70 text-sm leading-relaxed">
                                            Creating immersive, responsive interfaces that engage users and elevate brand experiences.
                                        </p>
                                    </div>
                                    <div className="space-y-3">
                                        <h3 className="text-white/90 font-medium text-lg">Technical Excellence</h3>
                                        <p className="text-white/70 text-sm leading-relaxed">
                                            Leveraging cutting-edge technologies to build robust, scalable solutions.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4 pt-3">
                                    <p className="text-white/50 text-sm tracking-wider">
                                        FEATURED PROJECT: QUANTUM NEXUS • 2024
                                    </p>
                                    <div className="flex-1 border-t border-white/10"></div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Loading/Error States */}
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
                    <div className="text-white text-lg font-medium">Initializing Quantum Network...</div>
                </div>
            )}
            {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
                    <div className="text-red-400 text-lg font-medium">{error}</div>
                </div>
            )}
        </div>
    );
};

export default AIModelShowcase; 