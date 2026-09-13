# 🏗️ MindMentor System Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           USER INTERFACE (Browser)                        │
│                         http://localhost:3000/tutor                       │
└─────────────────────────────────────────────────────────────────────────┘
                                      │
                                      │ User Types Message
                                      ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                          FRONTEND (Next.js)                               │
│                    Port 3000 - React Components                           │
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  app/tutor/page.js                                              │   │
│  │  - Message state management (useState)                           │   │
│  │  - Conversation history tracking                                │   │
│  │  - UI rendering (chat bubbles, loading)                         │   │
│  │  - Error handling & display                                     │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                      │                                    │
│                                      │ handleSend()                       │
│                                      ▼                                    │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  lib/api.js - API Client Layer                                  │   │
│  │  - sendChatMessage(message, history, model)                     │   │
│  │  - checkAPIHealth()                                             │   │
│  │  - Error handling & retry logic                                 │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
                                      │
                                      │ HTTP POST Request
                                      │ Body: {message, model, history[]}
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         BACKEND (FastAPI)                                 │
│                    Port 8000 - Python Server                              │
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  CORS Middleware                                                │   │
│  │  - Allows localhost:3000, localhost:3001                        │   │
│  │  - Enables cross-origin requests                                │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                      │                                    │
│                                      ▼                                    │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  POST /chat Endpoint                                            │   │
│  │                                                                 │   │
│  │  1. Parse request (ChatRequest model)                           │   │
│  │  2. Build message array:                                        │   │
│  │     - System prompt (comprehensive tutor instructions)          │   │
│  │     - Conversation history (previous messages)                  │   │
│  │     - Current user message                                      │   │
│  │  3. Map model name (GPT-4 → openai/gpt-4-turbo)               │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                      │                                    │
│                                      │ OpenAI Client                      │
│                                      │ messages=full_history              │
│                                      ▼                                    │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  OpenAI Client (configured for OpenRouter)                      │   │
│  │  - Base URL: https://openrouter.ai/api/v1                       │   │
│  │  - API Key: from .env file                                      │   │
│  │  - Temperature: 0.7                                             │   │
│  │  - Max Tokens: 2000                                             │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
                                      │
                                      │ HTTPS Request
                                      │ API Key Authentication
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        OPENROUTER API                                     │
│                   https://openrouter.ai/api/v1                            │
│                                                                           │
│  Routes to selected model:                                                │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │
│  │   GPT-4     │  │  DeepSeek   │  │   Claude    │  │   LLaMA     │  │
│  │   OpenAI    │  │  DeepSeek   │  │  Anthropic  │  │    Meta     │  │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘  │
│                                                                           │
│  - Processes message with full conversation history                      │
│  - Follows system prompt instructions                                    │
│  - Generates comprehensive response                                      │
└─────────────────────────────────────────────────────────────────────────┘
                                      │
                                      │ AI Response
                                      │ {response, tokens_used}
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         BACKEND (FastAPI)                                 │
│                                                                           │
│  Returns JSON:                                                            │
│  {                                                                        │
│    "model_used": "GPT-4",                                                 │
│    "response": "Photosynthesis is...",                                    │
│    "status": "success",                                                   │
│    "tokens_used": 342                                                     │
│  }                                                                        │
└─────────────────────────────────────────────────────────────────────────┘
                                      │
                                      │ HTTP Response
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                          FRONTEND (Next.js)                               │
│                                                                           │
│  lib/api.js receives response:                                            │
│  - Checks success status                                                  │
│  - Returns {success: true, response, model, tokens}                       │
│                                                                           │
│  app/tutor/page.js updates state:                                         │
│  - Adds AI message to messages array                                      │
│  - Stops loading animation                                                │
│  - Scrolls to bottom                                                      │
│  - Maintains full conversation history for next message                   │
└─────────────────────────────────────────────────────────────────────────┘
                                      │
                                      │ React Re-render
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                           USER INTERFACE (Browser)                        │
│                                                                           │
│  Displays AI response in chat bubble:                                     │
│  - Avatar with gradient background                                        │
│  - Message content (formatted markdown)                                   │
│  - Action buttons (copy, like, dislike, regenerate)                       │
│  - Timestamp                                                              │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 📊 Data Flow Example

### Request:
```javascript
// Frontend sends:
{
  "message": "Can you explain more?",
  "model": "GPT-4",
  "history": [
    {"role": "user", "content": "What is quantum physics?"},
    {"role": "assistant", "content": "Quantum physics is the study of..."}
  ]
}
```

### Backend Processing:
```python
# Backend builds:
messages = [
  {"role": "system", "content": "You are MindMentor..."},
  {"role": "user", "content": "What is quantum physics?"},
  {"role": "assistant", "content": "Quantum physics is the study of..."},
  {"role": "user", "content": "Can you explain more?"}
]

# Sends to OpenRouter with full context
```

### Response:
```javascript
// Backend returns:
{
  "model_used": "GPT-4",
  "response": "Certainly! Let me elaborate on quantum physics...",
  "status": "success",
  "tokens_used": 456
}

// Frontend adds to messages array:
messages.push({
  id: 4,
  type: 'ai',
  content: "Certainly! Let me elaborate on quantum physics...",
  timestamp: new Date()
})
```

---

## 🔄 State Management

