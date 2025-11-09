'use client';

import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';

export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
            >
                {/* Animated Logo */}
                <div className="relative inline-block mb-8">
                    {/* Rotating glow */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                        className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-cyan-500 to-purple-500 rounded-2xl blur-xl opacity-50"
                    />

                    {/* Logo */}
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut'
                        }}
                        className="relative bg-gradient-to-br from-indigo-600 to-cyan-600 p-6 rounded-2xl shadow-2xl"
                    >
                        <Brain className="w-12 h-12 text-white" />
                    </motion.div>
                </div>

                {/* Brand Name */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl font-bold mb-4 gradient-text-electric"
                >
                    MindMentor
                </motion.h1>

                {/* Loading dots */}
                <div className="flex items-center justify-center space-x-2">
                    {[0, 1, 2].map((index) => (
                        <motion.div
                            key={index}
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.3, 1, 0.3]
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: index * 0.2
                            }}
                            className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-600"
                        />
                    ))}
                </div>

                {/* Loading text */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-4 text-sm text-gray-600 dark:text-gray-400"
                >
                    Preparing your learning experience...
                </motion.p>
            </motion.div>
        </div>
    );
}
