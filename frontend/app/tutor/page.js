'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
    Send,
    Mic,
    Sparkles,
    Brain,
    History,
    Settings,
    Bookmark,
    MoreVertical,
    ChevronLeft,
    Copy,
    ThumbsUp,
    ThumbsDown,
    RefreshCw,
    User,
    Bot,
    Menu,
    X,
    AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import { sendChatMessage, checkAPIHealth } from '@/lib/api';

// MessageBubble component moved outside to prevent re-creation on every render
const MessageBubble = ({ message }) => {
    const isAI = message.type === 'ai';

    return (
        <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-4 ${isAI ? '' : 'flex-row-reverse'}`}
        >
            {/* Avatar */}
            <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${isAI
                ? 'bg-gradient-to-br from-indigo-500 to-cyan-500'
                : 'bg-gradient-to-br from-purple-500 to-pink-500'
                }`}>
                {isAI ? <Bot className="w-5 h-5 text-white" /> : <User className="w-5 h-5 text-white" />}
            </div>

            {/* Message Content */}
            <div className={`flex-1 max-w-3xl ${isAI ? '' : 'flex flex-col items-end'}`}>
                <div className={`px-4 py-3 rounded-2xl ${isAI
                    ? 'glass-strong'
                    : 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white'
                    }`}>
                    {isAI ? (
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    h1: ({ node, ...props }) => <h1 className="text-xl font-bold text-gray-900 dark:text-white mt-4 mb-2" {...props} />,
                                    h2: ({ node, ...props }) => <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mt-3 mb-2" {...props} />,
                                    h3: ({ node, ...props }) => <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 mt-2 mb-1" {...props} />,
                                    h4: ({ node, ...props }) => <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mt-2 mb-1" {...props} />,
                                    p: ({ node, ...props }) => <p className="text-sm leading-relaxed text-gray-800 dark:text-gray-200 mb-2" {...props} />,
                                    ul: ({ node, ...props }) => <ul className="list-disc list-inside text-sm text-gray-800 dark:text-gray-200 mb-2 ml-2" {...props} />,
                                    ol: ({ node, ...props }) => <ol className="list-decimal list-inside text-sm text-gray-800 dark:text-gray-200 mb-2 ml-2" {...props} />,
                                    li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                                    strong: ({ node, ...props }) => <strong className="font-semibold text-indigo-600 dark:text-indigo-400" {...props} />,
                                    em: ({ node, ...props }) => <em className="italic text-gray-700 dark:text-gray-300" {...props} />,
                                    code: ({ node, inline, ...props }) =>
                                        inline ? (
                                            <code className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-1.5 py-0.5 rounded text-xs font-mono" {...props} />
                                        ) : (
                                            <code className="block bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-3 rounded-lg text-xs font-mono overflow-x-auto mb-2" {...props} />
                                        ),
                                    blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-indigo-500 pl-3 italic text-gray-700 dark:text-gray-300 my-2" {...props} />,
                                    a: ({ node, ...props }) => <a className="text-indigo-600 dark:text-indigo-400 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
                                    hr: ({ node, ...props }) => <hr className="border-gray-300 dark:border-gray-700 my-3" {...props} />,
                                    table: ({ node, ...props }) => <table className="min-w-full border-collapse text-sm mb-2" {...props} />,
                                    th: ({ node, ...props }) => <th className="border border-gray-300 dark:border-gray-700 px-2 py-1 bg-gray-100 dark:bg-gray-800 font-semibold" {...props} />,
                                    td: ({ node, ...props }) => <td className="border border-gray-300 dark:border-gray-700 px-2 py-1" {...props} />
                                }}
                            >
                                {message.content}
                            </ReactMarkdown>
                        </div>
                    ) : (
                        <p className="text-sm leading-relaxed text-white">
                            {message.content}
                        </p>
                    )}
                </div>

                {/* Message Actions (only for AI messages) */}
                {isAI && (
                    <div className="flex items-center gap-2 mt-2 ml-1">
                        <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" title="Copy">
                            <Copy className="w-4 h-4 text-gray-500" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" title="Like">
                            <ThumbsUp className="w-4 h-4 text-gray-500" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" title="Dislike">
                            <ThumbsDown className="w-4 h-4 text-gray-500" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" title="Regenerate">
                            <RefreshCw className="w-4 h-4 text-gray-500" />
                        </button>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default function TutorPage() {
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'ai',
            content: "👋 Hi! I'm your AI tutor. I'm here to help you learn anything you'd like. What would you like to explore today?",
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedModel, setSelectedModel] = useState('DeepSeek');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [apiStatus, setApiStatus] = useState(null);
    const [error, setError] = useState(null);
    const messagesEndRef = useRef(null);

    // Check API health on mount
    useEffect(() => {
        checkAPIHealth().then(isHealthy => {
            setApiStatus(isHealthy ? 'online' : 'offline');
        });
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const aiModels = [
        { name: 'DeepSeek', description: 'Fast and efficient responses', icon: '⚡' },
        { name: 'LLaMA', description: 'Open-source, privacy-focused', icon: '�' },
        { name: 'Minimax', description: 'Balanced performance and speed', icon: '⚖️' }
    ];

    const suggestedPrompts = [
        { icon: '🔬', text: 'Explain quantum physics', category: 'Science' },
        { icon: '💻', text: 'Teach me React hooks', category: 'Programming' },
        { icon: '📊', text: 'Help with statistics', category: 'Mathematics' },
        { icon: '📖', text: 'Analyze Shakespeare', category: 'Literature' },
        { icon: '🌍', text: 'World War II history', category: 'History' },
        { icon: '🎨', text: 'Art history basics', category: 'Arts' }
    ];

    const sessionHistory = [
        { id: 1, title: 'Quantum Mechanics Basics', date: 'Today' },
        { id: 2, title: 'React Component Design', date: 'Yesterday' },
        { id: 3, title: 'Calculus Integration', date: '2 days ago' },
        { id: 4, title: 'Spanish Grammar', date: '3 days ago' }
    ];

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = {
            id: messages.length + 1,
            type: 'user',
            content: input,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        setError(null);

        try {
            // Convert messages to API format (exclude first welcome message)
            const conversationHistory = messages
                .slice(1) // Skip welcome message
                .map(msg => ({
                    role: msg.type === 'user' ? 'user' : 'assistant',
                    content: msg.content
                }));

            // Call backend API
            const result = await sendChatMessage(input, conversationHistory, selectedModel);

            if (result.success) {
                const aiMessage = {
                    id: messages.length + 2,
                    type: 'ai',
                    content: result.response,
                    timestamp: new Date(),
                    model: result.model,
                    tokens: result.tokens
                };
                setMessages(prev => [...prev, aiMessage]);

                // Show info if fallback model was used
                if (result.fallback_used) {
                    setError(`⚠️ ${selectedModel} was unavailable. Response from ${result.model} instead.`);
                    setTimeout(() => setError(null), 5000); // Auto-dismiss after 5s
                }
            } else {
                setError(result.error || 'Failed to get response from AI');
                // Remove user message if failed
                setMessages(prev => prev.slice(0, -1));
            }
        } catch (err) {
            console.error('Error sending message:', err);
            setError('An unexpected error occurred. Please try again.');
            // Remove user message if failed
            setMessages(prev => prev.slice(0, -1));
        } finally {
            setIsLoading(false);
        }
    };

    const handlePromptClick = (prompt) => {
        setInput(prompt.text);
    };

    return (
        <div className="h-screen flex bg-gray-50 dark:bg-gray-950">
            {/* Sidebar */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <>
                        {/* Mobile Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsSidebarOpen(false)}
                            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                        />

                        {/* Sidebar Content */}
                        <motion.aside
                            initial={{ x: -300 }}
                            animate={{ x: 0 }}
                            exit={{ x: -300 }}
                            className="fixed lg:static inset-y-0 left-0 z-50 w-80 glass-strong border-r border-gray-200 dark:border-gray-800 flex flex-col"
                        >
                            {/* Sidebar Header */}
                            <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
                                <Link href="/" className="flex items-center space-x-2">
                                    <div className="bg-gradient-to-r from-indigo-600 to-cyan-600 p-2 rounded-lg">
                                        <Brain className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="font-bold gradient-text-electric text-lg">MindMentor</span>
                                </Link>
                                <button
                                    onClick={() => setIsSidebarOpen(false)}
                                    className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* AI Model Selector */}
                            <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3 block">
                                    AI MODEL
                                </label>
                                <div className="space-y-2">
                                    {aiModels.map((model) => (
                                        <button
                                            key={model.name}
                                            onClick={() => setSelectedModel(model.name)}
                                            className={`w-full px-4 py-3 rounded-xl transition-all flex items-center gap-3 text-left ${selectedModel === model.name
                                                    ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-lg'
                                                    : 'glass hover:glass-strong'
                                                }`}
                                        >
                                            <span className="text-2xl">{model.icon}</span>
                                            <div className="flex-1 min-w-0">
                                                <p className={`text-sm font-semibold ${selectedModel === model.name ? 'text-white' : 'text-gray-900 dark:text-white'
                                                    }`}>
                                                    {model.name}
                                                </p>
                                                <p className={`text-xs ${selectedModel === model.name ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'
                                                    }`}>
                                                    {model.description}
                                                </p>
                                            </div>
                                            {selectedModel === model.name && (
                                                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Session History */}
                            <div className="flex-1 overflow-y-auto p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                                        RECENT SESSIONS
                                    </h3>
                                    <History className="w-4 h-4 text-gray-400" />
                                </div>
                                <div className="space-y-2">
                                    {sessionHistory.map((session) => (
                                        <button
                                            key={session.id}
                                            className="w-full p-3 rounded-xl glass hover:glass-strong transition-all text-left group"
                                        >
                                            <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-1 truncate">
                                                {session.title}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                {session.date}
                                            </p>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Sidebar Footer */}
                            <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-2">
                                <Link href="/dashboard">
                                    <button className="w-full px-4 py-3 rounded-xl glass hover:glass-strong transition-all flex items-center space-x-3 text-sm font-medium">
                                        <Bookmark className="w-4 h-4" />
                                        <span>Dashboard</span>
                                    </button>
                                </Link>
                                <button className="w-full px-4 py-3 rounded-xl glass hover:glass-strong transition-all flex items-center space-x-3 text-sm font-medium">
                                    <Settings className="w-4 h-4" />
                                    <span>Settings</span>
                                </button>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col relative">
                {/* Fixed Toast Notification for Errors */}
                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -100 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -100 }}
                            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full mx-4"
                        >
                            <div className="bg-white dark:bg-gray-900 border-2 border-red-500 rounded-xl shadow-2xl backdrop-blur-xl p-4 flex items-start gap-3">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                                    <AlertCircle className="w-5 h-5 text-red-500" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                                        {error.startsWith('⚠️') ? 'Model Switched' : 'Error'}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 break-words">
                                        {error}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setError(null)}
                                    className="flex-shrink-0 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                >
                                    <X className="w-4 h-4 text-gray-500" />
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Header */}
                <header className="glass-strong border-b border-gray-200 dark:border-gray-800 px-4 py-4">
                    <div className="flex items-center justify-between max-w-5xl mx-auto">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                                <Menu className="w-5 h-5" />
                            </button>
                            <div>
                                <h1 className="font-semibold text-gray-900 dark:text-white">AI Tutor Session</h1>
                                <div className="flex items-center gap-2">
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Powered by {selectedModel}</p>
                                    {apiStatus && (
                                        <span className={`flex items-center gap-1 text-xs ${apiStatus === 'online' ? 'text-green-500' : 'text-red-500'}`}>
                                            <span className={`w-2 h-2 rounded-full ${apiStatus === 'online' ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
                                            {apiStatus === 'online' ? 'Online' : 'Offline'}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                <Bookmark className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            </button>
                            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto px-4 py-6">
                    <div className="max-w-5xl mx-auto space-y-6">
                        {messages.map((message) => (
                            <MessageBubble key={message.id} message={message} />
                        ))}

                        {isLoading && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex gap-4"
                            >
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
                                    <Bot className="w-5 h-5 text-white" />
                                </div>
                                <div className="px-4 py-3 rounded-2xl glass-strong">
                                    <div className="flex space-x-2">
                                        <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" />
                                        <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0.1s' }} />
                                        <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0.2s' }} />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Suggested Prompts (shown when no messages) */}
                    {messages.length === 1 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-5xl mx-auto mt-8"
                        >
                            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4 text-center">
                                SUGGESTED TOPICS
                            </h3>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                {suggestedPrompts.map((prompt, index) => (
                                    <motion.button
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        onClick={() => handlePromptClick(prompt)}
                                        className="p-4 rounded-xl glass-strong hover:shadow-lg transition-all text-left group"
                                    >
                                        <div className="text-2xl mb-2">{prompt.icon}</div>
                                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
                                            {prompt.text}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            {prompt.category}
                                        </p>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Input Area */}
                <div className="border-t border-gray-200 dark:border-gray-800 px-4 py-4 glass-strong">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex items-end space-x-3">
                            <div className="flex-1 relative">
                                <textarea
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSend();
                                        }
                                    }}
                                    placeholder="Ask me anything... (Shift + Enter for new line)"
                                    rows={1}
                                    className="w-full px-4 py-3 pr-12 rounded-xl glass-strong resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                                    style={{ minHeight: '48px', maxHeight: '120px' }}
                                />
                                <button className="absolute right-3 bottom-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                    <Mic className="w-4 h-4 text-gray-500" />
                                </button>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleSend}
                                disabled={!input.trim() || isLoading}
                                className="p-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all"
                            >
                                <Send className="w-5 h-5" />
                            </motion.button>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                            MindMentor AI may make mistakes. Verify important information.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
