import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import BackgroundPattern from './BackgroundPattern';

/**
 * ProfileSidebar Component
 * 
 * A dynamic sidebar component that showcases professional information,
 * tech stack, and interactive filtering capabilities. Demonstrates advanced
 * React patterns and modern UI/UX practices.
 * 
 * Key Concepts:
 * 1. Component Composition
 * 2. State Management
 * 3. Dynamic Filtering
 * 4. CSS Grid/Flexbox Layout
 * 5. Framer Motion Animations
 * 
 * Learning Exercises:
 * 
 * Exercise 1 - State Management:
 * - How is the tech stack data structured?
 * - What triggers filter updates?
 * - How are active filters managed?
 * 
 * Exercise 2 - Layout Techniques:
 * - Study the grid system implementation
 * - Analyze responsive breakpoints
 * - Understand flex container usage
 * 
 * Exercise 3 - Animation Logic:
 * - How are transitions triggered?
 * - What elements use Framer Motion?
 * - Study animation timing and easing
 * 
 * Exercise 4 - Optimization:
 * - Identify memoization opportunities
 * - Analyze render performance
 * - Study event handler optimization
 */

interface TechItem {
    name: string;
    icon: string;
    color: string;
    bgColor: string;
}

interface TechStackData {
    frontend: TechItem[];
    graphics: TechItem[];
    backend: TechItem[];
}

type CategoryId = 'all' | keyof TechStackData;

// Add TechCategory type
type TechCategory = 'frontend' | 'backend' | 'graphics' | 'all';

/**
 * Type Definitions
 * 
 * Clear type definitions improve code maintainability and provide
 * better IDE support. Study how these types are used throughout
 * the component.
 */
interface Technology {
    name: string;
    icon: string;
    category: TechCategory;
    proficiency: number;
    description: string;
}

/**
 * Tech Stack Configuration
 * 
 * Centralized data management for easy updates and maintenance.
 * Consider how this could be expanded for different use cases.
 */
const techStack: Technology[] = [
    // ... existing tech stack ...
];

/**
 * Utility Functions
 * 
 * These helper functions handle common operations and calculations.
 * Understanding these is crucial for component functionality.
 */
const utils = {
    // ... existing utility functions ...
};

// Update Tooltip component with improved positioning
const Tooltip: React.FC<{
    content: string;
    children: React.ReactNode;
    position?: 'top' | 'bottom';
}> = ({ content, children, position = 'top' }) => {
    const positionClasses = {
        top: "absolute left-0 -translate-x-1/4 bottom-full mb-2",
        bottom: "absolute left-0 -translate-x-1/4 top-[calc(100%+4px)] mt-1"
    };

    const arrowClasses = {
        top: "absolute left-[25%] -translate-x-1/2 top-full -mt-1 border-4 border-transparent border-t-gray-900",
        bottom: "absolute left-[25%] -translate-x-1/2 bottom-full -mb-1 border-4 border-transparent border-b-gray-900"
    };

    return (
        <div className="group relative inline-block">
            {children}
            <div
                className={`${positionClasses[position]} hidden group-hover:block w-64 p-2 
                           bg-gray-900 text-white text-sm rounded-lg shadow-lg z-[9999]
                           pointer-events-none`}
            >
                {content}
                <div className={arrowClasses[position]} />
            </div>
        </div>
    );
};

