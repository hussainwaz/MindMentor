# 🎓 MindMentor - AI-Powered Learning Platform

**MindMentor** is a modern, premium AI tutoring web application that helps students learn any topic with comprehensive, context-aware responses. Built with Next.js, FastAPI, and powered by multiple free AI models.

> **⚠️ Note:** This is a **UI/UX showcase project**. The `/tutor` AI chat is fully functional, but other pages (Dashboard, About, Auth) contain placeholder UI and dummy data for demonstration purposes. Feel free to customize them for your needs!

---

## 🌟 What is MindMentor?

MindMentor is an intelligent tutoring platform that provides:

- **Comprehensive AI Responses**: Get complete, detailed explanations without needing follow-up questions
- **Conversation Memory**: AI remembers your entire conversation context for natural, flowing discussions
- **Multi-Model Support**: Choose between DeepSeek, LLaMA, and Minimax (all free)
- **Automatic Fallbacks**: If one model is unavailable, automatically switches to another
- **Beautiful Markdown Rendering**: Responses formatted with headings, lists, code blocks, and more
- **Premium UI/UX**: Glassmorphism effects, smooth animations, dark/light mode

---

## ✨ What's Functional vs. Placeholder

### ✅ Fully Functional:
- **AI Tutor Chat** (`/tutor`) - Complete working chat with:
  - Real AI responses from multiple models
  - Conversation context memory
  - Markdown rendering
  - Model switching
  - Auto-fallback on rate limits
  - Error handling

### 🎨 UI Template/Placeholder:
- **Landing Page** (`/`) - Static showcase UI
- **Dashboard** (`/dashboard`) - Dummy stats, charts, and progress bars
- **About Page** (`/about`) - Static content about the platform
- **Auth Page** (`/auth`) - Login/signup UI only (no backend authentication)
- **Session History** (in sidebar) - Dummy data for visual reference
- **User Profile** - Not implemented
- **Bookmarks, Likes, Actions** - UI buttons without functionality

**👉 These pages are designed as templates** for you to extend with your own backend logic, database, and features!

---

## 🎯 Key Features

### For Students:
- 📚 **Learn Any Topic**: From quantum physics to React hooks
- 💬 **Natural Conversations**: AI maintains context throughout your session
- 🎨 **Visual Learning**: Markdown-formatted responses with structured information
- ⚡ **Fast Responses**: Free AI models with automatic fallback
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile

### For Developers:
- 🚀 **Modern Stack**: Next.js 16 + FastAPI + OpenRouter
- 🎨 **TailwindCSS 4**: Utility-first styling with custom animations
- 🔄 **Real-time Updates**: Conversation context managed efficiently
- 🛡️ **Error Handling**: Graceful fallbacks and user-friendly notifications
- 📖 **Clean Code**: Well-structured, documented, maintainable

---

## 📁 Project Structure

```
MindMentor/
├── frontend/          # Next.js application (React 19)
│   ├── app/           # Pages and routes
│   ├── components/    # Reusable components
│   └── lib/           # API client and utilities
├── backend/           # FastAPI server (Python)
│   └── main.py        # API endpoints
└── docs/              # Documentation
    ├── ARCHITECTURE.md   # System architecture & design
    └── SETUP.md          # Installation & usage guide
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ 
- **Python** 3.8+
- **OpenRouter API Key** (free - get at https://openrouter.ai/keys)

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd MindMentor
```

2. **Setup Backend**
```bash
cd backend
pip install fastapi uvicorn openai python-dotenv
```

Create `.env` file in `backend/`:
```env
OPENAI_API_KEY=your_openrouter_api_key_here
```

3. **Setup Frontend**
```bash
cd frontend
npm install
```

4. **Run Both Servers**

