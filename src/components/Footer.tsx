/**
 * Footer Component
 * 
 * A modern, responsive footer with social links, contact information,
 * and dynamic content sections. Demonstrates clean component structure
 * and accessibility best practices.
 * 
 * Key Concepts:
 * 1. Semantic HTML
 * 2. Responsive Layout
 * 3. Accessibility
 * 4. Social Integration
 * 5. Dynamic Content
 * 
 * Learning Exercises:
 * 
 * Exercise 1 - Semantic Structure:
 * - Identify semantic HTML elements
 * - Understand ARIA roles
 * - Study heading hierarchy
 * 
 * Exercise 2 - Responsive Design:
 * - Analyze breakpoint implementation
 * - Study flexible layouts
 * - Understand content reflow
 * 
 * Exercise 3 - Link Management:
 * - How are social links handled?
 * - What security measures are in place?
 * - Study external link behavior
 * 
 * Exercise 4 - Animation:
 * - Identify hover effects
 * - Study transition timing
 * - Analyze animation performance
 */

import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

/**
 * Social Links Configuration
 * 
 * Centralized social media data for easy updates.
 * Consider expanding with additional platforms or custom icons.
 */
const socialLinks = [
    {
        name: 'GitHub',
        url: 'https://github.com/knorful',
        icon: FaGithub,
        ariaLabel: 'Visit my GitHub profile'
    },
    {
        name: 'LinkedIn',
        url: 'https://linkedin.com/in/kris-verses',
        icon: FaLinkedin,
        ariaLabel: 'Connect with me on LinkedIn'
    },
    {
        name: 'Twitter',
        url: 'https://twitter.com/krisnorful',
        icon: FaTwitter,
        ariaLabel: 'Follow me on Twitter'
    }
];

/**
 * Main Component Implementation
 * 
 * The component manages:
 * 1. Social link rendering
 * 2. Copyright information
 * 3. Contact details
 * 4. Responsive layout
 * 
 * Learning Challenge:
 * - Add a newsletter signup
 * - Implement a contact form
 * - Create animated social icons
 */
const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <img
                            src="./images/KV-logo-transparent.png"
                            alt="KrisVerses"
                            className="h-8 w-auto"
                        />
                        <p className="text-sm text-gray-500 leading-relaxed">
                            Crafting innovative digital experiences through creative development
                            and cutting-edge technology.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-gray-900">Quick Links</h3>
                        <ul className="space-y-2">
                            {['Projects', 'About', 'Contact'].map((link) => (
                                <li key={link}>
                                    <a
                                        href={`/${link.toLowerCase()}`}
                                        className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                                    >
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-gray-900">Connect</h3>
                        <div className="flex space-x-4">
                            {socialLinks.map((link) => (
                                <motion.a
                                    key={link.name}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={link.ariaLabel}
                                    className="text-gray-400 hover:text-gray-900 transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <span className="sr-only">{link.name}</span>
                                    <link.icon className="w-6 h-6" />
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-12 pt-8 border-t border-gray-100">
                    <p className="text-sm text-gray-400 text-center">
                        © {new Date().getFullYear()} KrisVerses. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

/**
 * Further Learning Resources:
 * 
 * 1. Semantic HTML:
 *    https://developer.mozilla.org/en-US/docs/Web/HTML/Element
 * 
 * 2. Accessibility Guidelines:
 *    https://www.w3.org/WAI/ARIA/apg/
 * 
 * 3. CSS Grid Layout:
 *    https://web.dev/learn/css/grid/
 * 
 * Practice Projects:
 * 1. Create a multi-column footer
 * 2. Build an animated social bar
 * 3. Implement a dark mode toggle
 */ 