// Update WavingHand component with better message sequence
const WavingHand: React.FC<{ isWaving: boolean; onClick: () => void; isOpen: boolean }> = ({ isWaving, onClick, isOpen }) => {
    const [emoji, setEmoji] = useState('👋');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [hasShownInitialMessage, setHasShownInitialMessage] = useState(false);

    // Initial message sequence
    useEffect(() => {
        // Show initial "Hey!"
        const heyTimer = setTimeout(() => {
            setToastMessage("Hey!");
            setShowToast(true);
            setHasShownInitialMessage(true);

            // Hide "Hey!" after 2s and show click prompt
            const promptTimer = setTimeout(() => {
                setToastMessage("Click me to open! 👆");
                setShowToast(true);
            }, 2000);

            return () => clearTimeout(promptTimer);
        }, 1000);

        return () => clearTimeout(heyTimer);
    }, []);

    // Handle state changes and messages
    useEffect(() => {
        if (!hasShownInitialMessage) return;

        if (isOpen) {
            // Clear any existing timeouts
            let timeouts: NodeJS.Timeout[] = [];

            // Show "Nice to meet you!" immediately
            setToastMessage("Nice to meet you!");
            setShowToast(true);

            // After slide animation (800ms) + rotation (500ms), change emoji and message
            const mainTimer = setTimeout(() => {
                setEmoji('👍');
                setToastMessage("Psst... give me a click when you're done! 😉");
            }, 1300);

            timeouts.push(mainTimer);

            return () => {
                timeouts.forEach(clearTimeout);
                setShowToast(false);
            };
        } else if (!isOpen && toastMessage !== "Hey!" && toastMessage !== "Click me to open! 👆") {
            // Reset to waving hand and show goodbye message
            setEmoji('👋');
            setToastMessage("See you later! 👋");
            setShowToast(true);
            const hideTimer = setTimeout(() => setShowToast(false), 2000);
            return () => clearTimeout(hideTimer);
        }
    }, [isOpen, hasShownInitialMessage]);

    return (
        <motion.div
            onClick={onClick}
            initial={{ x: 24, y: '50vh', scale: 1 }}
            animate={isOpen ? {
                x: 300,
                y: 180,
                scale: 0.8,
                transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    duration: 0.8
                }
            } : {
                x: 24,
                y: '50vh',
                scale: 1,
                transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    duration: 0.8
                }
            }}
            whileHover={!isOpen ? { scale: 1.1 } : {}}
            className={`fixed z-[60] cursor-pointer text-4xl filter drop-shadow-lg
                       transition-all duration-300 ${isOpen ? 'hover:scale-110' : ''}`}
            style={{
                originX: 0.7,
                originY: 0.7,
                transform: `translateY(-50%) ${isOpen ? 'translateX(-50%)' : ''}`
            }}
        >
            {/* Hand's Toast Message */}
            <AnimatePresence>
                {showToast && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: -45 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap
                                 bg-gray-900/90 text-white px-4 py-2 rounded-full text-sm
                                 backdrop-blur-sm border border-white/10 shadow-lg"
                    >
                        {toastMessage}
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                animate={isWaving && !isOpen ? {
                    rotate: [0, 14, -8, 14, -4, 10, 0],
                    transition: {
                        duration: 1.5,
                        ease: "easeInOut",
                        times: [0, 0.15, 0.3, 0.45, 0.6, 0.8, 1]
                    }
                } : isOpen ? {
                    rotate: [0, -45, 0],
                    transition: {
                        duration: 0.5,
                        ease: "easeInOut",
                        delay: 0.8
                    }
                } : {}}
            >
                {emoji}
            </motion.div>
        </motion.div>
    );
};

// Update Toast component with better styling and animations
const Toast: React.FC<{ message: string; isVisible: boolean; onClose: () => void }> = ({ message, isVisible, onClose }) => {
    useEffect(() => {
        if (isVisible) {
            // Keep the closing instruction visible longer
            const timeout = message.includes("Psst") ? 5000 : 3000;
            const timer = setTimeout(onClose, timeout);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose, message]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, x: '-50%' }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className="fixed bottom-4 left-1/2 transform -translate-x-1/2 
                             bg-gray-900/90 text-white px-6 py-3 rounded-2xl shadow-xl
                             flex items-center space-x-3 z-50 backdrop-blur-sm
                             border border-white/10"
                >
                    <span className="text-lg font-light whitespace-nowrap">{message}</span>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

/**
 * Main Component Implementation
 * 
 * The component manages:
 * 1. Tech stack filtering and display
 * 2. Category management
 * 3. Responsive layout
 * 4. Animation states
 * 
 * Learning Challenge:
 * - Add search functionality
 * - Implement sorting options
 * - Create custom filter animations
 */

interface ProfileSidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ isOpen, setIsOpen }) => {
    const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
    const [isBehindScenesExpanded, setIsBehindScenesExpanded] = useState(false);
    const [isWaving, setIsWaving] = useState(false);
    const [toastConfig, setToastConfig] = useState({ show: false, message: '' });

    const techStack: TechStackData = {
        frontend: [
            {
                name: 'React',
                icon: 'logos:react',
                color: '#61DAFB',
                bgColor: '#61DAFB10',
            },
            {
                name: 'TypeScript',
                icon: 'logos:typescript-icon',
                color: '#3178C6',
                bgColor: '#3178C610',
            },
        ],
        graphics: [
            {
                name: 'Three.js',
                icon: 'logos:threejs',
                color: '#8B5CF6',
                bgColor: '#8B5CF610',
            },
            {
                name: 'WebGL',
                icon: 'logos:webgl',
                color: '#990000',
                bgColor: '#99000010',
            },
        ],
        backend: [
            {
                name: 'Node.js',
                icon: 'logos:nodejs-icon',
                color: '#68A063',
                bgColor: '#68A06310',
            },
        ],
    };

