# MindMentor

An AI tutor that answers in full, remembers the conversation, lets you pick
which of twelve models answers, and tells you what each answer cost.

Next.js on the front, FastAPI on the back, every model reached through
OpenRouter with one key.

![MindMentor](docs/screenshot.png)

## What it does

- **Twelve models, one picker.** Free through frontier: NVIDIA Nemotron,
  Mistral Nemo, Qwen3, Gemini Flash, GPT-4o mini, GPT-5 mini, GPT-5.1,
  DeepSeek V3.1, Claude Haiku 4.5, Claude Sonnet 5. The catalogue lives in
  `backend/models.py`, and the request is checked against it, so the endpoint
  cannot be used to bill a model that is not on the list.
- **The bill, per answer.** Every reply shows its cost, taken from
  OpenRouter's own accounting rather than a price table, with reasoning
  tokens broken out: those are charged at the completion rate and never
  appear in what you read.
- **Fallback that does not multiply the bill.** Rate limits and upstream
  faults move to another model. A malformed request does not, because it
  would fail identically everywhere and be charged every time. Fallbacks only
  ever go to cheaper models.
- **Conversation memory**, markdown rendering, and dark mode.

## Answers in full

The system prompt asks for a complete answer the first time: an overview,
the core concepts, worked examples, common pitfalls, and a summary. The model
is told the reader may not get to ask a follow-up.

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
4. **Landing Page** - Update hero text and features in `app/page.js`

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

## Pages

1. **Landing** (`/`) - what it is and what it costs
2. **Tutor** (`/tutor`) - the chat, the model picker, the running cost

There used to be a dashboard, an about page and a sign-in page. All three
were mockups with invented data, as were the testimonials and the usage
figures on the landing page, so they have been removed rather than left
to look like features.

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
