'use client';

import { motion } from 'framer-motion';
import {
  Sparkles,
  Brain,
  Zap,
  Target,
  BarChart3,
  MessageSquare,
  Star,
  Award,
  Users,
  TrendingUp,
  ChevronRight,
  CheckCircle2,
  Quote
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const features = [
    {
      icon: Brain,
      title: 'Personalized Learning',
      description: 'AI adapts to your unique learning style, pace, and goals for maximum effectiveness.',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Zap,
      title: 'Instant Explanations',
      description: 'Get clear, detailed answers to any question in seconds. No waiting, no confusion.',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      icon: Target,
      title: 'Adaptive Difficulty',
      description: 'Automatically adjusts complexity based on your progress and comprehension level.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: BarChart3,
      title: 'Progress Tracking',
      description: 'Visual insights into your learning journey with detailed analytics and milestones.',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: MessageSquare,
      title: 'Natural Conversations',
      description: 'Chat naturally with AI that understands context, nuance, and your learning needs.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Award,
      title: 'Gamified Experience',
      description: 'Earn badges, track streaks, and celebrate achievements as you master new topics.',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const stats = [
    { icon: Users, value: '50K+', label: 'Active Learners' },
    { icon: MessageSquare, value: '2M+', label: 'Questions Answered' },
    { icon: Star, value: '4.9/5', label: 'User Rating' },
    { icon: TrendingUp, value: '95%', label: 'Success Rate' }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Computer Science Student',
      avatar: '👩‍💻',
      content: 'MindMentor helped me ace my algorithms course. The AI explains complex concepts in ways that finally make sense!',
      rating: 5
    },
    {
      name: 'Marcus Johnson',
      role: 'Medical Student',
      avatar: '👨‍⚕️',
      content: 'Studying anatomy became so much easier. The adaptive learning really understands where I need more practice.',
      rating: 5
    },
    {
      name: 'Priya Patel',
      role: 'High School Senior',
      avatar: '👩‍🎓',
      content: 'I improved my math grades from C to A in just 3 months. This AI tutor is like having a personal teacher 24/7.',
      rating: 5
    }
  ];

  const aiModels = [
    { name: 'GPT-4', badge: 'Premium' },
    { name: 'DeepSeek', badge: 'Fast' },
    { name: 'Claude', badge: 'Detailed' },
    { name: 'LLaMA', badge: 'Open' }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-32 px-4 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '4s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="flex justify-center mb-6">
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-strong">
                <Sparkles className="w-4 h-4 text-indigo-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  AI-Powered Learning Platform
                </span>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
            >
              <span className="block text-gray-900 dark:text-white">
                Master Any Topic
              </span>
              <span className="block gradient-text-electric">
                With Your AI Tutor
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed"
            >
              Experience personalized, intelligent tutoring powered by advanced AI.
              Learn faster, understand deeper, and achieve your goals with MindMentor.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            >
              <Link href="/tutor">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-semibold shadow-2xl shadow-indigo-500/50 hover:shadow-indigo-500/70 transition-all flex items-center justify-center space-x-2"
                >
                  <Brain className="w-5 h-5" />
                  <span>Start Learning Free</span>
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link href="/about">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl glass-strong font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                >
                  Learn More
                </motion.button>
              </Link>
            </motion.div>

            {/* AI Models Badge */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-3">
              <span className="text-sm text-gray-600 dark:text-gray-400">Powered by:</span>
              {aiModels.map((model, index) => (
                <div
                  key={index}
                  className="px-3 py-1.5 rounded-lg glass text-sm font-medium flex items-center space-x-2"
                >
                  <span className="text-gray-700 dark:text-gray-300">{model.name}</span>
                  <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs">
                    {model.badge}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-16 relative"
          >
            <div className="relative max-w-5xl mx-auto">
              {/* Glowing background */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/30 to-cyan-500/30 rounded-3xl blur-3xl" />

              {/* Main card */}
              <div className="relative glass-strong p-4 sm:p-8 rounded-3xl border-2 border-indigo-500/20">
                <div className="aspect-video rounded-2xl bg-gradient-to-br from-indigo-900 via-purple-900 to-cyan-900 flex items-center justify-center overflow-hidden">
                  <div className="text-center p-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-xl mb-4 animate-float">
                      <Brain className="w-10 h-10 text-white" />
                    </div>
                    <p className="text-white text-lg sm:text-xl font-medium opacity-90">
                      Interactive AI Tutor Interface
                    </p>
                    <p className="text-white/70 text-sm mt-2">
                      Ask anything. Learn everything.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 border-y border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 mb-3">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold gradient-text-electric mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 sm:py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text-electric">
              Powerful Features
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Everything you need for an exceptional learning experience, powered by cutting-edge AI technology.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group p-8 rounded-2xl glass-strong hover:shadow-2xl transition-all duration-300 cursor-pointer"
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 sm:py-32 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text-electric">
              Loved by Students
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Join thousands of learners achieving their educational goals with MindMentor.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl glass-strong hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-indigo-500 opacity-50 mb-4" />
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{testimonial.avatar}</div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative p-12 sm:p-16 rounded-3xl overflow-hidden"
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-cyan-600 animate-gradient" />
            <div className="absolute inset-0 bg-black/10" />

            {/* Content */}
            <div className="relative text-center text-white">
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                Ready to Transform Your Learning?
              </h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Join MindMentor today and experience the future of personalized education.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/auth">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 rounded-xl bg-white text-indigo-600 font-semibold shadow-2xl hover:shadow-white/50 transition-all flex items-center space-x-2"
                  >
                    <Sparkles className="w-5 h-5" />
                    <span>Get Started Free</span>
                  </motion.button>
                </Link>
                <Link href="/tutor">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 rounded-xl bg-white/10 backdrop-blur-xl border-2 border-white/30 text-white font-semibold hover:bg-white/20 transition-all"
                  >
                    Try Demo
                  </motion.button>
                </Link>
              </div>
              <div className="mt-8 flex items-center justify-center space-x-6 text-sm opacity-90">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Free forever plan</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
