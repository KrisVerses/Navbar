import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useState } from 'react';
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
const ProfileSidebar = () => {
    const [activeCategory, setActiveCategory] = useState<CategoryId>('all');

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

    return (
        <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
            className="fixed left-0 top-0 h-screen w-[400px] hidden lg:block
                       bg-white/60 backdrop-blur-md border-r border-blue-100/20"
        >
            {/* Main Content Container with Scroll */}
            <div className="h-full overflow-y-auto 
                          [&::-webkit-scrollbar]:w-2
                          [&::-webkit-scrollbar-track]:bg-blue-50/50
                          [&::-webkit-scrollbar-thumb]:bg-blue-200/50
                          [&::-webkit-scrollbar-thumb]:rounded-full
                          [&::-webkit-scrollbar-thumb]:border-2
                          [&::-webkit-scrollbar-thumb]:border-white
                          hover:[&::-webkit-scrollbar-thumb]:bg-blue-300/50
                          pr-2">
                <div className="flex flex-col pt-24 px-8 pb-12">
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
                            <div className="flex p-2 gap-1 bg-white/40 border-b border-blue-100/20">
                                {categories.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() => setActiveCategory(category.id)}
                                        className={`flex items-center px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                                                  ${activeCategory === category.id
                                                ? 'bg-blue-500 text-white shadow-sm'
                                                : 'text-gray-600 hover:bg-blue-50'}`}
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
                </div>
            </div>
        </motion.aside>
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