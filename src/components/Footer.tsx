import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

/**
 * Footer Component
 * 
 * A clean, minimal footer with:
 * - Social media links
 * - Tagline
 * - Copyright information
 * - Smooth hover animations
 * - Responsive design
 */

const socialLinks = [
    {
        name: 'GitHub',
        url: 'https://github.com/knorful',
        icon: FaGithub
    },
    {
        name: 'LinkedIn',
        url: 'https://linkedin.com/in/kris-norful',
        icon: FaLinkedin
    },
    {
        name: 'Twitter',
        url: 'https://twitter.com/krisnorful',
        icon: FaTwitter
    }
];

const Footer = () => {
    return (
        <footer className="w-full bg-white py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center space-y-6">
                    {/* Tagline */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                        className="text-museum-text font-light tracking-[0.2em]"
                    >
                        KRIS VERSES
                        <span className="text-museum-text/60 tracking-normal pl-3 font-extralight">
                            | Creative Developer
                        </span>
                    </motion.p>

                    {/* Social Links */}
                    <div className="flex space-x-6">
                        {socialLinks.map((link) => (
                            <motion.a
                                key={link.name}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ y: -2 }}
                                className="text-museum-text hover:text-[#5D4037] transition-colors duration-300"
                                aria-label={link.name}
                            >
                                <link.icon className="w-6 h-6" />
                            </motion.a>
                        ))}
                    </div>

                    {/* Copyright */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
                        className="texttext-museum-text/70 text-sm font-light"
                    >
                        © {new Date().getFullYear()} Kris Verses. All rights reserved.
                    </motion.p>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 