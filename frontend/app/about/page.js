'use client';

import { motion } from 'framer-motion';
import {
    Brain,
    Target,
    Lightbulb,
    Users,
    Zap,
    Heart,
    Code,
    Database,
    Cloud,
    Sparkles,
    Mail,
    Github,
    Linkedin,
    Twitter
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AboutPage() {
    const mission = [
        {
            icon: Target,
            title: 'Our Mission',
            description: 'To democratize education through AI, making world-class learning accessible to everyone, everywhere.',
            color: 'from-indigo-500 to-purple-500'
        },
        {
            icon: Lightbulb,
            title: 'Our Vision',
            description: 'A world where every learner has a personal AI tutor, adapting to their unique needs and unlocking their full potential.',
            color: 'from-cyan-500 to-blue-500'
        },
        {
            icon: Heart,
            title: 'Our Values',
            description: 'Excellence, accessibility, innovation, and learner empowerment drive everything we do.',
            color: 'from-pink-500 to-red-500'
        }
    ];

    const techStack = [
        {
            category: 'AI Models',
            icon: Brain,
            color: 'from-purple-500 to-pink-500',
            technologies: [
                { name: 'GPT-4', description: 'Advanced language understanding' },
                { name: 'DeepSeek', description: 'Fast inference optimization' },
                { name: 'Claude', description: 'Long-context processing' },
                { name: 'LLaMA', description: 'Open-source flexibility' }
            ]
        },
        {
            category: 'Frontend',
            icon: Code,
            color: 'from-blue-500 to-cyan-500',
            technologies: [
                { name: 'Next.js 14', description: 'React framework' },
                { name: 'TailwindCSS', description: 'Utility-first styling' },
                { name: 'Framer Motion', description: 'Smooth animations' },
                { name: 'Lucide Icons', description: 'Beautiful iconography' }
            ]
        },
        {
            category: 'Backend',
            icon: Database,
            color: 'from-green-500 to-emerald-500',
            technologies: [
                { name: 'FastAPI', description: 'Python web framework' },
                { name: 'PostgreSQL', description: 'Relational database' },
                { name: 'Redis', description: 'Caching layer' },
                { name: 'Celery', description: 'Task queue' }
            ]
        },
        {
            category: 'Infrastructure',
            icon: Cloud,
            color: 'from-orange-500 to-red-500',
            technologies: [
                { name: 'AWS', description: 'Cloud hosting' },
                { name: 'Docker', description: 'Containerization' },
                { name: 'Kubernetes', description: 'Orchestration' },
                { name: 'GitHub Actions', description: 'CI/CD pipeline' }
            ]
        }
    ];

    const team = [
        {
            name: 'Sarah Chen',
            role: 'Founder & CEO',
            avatar: '👩‍💼',
            bio: 'Former Google AI researcher passionate about education',
            social: { github: '#', linkedin: '#', twitter: '#' }
        },
        {
            name: 'Marcus Rodriguez',
            role: 'CTO',
            avatar: '👨‍💻',
            bio: 'Full-stack engineer with 10+ years in EdTech',
            social: { github: '#', linkedin: '#', twitter: '#' }
        },
        {
            name: 'Priya Sharma',
            role: 'Head of AI',
            avatar: '👩‍🔬',
            bio: 'PhD in Machine Learning from Stanford',
            social: { github: '#', linkedin: '#', twitter: '#' }
        },
        {
            name: 'Alex Kim',
            role: 'Product Designer',
            avatar: '👨‍🎨',
            bio: 'Award-winning designer focused on user experience',
            social: { github: '#', linkedin: '#', twitter: '#' }
        }
    ];

    const stats = [
        { value: '50K+', label: 'Active Learners' },
        { value: '2M+', label: 'Questions Answered' },
        { value: '150+', label: 'Countries Served' },
        { value: '98%', label: 'Satisfaction Rate' }
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 to-transparent dark:from-indigo-950/20 pointer-events-none" />

                <div className="relative max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-strong mb-6">
                            <Sparkles className="w-4 h-4 text-indigo-500" />
                            <span className="text-sm font-medium">About MindMentor</span>
                        </div>

                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
                            <span className="block text-gray-900 dark:text-white">Empowering</span>
                            <span className="block gradient-text-electric">Global Learning</span>
                        </h1>

                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
                            We're on a mission to make personalized, AI-powered education accessible to learners
                            around the world, transforming how people learn and grow.
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="text-center"
                                >
                                    <div className="text-4xl font-bold gradient-text-electric mb-2">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        {stat.label}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900/50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8">
                        {mission.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className="p-8 rounded-2xl glass-strong hover:shadow-xl transition-all"
                            >
                                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} mb-5`}>
                                    <item.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {item.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tech Stack Section */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text-electric">
                            Powered by Modern Tech
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            We use cutting-edge technologies to deliver the best learning experience.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {techStack.map((stack, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="p-8 rounded-2xl glass-strong"
                            >
                                <div className="flex items-center space-x-4 mb-6">
                                    <div className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${stack.color}`}>
                                        <stack.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {stack.category}
                                    </h3>
                                </div>
                                <div className="space-y-4">
                                    {stack.technologies.map((tech, techIndex) => (
                                        <div key={techIndex} className="flex items-start space-x-3">
                                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-600 mt-2" />
                                            <div>
                                                <div className="font-semibold text-gray-900 dark:text-white">
                                                    {tech.name}
                                                </div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                                    {tech.description}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900/50">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text-electric">
                            Meet Our Team
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Passionate experts dedicated to revolutionizing education through AI.
                        </p>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="text-center p-6 rounded-2xl glass-strong hover:shadow-xl transition-all"
                            >
                                <div className="text-6xl mb-4">{member.avatar}</div>
                                <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">
                                    {member.name}
                                </h3>
                                <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium mb-3">
                                    {member.role}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                    {member.bio}
                                </p>
                                <div className="flex items-center justify-center space-x-3">
                                    <a href={member.social.github} className="p-2 rounded-lg glass hover:glass-strong transition-all">
                                        <Github className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                    </a>
                                    <a href={member.social.linkedin} className="p-2 rounded-lg glass hover:glass-strong transition-all">
                                        <Linkedin className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                    </a>
                                    <a href={member.social.twitter} className="p-2 rounded-lg glass hover:glass-strong transition-all">
                                        <Twitter className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative p-12 rounded-3xl overflow-hidden text-center"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-cyan-600 animate-gradient" />
                        <div className="absolute inset-0 bg-black/10" />

                        <div className="relative text-white">
                            <h2 className="text-4xl font-bold mb-4">Join Our Mission</h2>
                            <p className="text-xl opacity-90 mb-8">
                                Help us build the future of education. We're always looking for talented individuals.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link href="/auth">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-8 py-4 rounded-xl bg-white text-indigo-600 font-semibold shadow-2xl flex items-center space-x-2"
                                    >
                                        <Sparkles className="w-5 h-5" />
                                        <span>Get Started</span>
                                    </motion.button>
                                </Link>
                                <a href="mailto:careers@mindmentor.ai">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-8 py-4 rounded-xl bg-white/10 backdrop-blur-xl border-2 border-white/30 text-white font-semibold hover:bg-white/20 transition-all flex items-center space-x-2"
                                    >
                                        <Mail className="w-5 h-5" />
                                        <span>Contact Us</span>
                                    </motion.button>
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
