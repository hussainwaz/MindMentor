'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Brain,
    TrendingUp,
    Target,
    Award,
    Calendar,
    BookOpen,
    Clock,
    Star,
    ChevronRight,
    Flame,
    Zap,
    Trophy,
    BarChart3,
    Heart,
    Edit
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function DashboardPage() {
    const [selectedPeriod, setSelectedPeriod] = useState('week');

    const stats = [
        {
            icon: Flame,
            label: 'Day Streak',
            value: '12',
            change: '+2 from last week',
            color: 'from-orange-500 to-red-500'
        },
        {
            icon: Clock,
            label: 'Study Time',
            value: '24h',
            change: '+5h from last week',
            color: 'from-blue-500 to-cyan-500'
        },
        {
            icon: BookOpen,
            label: 'Topics Learned',
            value: '18',
            change: '+4 this week',
            color: 'from-purple-500 to-pink-500'
        },
        {
            icon: Target,
            label: 'Accuracy',
            value: '94%',
            change: '+3% improvement',
            color: 'from-green-500 to-emerald-500'
        }
    ];

    const recentTopics = [
        {
            icon: '🔬',
            title: 'Quantum Mechanics',
            category: 'Physics',
            progress: 75,
            sessions: 8,
            lastStudied: '2 hours ago'
        },
        {
            icon: '💻',
            title: 'React Hooks',
            category: 'Programming',
            progress: 60,
            sessions: 5,
            lastStudied: '1 day ago'
        },
        {
            icon: '📊',
            title: 'Statistics',
            category: 'Mathematics',
            progress: 45,
            sessions: 6,
            lastStudied: '2 days ago'
        },
        {
            icon: '🌍',
            title: 'World War II',
            category: 'History',
            progress: 30,
            sessions: 3,
            lastStudied: '3 days ago'
        }
    ];

    const achievements = [
        {
            icon: Trophy,
            title: 'Fast Learner',
            description: 'Complete 5 topics in a week',
            earned: true,
            rarity: 'gold'
        },
        {
            icon: Flame,
            title: '7-Day Streak',
            description: 'Study for 7 consecutive days',
            earned: true,
            rarity: 'silver'
        },
        {
            icon: Brain,
            title: 'Knowledge Seeker',
            description: 'Ask 100 questions',
            earned: true,
            rarity: 'bronze'
        },
        {
            icon: Star,
            title: 'Perfect Score',
            description: 'Get 100% in a quiz',
            earned: false,
            rarity: 'platinum'
        },
        {
            icon: Zap,
            title: 'Speed Runner',
            description: 'Complete a topic in under 2 hours',
            earned: false,
            rarity: 'gold'
        },
        {
            icon: Heart,
            title: 'Dedicated',
            description: 'Study for 100 hours total',
            earned: false,
            rarity: 'platinum'
        }
    ];

    const weeklyActivity = [
        { day: 'Mon', hours: 3.5 },
        { day: 'Tue', hours: 2.8 },
        { day: 'Wed', hours: 4.2 },
        { day: 'Thu', hours: 3.0 },
        { day: 'Fri', hours: 5.1 },
        { day: 'Sat', hours: 2.5 },
        { day: 'Sun', hours: 3.2 }
    ];

    const maxHours = Math.max(...weeklyActivity.map(d => d.hours));

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950">
            <Navbar />

            <div className="pt-24 pb-20 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-4xl font-bold mb-2 gradient-text-electric">
                                    Welcome back, Alex! 👋
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400">
                                    You're making great progress. Keep up the momentum!
                                </p>
                            </div>
                            <Link href="/tutor">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-semibold shadow-lg shadow-indigo-500/30 flex items-center space-x-2"
                                >
                                    <Brain className="w-5 h-5" />
                                    <span>Start Learning</span>
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Stats Grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="p-6 rounded-2xl glass-strong hover:shadow-xl transition-all"
                            >
                                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} mb-4`}>
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    {stat.label}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                    {stat.change}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left Column - Topics & Activity */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Recent Topics */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="glass-strong rounded-2xl p-6"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                        Continue Learning
                                    </h2>
                                    <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
                                        View All
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {recentTopics.map((topic, index) => (
                                        <div
                                            key={index}
                                            className="p-4 rounded-xl glass hover:glass-strong transition-all cursor-pointer group"
                                        >
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex items-start space-x-3">
                                                    <div className="text-3xl">{topic.icon}</div>
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                                                            {topic.title}
                                                        </h3>
                                                        <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
                                                            <span>{topic.category}</span>
                                                            <span>•</span>
                                                            <span>{topic.sessions} sessions</span>
                                                            <span>•</span>
                                                            <span>{topic.lastStudied}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between text-xs">
                                                    <span className="text-gray-600 dark:text-gray-400">Progress</span>
                                                    <span className="font-semibold text-gray-900 dark:text-white">{topic.progress}%</span>
                                                </div>
                                                <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${topic.progress}%` }}
                                                        transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                                                        className="h-full bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-full"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Weekly Activity Chart */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="glass-strong rounded-2xl p-6"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                        Weekly Activity
                                    </h2>
                                    <div className="flex items-center space-x-2">
                                        {['week', 'month', 'year'].map((period) => (
                                            <button
                                                key={period}
                                                onClick={() => setSelectedPeriod(period)}
                                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${selectedPeriod === period
                                                        ? 'bg-indigo-600 text-white'
                                                        : 'glass hover:glass-strong text-gray-600 dark:text-gray-400'
                                                    }`}
                                            >
                                                {period.charAt(0).toUpperCase() + period.slice(1)}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-end justify-between h-48 gap-3">
                                    {weeklyActivity.map((day, index) => (
                                        <div key={index} className="flex-1 flex flex-col items-center">
                                            <motion.div
                                                initial={{ height: 0 }}
                                                animate={{ height: `${(day.hours / maxHours) * 100}%` }}
                                                transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                                                className="w-full bg-gradient-to-t from-indigo-600 to-cyan-600 rounded-t-lg relative group cursor-pointer"
                                            >
                                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                                                    {day.hours}h
                                                </div>
                                            </motion.div>
                                            <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                                {day.day}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Column - Achievements */}
                        <div className="space-y-8">
                            {/* Profile Card */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                                className="glass-strong rounded-2xl p-6 text-center"
                            >
                                <div className="relative inline-block mb-4">
                                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-3xl font-bold text-white">
                                        AC
                                    </div>
                                    <button className="absolute bottom-0 right-0 p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg border-2 border-gray-200 dark:border-gray-700">
                                        <Edit className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                                    </button>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                                    Alex Chen
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                    alex.chen@email.com
                                </p>
                                <div className="flex items-center justify-center space-x-6 text-center">
                                    <div>
                                        <div className="text-2xl font-bold gradient-text-electric">18</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">Topics</div>
                                    </div>
                                    <div className="w-px h-10 bg-gray-200 dark:bg-gray-800" />
                                    <div>
                                        <div className="text-2xl font-bold gradient-text-electric">94%</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">Accuracy</div>
                                    </div>
                                    <div className="w-px h-10 bg-gray-200 dark:bg-gray-800" />
                                    <div>
                                        <div className="text-2xl font-bold gradient-text-electric">12</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">Streak</div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Achievements */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 }}
                                className="glass-strong rounded-2xl p-6"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                        Achievements
                                    </h2>
                                    <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <div className="grid grid-cols-3 gap-3">
                                    {achievements.map((achievement, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.8 + index * 0.1 }}
                                            className={`aspect-square rounded-xl flex items-center justify-center relative group cursor-pointer transition-all ${achievement.earned
                                                    ? achievement.rarity === 'platinum'
                                                        ? 'bg-gradient-to-br from-slate-400 to-slate-600'
                                                        : achievement.rarity === 'gold'
                                                            ? 'bg-gradient-to-br from-yellow-400 to-yellow-600'
                                                            : achievement.rarity === 'silver'
                                                                ? 'bg-gradient-to-br from-gray-300 to-gray-500'
                                                                : 'bg-gradient-to-br from-orange-400 to-orange-600'
                                                    : 'glass opacity-30 grayscale'
                                                }`}
                                        >
                                            <achievement.icon className="w-6 h-6 text-white" />
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 rounded-xl p-2">
                                                <div className="text-center">
                                                    <p className="text-xs font-semibold text-white mb-1">
                                                        {achievement.title}
                                                    </p>
                                                    <p className="text-[10px] text-gray-300">
                                                        {achievement.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                                <div className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
                                    {achievements.filter(a => a.earned).length} of {achievements.length} unlocked
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