    const categories = [
        { id: 'all' as const, label: 'All', icon: 'carbon:catalog' },
        { id: 'frontend' as const, label: 'Frontend', icon: 'carbon:application-web' },
        { id: 'graphics' as const, label: 'Graphics', icon: 'carbon:3d-cursor' },
        { id: 'backend' as const, label: 'Backend', icon: 'carbon:server' },
    ];

    const getFilteredTech = (): TechItem[] => {
        if (activeCategory === 'all') {
            return Object.values(techStack).flat();
        }
        return techStack[activeCategory] || [];
    };

    // Update handleSidebarToggle to use the prop
    const handleSidebarToggle = () => {
        if (!isOpen) {
            setIsWaving(true);
            setTimeout(() => setIsWaving(false), 1500);
        } else {
            setIsWaving(true);
            setTimeout(() => setIsWaving(false), 1500);
        }
        setIsOpen(!isOpen);
    };

    return (
        <>
            <WavingHand isWaving={isWaving} onClick={handleSidebarToggle} isOpen={isOpen} />

            {/* Sidebar Panel */}
            <motion.aside
                initial={{ x: -400 }}
                animate={{ x: isOpen ? 0 : -400 }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    duration: 0.3
                }}
                className="fixed left-0 top-0 hidden lg:block w-[400px] h-[calc(100vh-64px)]
                         bg-gradient-to-b from-white/80 to-blue-50/80 backdrop-blur-md 
                         border-r border-blue-100/20 shadow-[1px_0_2px_rgba(0,0,0,0.02)]
                         z-40"
            >
                {/* Overlay when sidebar is open */}
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/5 backdrop-blur-sm z-30 lg:hidden"
                    />
                )}

                {/* Main Content Container with Scroll */}
                <div className="h-full overflow-y-auto 
                              [&::-webkit-scrollbar]:w-2
                              [&::-webkit-scrollbar-track]:bg-blue-50/50
                              [&::-webkit-scrollbar-thumb]:bg-blue-200/50
                              [&::-webkit-scrollbar-thumb]:rounded-full
                              [&::-webkit-scrollbar-thumb]:border-2
                              [&::-webkit-scrollbar-thumb]:border-transparent
                              hover:[&::-webkit-scrollbar-thumb]:bg-blue-300/50
                              pr-2">
                    <div className="flex flex-col pt-24 px-8 pb-6">
                        {/* Profile Section */}
                        <div className="relative">
                            {/* Profile Image */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="relative w-36 h-36 mx-auto mb-8"
                            >
                                {/* Enhanced glow effect */}
                                <div className="absolute -inset-0.5 rounded-full bg-gradient-to-tr from-blue-500/20 to-blue-600/20 blur-xl animate-pulse" />
                                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/10 to-blue-600/10" />

                                {/* Profile image */}
                                <img
                                    src="/images/profile.jpg"
                                    alt="Kris Verses"
                                    className="relative z-10 w-full h-full rounded-full object-cover 
                                             border-2 border-blue-100/80
                                             ring-2 ring-blue-200/50 ring-offset-4 ring-offset-white/80
                                             shadow-xl"
                                />
                            </motion.div>

                            {/* Name and Title */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="text-center mb-12"
                            >
                                <h2 className="text-2xl font-light tracking-wide text-gray-900 mb-2">
                                    Hello, I'm Kris
                                </h2>
                                <p className="text-sm font-medium tracking-widest text-blue-600/90 uppercase">
                                    Creative Developer
                                </p>
                            </motion.div>
                        </div>

                        {/* About Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="mb-12"
                        >
                            <div className="flex items-center mb-6">
                                <div className="w-8 h-8 rounded-lg bg-blue-50/80 border border-blue-100/80 flex items-center justify-center mr-3">
                                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-sm font-medium tracking-wider text-gray-900">ABOUT ME</h3>
                            </div>

                            <div className="bg-blue-50/30 backdrop-blur-sm rounded-xl border border-blue-100/20 p-6">
                                <p className="text-gray-800 font-light leading-relaxed mb-4">
                                    A creative developer passionate about crafting immersive digital experiences. I blend technical expertise with artistic vision to build engaging web applications.
                                </p>
                                <p className="text-gray-700 font-light leading-relaxed">
                                    With a focus on interactive design and modern web technologies, I create solutions that are both beautiful and functional.
                                </p>
                            </div>
                        </motion.div>

                        {/* Tech Stack Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="mb-8"
                        >
                            <div className="flex items-center mb-6">
                                <div className="w-8 h-8 rounded-lg bg-blue-50/80 border border-blue-100/80 flex items-center justify-center mr-3">
                                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-sm font-medium tracking-wider text-gray-900">TECH STACK</h3>
                            </div>

                            <div className="bg-blue-50/30 backdrop-blur-sm rounded-xl border border-blue-100/20 overflow-hidden">
                                {/* Category Filters */}
                                <div className="flex p-2 gap-1 bg-white/80 border-b border-blue-100/20">
                                    {categories.map((category) => (
                                        <button
                                            key={category.id}
                                            onClick={() => setActiveCategory(category.id)}
                                            className={`flex items-center px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                                                      ${activeCategory === category.id
                                                    ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-1'
                                                    : 'bg-white/80 text-gray-800 hover:bg-blue-50 hover:text-blue-700 focus:bg-blue-50 focus:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-1 shadow-sm'}`}
                                        >
                                            <Icon icon={category.icon} className="mr-1.5" width="14" height="14" />
                                            {category.label}
                                        </button>
                                    ))}
                                </div>

                                {/* Tech Grid */}
                                <div className="p-4">
                                    <div className="grid grid-cols-2 gap-2">
                                        {getFilteredTech().map((tech) => (
                                            <div
                                                key={tech.name}
                                                className="group relative flex items-center p-2 rounded-lg border transition-all duration-300
                                                         hover:scale-[1.02] hover:shadow-sm backdrop-blur-sm cursor-pointer"
                                                style={{
                                                    backgroundColor: tech.bgColor,
                                                    borderColor: `${tech.color}20`
                                                }}
                                            >
                                                {/* Icon */}
                                                <div className="mr-2.5 transition-transform duration-300 group-hover:scale-110">
                                                    <Icon icon={tech.icon} width="20" height="20" />
                                                </div>

                                                {/* Name */}
                                                <span className="text-sm font-medium" style={{ color: tech.color }}>
                                                    {tech.name}
                                                </span>

                                                {/* Hover Indicator */}
                                                <div className="absolute right-2 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full
                                                              transition-all duration-300 opacity-0 group-hover:opacity-100"
                                                    style={{ backgroundColor: tech.color }} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Behind the Scenes Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="mb-8"
                        >
                            <div className="flex items-center mb-6">
                                <div className="w-8 h-8 rounded-lg bg-blue-50/80 border border-blue-100/80 flex items-center justify-center mr-3">
                                    <Icon icon="mdi:lightbulb-on-outline" className="w-4 h-4 text-blue-500" />
                                </div>
                                <h3 className="text-sm font-medium tracking-wider text-gray-900">BEHIND THE SCENES</h3>
                            </div>

                            <div className="bg-blue-50/30 backdrop-blur-sm rounded-xl border border-blue-100/20 p-6">
                                <div
                                    className="flex items-center justify-between cursor-pointer"
                                    onClick={() => setIsBehindScenesExpanded(!isBehindScenesExpanded)}
                                >
                                    <span className="text-gray-700 font-medium">Development Process</span>
                                    <Icon
                                        icon={isBehindScenesExpanded ? "mdi:chevron-up" : "mdi:chevron-down"}
                                        className="w-5 h-5 text-gray-500 transition-transform duration-200"
                                    />
                                </div>

                                <motion.div
                                    initial={false}
                                    animate={{
                                        height: isBehindScenesExpanded ? "auto" : 0,
                                        opacity: isBehindScenesExpanded ? 1 : 0
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className="relative overflow-visible"
                                >
                                    <div className="mt-4 space-y-4">
                                        <p className="text-gray-700 font-light leading-relaxed">
                                            Built with Three.js, TensorFlow, and p5.js via prompting, with hands-on tweaks to learn the tech. Each component represents a blend of AI-assisted development and personal exploration.
                                        </p>
                                        <div className="relative z-[100] text-sm text-blue-500 hover:text-blue-600 transition-colors duration-200">
                                            <Tooltip
                                                content="This portfolio showcases my journey of learning through AI-assisted development, hands-on coding, and continuous exploration of new technologies."
                                                position="top"
                                            >
                                                <div className="inline-flex items-center space-x-2 py-1">
                                                    <Icon icon="mdi:information-outline" className="w-4 h-4" />
                                                    <span className="font-medium">Learn More</span>
                                                </div>
                                            </Tooltip>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.aside>
        </>
    );
};

export default ProfileSidebar;

/**
 * Further Learning Resources:
 * 
 * 1. React Performance:
 *    https://react.dev/learn/render-and-commit
 * 
 * 2. CSS Grid Guide:
 *    https://css-tricks.com/snippets/css/complete-guide-grid/
 * 
 * 3. Framer Motion:
 *    https://www.framer.com/motion/
 * 
 * Practice Projects:
 * 1. Create a filterable portfolio
 * 2. Build an animated skill tree
 * 3. Implement a tech radar chart
 */ 