Terminal 1 (Backend):
```bash
cd backend
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

5. **Open App**: http://localhost:3000/tutor

---

## 📚 Documentation

For detailed information, see:

1. **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System design, data flow, component structure
2. **[SETUP.md](./SETUP.md)** - Detailed setup, configuration, troubleshooting

---

## 🎨 Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TailwindCSS 4** - Utility-first CSS with custom animations
- **Framer Motion** - Smooth animations and transitions
- **React Markdown** - Beautiful markdown rendering
- **Lucide React** - Modern icon system

### Backend
- **FastAPI** - Modern Python web framework
- **OpenRouter** - Multi-model AI API gateway
- **Pydantic** - Data validation
- **Uvicorn** - ASGI server

### AI Models (Free)
- **DeepSeek R1** - Fast and efficient
- **LLaMA 3.3 70B** - Open-source, privacy-focused
- **Minimax M2** - Balanced performance

---

## 🌐 Features in Detail

### 1. Conversation Context Management
- Full message history sent with each request
- AI understands context from previous messages
- No need to repeat information

### 2. Smart Model Fallback
- If primary model fails → automatically tries next model
- User notified with toast notification
- Seamless experience without interruption

### 3. Markdown Rendering
- **Headings** (H1-H4) with proper styling
- **Lists** (ordered and unordered)
- **Code blocks** with syntax highlighting
- **Tables**, **blockquotes**, **links**
- **Bold**, *italic*, and `inline code`

### 4. Error Handling
- Fixed position toast notifications
- No layout shift when errors appear
- Auto-dismiss after 5 seconds
- User-friendly error messages

### 5. Premium UI/UX
- Glassmorphism effects with backdrop blur
- Smooth gradient animations
- Custom model selector (card-based, no ugly dropdowns)
- Dark/light mode support
- Responsive design for all screen sizes

---

## 🎨 Customization Guide

Want to make this your own? Here's what you can extend:

### Easy Customization:
1. **System Prompt** - Edit `backend/main.py` to change AI personality
2. **Colors/Theme** - Modify `frontend/app/globals.css` gradient values
3. **Models** - Add more free models in `backend/main.py` model_map
4. **Landing Page** - Update hero text, features, testimonials in `app/page.js`

### Advanced Extensions:
1. **Add Database** - PostgreSQL/MongoDB for user accounts & chat history
2. **Authentication** - Implement JWT tokens for user login
3. **Real Dashboard** - Connect actual user stats and learning progress
4. **Bookmarks** - Save favorite AI responses to database
5. **Session History** - Store and load previous conversations
6. **User Profiles** - Add account settings and preferences
7. **Payment Integration** - Upgrade to paid AI models with Stripe

**💡 Tip:** The current UI serves as a complete design system. Just add backend logic!

---

## 🔧 Configuration

### Backend `.env`
```env
OPENAI_API_KEY=your_openrouter_api_key
```

### Frontend `.env.local`
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## 📱 Pages

1. **Landing Page** (`/`) - Hero, features, testimonials
2. **AI Tutor** (`/tutor`) - Main chat interface
3. **Dashboard** (`/dashboard`) - User stats and progress
4. **About** (`/about`) - Mission, tech stack, team
5. **Auth** (`/auth`) - Login/signup (UI only)

---

## 🎯 Use Cases

- **Students**: Learn complex topics with detailed explanations
- **Developers**: Get coding help with markdown-formatted examples
- **Researchers**: Deep dive into technical subjects
- **Anyone**: Ask anything and get comprehensive answers

---

## 🤝 Contributing

This is a portfolio project showcasing modern web development practices. Feel free to fork and customize!

---

## 📄 License

This project is open-source and available under the MIT License.

---

## 🙏 Credits

- **OpenRouter** - Multi-model AI API
- **Vercel** - Next.js framework
- **FastAPI** - Python web framework
- **Lucide** - Icon system
- **Framer** - Animation library

---

## 📞 Support

For detailed setup instructions, see [SETUP.md](./SETUP.md)  
For architecture details, see [ARCHITECTURE.md](./ARCHITECTURE.md)

---

**Built with ❤️ using modern web technologies**