### Frontend State (React useState):
```javascript
const [messages, setMessages] = useState([
  {id: 1, type: 'ai', content: 'Welcome!', timestamp: Date},
  {id: 2, type: 'user', content: 'What is ML?', timestamp: Date},
  {id: 3, type: 'ai', content: 'Machine learning...', timestamp: Date}
]);

const [isLoading, setIsLoading] = useState(false);
const [selectedModel, setSelectedModel] = useState('GPT-4');
const [apiStatus, setApiStatus] = useState('online');
const [error, setError] = useState(null);
```

### Conversation History Conversion:
```javascript
// Convert UI messages to API format:
const history = messages
  .slice(1) // Skip welcome message
  .map(msg => ({
    role: msg.type === 'user' ? 'user' : 'assistant',
    content: msg.content
  }));

// Now: [
//   {role: 'user', content: 'What is ML?'},
//   {role: 'assistant', content: 'Machine learning...'}
// ]
```

---

## 🛡️ Error Handling Flow

```
User Sends Message
      │
      ├─► Frontend catches empty input → Early return
      │
      ├─► API Client sends request
      │         │
      │         ├─► Network Error → Catch, return {success: false, error}
      │         │
      │         ├─► Backend Error (500) → Parse error, return {success: false}
      │         │
      │         └─► Success (200) → Return {success: true, response}
      │
      ├─► Frontend checks result.success
      │         │
      │         ├─► false → Show error banner, remove user message
      │         │
      │         └─► true → Add AI message, hide error
      │
      └─► Update UI state
```

---

## 🔐 Security Layers

### 1. CORS Protection
```python
# Backend only allows specific origins
allow_origins=["http://localhost:3000", "http://localhost:3001"]
```

### 2. Environment Variables
```
Backend: .env (OPENAI_API_KEY) - Never committed to git
Frontend: .env.local (API_URL) - Local only
```

### 3. API Key Protection
```
- API key stored in backend .env
- Never exposed to frontend
- All AI requests proxied through backend
```

### 4. Input Validation
```python
# Pydantic models validate all inputs
class ChatRequest(BaseModel):
    message: str
    model: str
    history: Optional[List[Message]] = []
```

---

## 📈 Performance Optimizations

### 1. React State Management
- `useState` for efficient re-renders
- `useEffect` for scroll management
- `useMemo` can be added for message filtering

### 2. API Client
- Single fetch function reused across components
- Error retry logic built-in
- Connection pooling via browser

### 3. Backend
- Async/await for non-blocking operations
- Uvicorn with auto-reload for development
- Can add caching layer for common questions

### 4. OpenRouter
- Smart model routing
- Load balancing across providers
- Fallback models if primary unavailable

---

## 🌐 Endpoints Summary

### Frontend Routes:
```
GET  /                    → Landing page
GET  /tutor               → AI chat interface
```

### Backend Routes:
```
POST /chat                → Main chat with history
POST /generate            → Legacy endpoint (backward compat)
GET  /health              → Health check
GET  /models              → Available AI models
GET  /docs                → Auto-generated API docs (FastAPI)
```

---

## 💾 Future Enhancements (Not Yet Implemented)

### 1. Database Integration
```
PostgreSQL/MongoDB to store:
- User accounts
- Conversation history
- Usage analytics
- Bookmarked messages
```

### 2. Authentication
```
JWT tokens for:
- User login/logout
- Session management
- API rate limiting per user
```

### 3. Streaming Responses
```
Server-Sent Events (SSE) for:
- Real-time response streaming
- Token-by-token display
- Better user experience
```

### 4. Caching
```
Redis for:
- Common questions (reduce API calls)
- Session storage
- Rate limiting
```

---

## 📱 Component Hierarchy

```
App (layout.js)
├── Navbar
│   ├── Logo
│   ├── Navigation Links
│   └── Theme Toggle
│
├── Page Content
│   │
│   ├── / (page.js) - Landing
│   │   ├── Hero Section
│   │   ├── Features Grid
│   │   ├── Testimonials
│   │   └── Stats Bar
│   │
│   ├── /tutor (tutor/page.js) - AI Chat
│   │   ├── Sidebar
│   │   │   ├── Model Selector
│   │   │   ├── Session History
│   │   │   └── Suggested Prompts
│   │   │
│   │   └── Main Chat
│   │       ├── Header (status indicator)
│   │       ├── Error Banner (conditional)
│   │       ├── Messages Area
│   │       │   └── MessageBubble (map)
│   │       ├── Loading Animation (conditional)
│   │       └── Input Area
│   │           ├── Textarea
│   │           └── Send Button
│   │
│   ├── /dashboard (dashboard/page.js)
│   ├── /about (about/page.js)
│   └── /auth (auth/page.js)
│
└── Footer
    ├── Links Grid
    ├── Newsletter Form
    └── Social Icons
```

---

## 🎨 Styling Architecture

```
globals.css
├── Custom Animations
│   ├── @keyframes gradient-shift (8s infinite)
│   ├── @keyframes pulse-glow (2s infinite)
│   └── @keyframes float (3s ease-in-out)
│
├── Glass Effects
│   ├── .glass (backdrop-blur, subtle border)
│   └── .glass-strong (stronger blur)
│
├── Gradient Text
│   ├── .gradient-text-electric (indigo→cyan)
│   └── .gradient-text-cyan (cyan→blue)
│
└── Utility Classes
    ├── Hover effects
    ├── Focus states
    └── Dark mode variants
```

---

This architecture ensures:
- ✅ Scalability (easy to add features)
- ✅ Maintainability (clear separation of concerns)
- ✅ Performance (optimized data flow)
- ✅ Security (API key protected, CORS configured)
- ✅ User Experience (real-time updates, error handling)
