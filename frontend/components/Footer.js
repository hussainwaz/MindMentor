'use client';

import Link from 'next/link';
import { Brain, Twitter, Github, Linkedin, Mail, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        Product: [
            { name: 'Features', href: '/#features' },
            { name: 'AI Tutor', href: '/tutor' },
            { name: 'Dashboard', href: '/dashboard' },
            { name: 'Pricing', href: '/#pricing' },
        ],
        Company: [
            { name: 'About', href: '/about' },
            { name: 'Blog', href: '/blog' },
            { name: 'Careers', href: '/careers' },
            { name: 'Contact', href: '/contact' },
        ],
        Resources: [
            { name: 'Documentation', href: '/docs' },
            { name: 'Help Center', href: '/help' },
            { name: 'Community', href: '/community' },
            { name: 'Status', href: '/status' },
        ],
        Legal: [
            { name: 'Privacy', href: '/privacy' },
            { name: 'Terms', href: '/terms' },
            { name: 'Security', href: '/security' },
            { name: 'Cookies', href: '/cookies' },
        ],
    };

    const socialLinks = [
        { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
        { icon: Github, href: 'https://github.com', label: 'GitHub' },
        { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
        { icon: Mail, href: 'mailto:hello@mindmentor.ai', label: 'Email' },
    ];

    return (
        <footer className="relative mt-20 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/5 to-cyan-500/5 pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                {/* Top Section */}
                <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
                    {/* Brand */}
                    <div className="col-span-2">
                        <Link href="/" className="flex items-center space-x-2 group mb-4">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-lg blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                                <div className="relative bg-gradient-to-r from-indigo-600 to-cyan-600 p-2 rounded-lg">
                                    <Brain className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <span className="text-xl font-bold gradient-text-electric">
                                MindMentor
                            </span>
                        </Link>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-xs">
                            Empowering learners worldwide with AI-driven personalized education.
                            Master any topic with intelligent, adaptive tutoring.
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center space-x-3">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="p-2 rounded-lg glass hover:glass-strong transition-all"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Links Sections */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-4">
                                {category}
                            </h3>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Newsletter Section */}
                <div className="mb-12 p-6 sm:p-8 rounded-2xl glass-strong">
                    <div className="max-w-2xl mx-auto text-center">
                        <h3 className="text-xl sm:text-2xl font-bold mb-2 gradient-text-electric">
                            Stay Updated
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                            Get the latest AI learning tips, feature updates, and exclusive content.
                        </p>
                        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-3 rounded-lg glass-strong border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all text-sm"
                            />
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                className="px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-medium shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all text-sm"
                            >
                                Subscribe
                            </motion.button>
                        </form>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400 text-center sm:text-left">
                            © {currentYear} MindMentor. All rights reserved.
                        </p>
                        <p className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            Made with <Heart className="w-4 h-4 mx-1 text-red-500 fill-current" /> by the MindMentor Team
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
