# 🛠️ Setup & Installation Guide

Complete guide for setting up and running MindMentor locally.

> **📌 Important:** Only the `/tutor` AI chat page is fully functional. Other pages (Dashboard, About, Auth) are UI templates with placeholder content. See README.md for details.

---

## 📋 Prerequisites

Before you begin, ensure you have:

- ✅ **Python 3.8+** - [Download](https://www.python.org/downloads/)
- ✅ **Node.js 18+** - [Download](https://nodejs.org/)
- ✅ **OpenRouter API Key** - [Get Free Key](https://openrouter.ai/keys)

---

## 🔧 Installation

### 1. Clone Repository

```bash
git clone <your-repo-url>
cd MindMentor
```

### 2. Backend Setup

```powershell
# Navigate to backend folder
cd backend

# Install Python dependencies
pip install fastapi uvicorn openai python-dotenv

# Create .env file
# Use any text editor or:
echo OPENAI_API_KEY=your_key_here > .env
```

**Backend `.env` file:**
```env
OPENAI_API_KEY=your_openrouter_api_key_here
```

### 3. Frontend Setup

```powershell
# Navigate to frontend folder
cd frontend

# Install Node dependencies
npm install
```

**Frontend `.env.local` file** (should already exist):
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## ▶️ Running the Application

### Option 1: Two Separate Terminals (Recommended)

**Terminal 1 - Backend:**
```powershell
cd backend
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Wait for:** `✓ Application startup complete.`

**Terminal 2 - Frontend:**
```powershell
cd frontend
npm run dev
```

**Wait for:** `✓ Ready in X.Xs`

### Option 2: PowerShell Background Jobs

```powershell
# Start backend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000"

# Wait 5 seconds
Start-Sleep -Seconds 5

# Start frontend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"
```

---

## ✅ Verify Installation

### 1. Check Backend
```powershell
curl http://localhost:8000/health
```
**Expected:** `{"status":"healthy","service":"MindMentor API"}`

### 2. Check Frontend
Open browser: **http://localhost:3000**

- Landing page should load
- Navigate to `/tutor`
- Look for green "Online" indicator in header

### 3. Test Chat
1. Go to http://localhost:3000/tutor
2. Type: **"Explain photosynthesis"**
3. Click **Send**
4. Should receive comprehensive AI response

---

## 🛑 Stop Servers

### Kill All Processes
```powershell
# Stop Python (backend)
Get-Process -Name python -ErrorAction SilentlyContinue | Stop-Process -Force

# Stop Node (frontend)
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force
```

Or press `Ctrl+C` in each terminal window.

---

## 🐛 Troubleshooting

### Issue: Backend Won't Start

**Error:** `ModuleNotFoundError: No module named 'fastapi'`

**Solution:**
```powershell
cd backend
pip install --upgrade fastapi uvicorn openai python-dotenv
```

---

### Issue: Frontend Port Conflict

**Error:** `Port 3000 is in use`

**Solution 1:** Frontend will auto-use port 3001  
**Solution 2:**
```powershell
Get-Process -Name node | Stop-Process -Force
npm run dev
```

---

### Issue: API Key Error

**Error:** `Invalid authentication` or `API key not found`

**Solution:**
1. Check `backend/.env` file exists
2. Verify it contains: `OPENAI_API_KEY=your_key`
3. Get new key at https://openrouter.ai/keys
4. Restart backend server

---

### Issue: CORS Error

**Error:** `Access-Control-Allow-Origin missing` in browser console

**Solution:**
- CORS is already configured in `backend/main.py`
- Verify backend is running
- Restart backend server
- Check frontend URL matches CORS allowed origins

---

### Issue: Model Rate Limited

**Error:** `429 - Provider returned error`

**What Happens:**
- Automatically tries next available model
- Shows notification: "DeepSeek was unavailable. Response from LLaMA instead."
- User gets response without interruption

**If All Models Fail:**
- Wait a few minutes
- Or add your own API key at OpenRouter
- Free models have shared rate limits

---

### Issue: Messages Blinking While Typing

**Solution:** Already fixed - `MessageBubble` component moved outside main component

---

### Issue: "Module not found" in Frontend

**Solution:**
```powershell
cd frontend
Remove-Item -Recurse -Force .next
npm install
npm run dev
```

---

## 🔍 Debug Commands

### Check Running Processes
```powershell
# Check Python (backend)
Get-Process -Name python

# Check Node (frontend)
Get-Process -Name node

# Check port usage
netstat -ano | findstr :8000
netstat -ano | findstr :3000
```

### View Logs
- **Backend:** Check terminal running uvicorn
- **Frontend:** Check terminal running npm dev
- **Browser:** Open DevTools (F12) → Console/Network tabs

---

## 📊 Access Points

### Frontend URLs:
- **Landing:** http://localhost:3000
- **AI Tutor:** http://localhost:3000/tutor
- **Dashboard:** http://localhost:3000/dashboard
- **About:** http://localhost:3000/about
- **Auth:** http://localhost:3000/auth

### Backend URLs:
- **Health:** http://localhost:8000/health
- **Models:** http://localhost:8000/models
- **API Docs:** http://localhost:8000/docs (auto-generated by FastAPI)
- **Chat API:** http://localhost:8000/chat (POST)

---

## 🎓 Usage Tips

### For Best AI Responses:
1. **Be Specific:** "Explain photosynthesis for a 10th grader"
2. **Ask Complex Questions:** AI is designed for thorough answers
3. **Follow Up Naturally:** "Can you elaborate?" works because of context memory
4. **Use Different Models:** Each has different strengths

### Model Recommendations:
- **DeepSeek:** Fastest, good for quick questions
- **LLaMA:** Best for detailed explanations
- **Minimax:** Balanced speed and detail

---

## 🔐 Security Notes

1. **Never commit `.env` files** - Contains API keys
2. **API key in backend only** - Never exposed to frontend
3. **CORS configured** - Only allows localhost:3000/3001
4. **Free models** - No credit card required

---

## 🚀 Next Steps After Setup

1. ✅ Verify all tests pass
2. 🎨 Customize system prompt in `backend/main.py`
3. 📱 Test on mobile devices
4. 🌐 Deploy to production (optional)
5. 📊 Add analytics (optional)

---

## 📞 Need Help?

- Check [README.md](./README.md) for project overview
- Check [ARCHITECTURE.md](./ARCHITECTURE.md) for technical details
- Review backend terminal for API errors
- Check browser console (F12) for frontend errors

---

**Happy Learning! 🎓**

### Option 1: Terminal Windows
Press `Ctrl+C` in each terminal

### Option 2: Kill All Processes
```powershell
# Stop all Python processes
Get-Process -Name python -ErrorAction SilentlyContinue | Stop-Process -Force

# Stop all Node processes
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force
```

---

## 🐛 Troubleshooting

### Backend Not Starting?
```powershell
# Install/upgrade dependencies
cd "d:\Portfolio projs\MindMentor\backend"
pip install --upgrade fastapi uvicorn openai python-dotenv

# Check .env file exists
Test-Path .env
# Should return: True

# Check API key is set
Get-Content .env
# Should show: OPENAI_API_KEY=sk-or-...
```

### Frontend Port Conflict?
```powershell
# Kill existing Node processes
Get-Process -Name node | Stop-Process -Force

# Or just use port 3001 (automatic)
```

### CORS Error in Browser Console?
```powershell
# Restart backend server
# CORS is already configured in main.py
```

### "Module not found" in Frontend?
```powershell
cd "d:\Portfolio projs\MindMentor\frontend"
Remove-Item -Recurse -Force .next
npm install
npm run dev
```

---

## 📱 Access Points

### Main App:
- **Landing Page:** http://localhost:3000
- **AI Tutor:** http://localhost:3000/tutor
- **Dashboard:** http://localhost:3000/dashboard
- **About:** http://localhost:3000/about
- **Auth:** http://localhost:3000/auth

### Backend API:
- **Health Check:** http://localhost:8000/health
- **Models List:** http://localhost:8000/models
- **API Docs:** http://localhost:8000/docs (auto-generated by FastAPI)

---

## 🎓 Usage Tips

### For Best AI Responses:
1. **Be Specific:** "Explain photosynthesis for a 10th grader"
2. **Ask Complex Questions:** The AI is designed to give thorough answers
3. **Follow Up Naturally:** "Can you elaborate?" works because of context memory
4. **Switch Models:** Try different models for different learning styles

### Model Recommendations:
- **GPT-4:** Best for complex topics (physics, philosophy)
- **DeepSeek:** Fastest, good for quick questions
- **Claude:** Best for detailed explanations and analysis
- **LLaMA:** Privacy-focused, open-source

---

## 🔐 Security Note

**Important:** Never commit your `.env` file with API keys!

The `.env` file should contain:
```env
OPENAI_API_KEY=your_actual_key_here
```

Keep this file private and local only.

---

## 📊 Monitor Usage

### Check Backend Logs:
Backend terminal shows all requests:
```
INFO: 127.0.0.1:xxxxx - "POST /chat HTTP/1.1" 200 OK
```

### Check Network in Browser:
1. Open DevTools (F12)
2. Go to Network tab
3. Send a message
4. See API request to `/chat`

---

## 🚀 Ready to Go!

Run these two commands in separate terminals:

**Terminal 1:**
```powershell
cd "d:\Portfolio projs\MindMentor\backend" ; python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Terminal 2:**
```powershell
cd "d:\Portfolio projs\MindMentor\frontend" ; npm run dev
```

Then open: **http://localhost:3000/tutor**

---

## 📞 Need Help?

Check these files:
- **TESTING_GUIDE.md** - Detailed testing procedures
- **BACKEND_INTEGRATION.md** - Complete technical documentation
- **COMPLETION_SUMMARY.md** - What was built and why

---

**Happy Learning! 🎓**
