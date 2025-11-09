'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Mail, Lock, Eye, EyeOff, Sparkles, Chrome, Github, Apple } from 'lucide-react';
import Link from 'next/link';

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle auth logic here
        console.log('Form submitted:', formData);
    };

    const socialProviders = [
        { name: 'Google', icon: Chrome, color: 'from-red-500 to-yellow-500' },
        { name: 'GitHub', icon: Github, color: 'from-gray-700 to-gray-900' },
        { name: 'Apple', icon: Apple, color: 'from-gray-800 to-black' }
    ];

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse-glow" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />

            {/* Back to Home */}
            <Link href="/" className="absolute top-8 left-8 z-10">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-2 glass-strong px-4 py-2 rounded-lg"
                >
                    <div className="bg-gradient-to-r from-indigo-600 to-cyan-600 p-1.5 rounded-lg">
                        <Brain className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-bold gradient-text-electric text-sm">MindMentor</span>
                </motion.div>
            </Link>

            {/* Auth Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative w-full max-w-md z-10"
            >
                <div className="glass-strong rounded-3xl p-8 sm:p-10 shadow-2xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 200 }}
                            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-cyan-600 mb-4"
                        >
                            <Brain className="w-8 h-8 text-white" />
                        </motion.div>
                        <h1 className="text-3xl font-bold mb-2 gradient-text-electric">
                            {isLogin ? 'Welcome Back' : 'Get Started'}
                        </h1>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {isLogin
                                ? 'Continue your learning journey'
                                : 'Start your AI-powered learning adventure'}
                        </p>
                    </div>

                    {/* Social Login */}
                    <div className="space-y-3 mb-6">
                        {socialProviders.map((provider) => (
                            <motion.button
                                key={provider.name}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full px-4 py-3 rounded-xl glass hover:glass-strong transition-all flex items-center justify-center space-x-3 group"
                            >
                                <div className={`p-2 rounded-lg bg-gradient-to-br ${provider.color}`}>
                                    <provider.icon className="w-4 h-4 text-white" />
                                </div>
                                <span className="font-medium text-sm">Continue with {provider.name}</span>
                            </motion.button>
                        ))}
                    </div>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300 dark:border-gray-700" />
                        </div>
                        <div className="relative flex justify-center text-xs">
                            <span className="px-4 glass-strong rounded-full text-gray-500 dark:text-gray-400">
                                Or continue with email
                            </span>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Alex Chen"
                                        className="w-full px-4 py-3 rounded-xl glass-strong focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                        required={!isLogin}
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="you@example.com"
                                    className="w-full pl-12 pr-4 py-3 rounded-xl glass-strong focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-12 py-3 rounded-xl glass-strong focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {isLogin && (
                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <span className="text-gray-600 dark:text-gray-400">Remember me</span>
                                </label>
                                <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                                    Forgot password?
                                </a>
                            </div>
                        )}

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all flex items-center justify-center space-x-2"
                        >
                            <Sparkles className="w-5 h-5" />
                            <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                        </motion.button>
                    </form>

                    {/* Toggle Auth Mode */}
                    <div className="mt-6 text-center text-sm">
                        <span className="text-gray-600 dark:text-gray-400">
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                        </span>
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                        >
                            {isLogin ? 'Sign Up' : 'Sign In'}
                        </button>
                    </div>

                    {/* Terms */}
                    {!isLogin && (
                        <p className="mt-6 text-xs text-center text-gray-500 dark:text-gray-400">
                            By creating an account, you agree to our{' '}
                            <a href="/terms" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                                Terms of Service
                            </a>{' '}
                            and{' '}
                            <a href="/privacy" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                                Privacy Policy
                            </a>
                        </p>
                    )}
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-full blur-2xl opacity-20 animate-pulse-glow" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-2xl opacity-20 animate-pulse-glow" style={{ animationDelay: '1s' }} />
            </motion.div>
        </div>
    );
}
