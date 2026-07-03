# ✉️ AI Email Generator

A full-stack AI-powered email generation application that crafts professional emails using advanced language models. Enter a prompt, select a tone, and get a perfectly written email in seconds.

![Tech Stack](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

---

## 🚀 Features

### Core
- **AI-Powered Email Generation** — Generate professional emails from natural language prompts
- **Tone Selection** — Choose from Professional, Friendly, Formal, or Casual tones
- **Email Subject Generation** — AI automatically generates a relevant subject line
- **Responsive UI** — Beautiful dark glassmorphism design that works on all devices

### Bonus
- ✅ **Copy to Clipboard** — One-click copy for subject and email body
- ✅ **Email History** — Persistent history stored in SQLite database
- ✅ **Multiple AI Providers** — Supports Google Gemini, OpenAI, and OpenRouter
- ✅ **Example Prompts** — Quick-start chips for common email types
- ✅ **Error Handling** — Graceful error states with retry options

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, Vite, Vanilla CSS |
| **Backend** | FastAPI, Python 3.10+ |
| **AI Providers** | Google Gemini, OpenAI, OpenRouter |
| **Database** | SQLite (via SQLAlchemy) |
| **HTTP** | Fetch API (frontend), httpx (backend) |

---

## 📋 Prerequisites

- **Python** 3.10 or higher
- **Node.js** 18 or higher
- **npm** 9 or higher
- An API key from one of: [Google Gemini](https://aistudio.google.com/apikey), [OpenAI](https://platform.openai.com/api-keys), or [OpenRouter](https://openrouter.ai/keys)

---

## ⚡ Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Assignment
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
# Edit .env and add your API key
```

#### Configure `.env`

Edit the `.env` file with your preferred AI provider:

**Option A: Google Gemini (Recommended — Free Tier Available)**
```env
AI_PROVIDER=gemini
AI_API_KEY=your-gemini-api-key
AI_MODEL=gemini-2.0-flash
```

**Option B: OpenAI**
```env
AI_PROVIDER=openai
AI_API_KEY=sk-your-openai-key
AI_MODEL=gpt-4o-mini
```

**Option C: OpenRouter**
```env
AI_PROVIDER=openrouter
AI_API_KEY=sk-or-your-openrouter-key
AI_MODEL=google/gemini-2.0-flash-exp:free
```

#### Start the Backend

```bash
uvicorn app.main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`. Visit `http://localhost:8000/docs` for interactive API documentation.

### 3. Frontend Setup

Open a **new terminal**:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173`.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Health check & provider info |
| `POST` | `/api/generate` | Generate email from prompt |
| `GET` | `/api/history` | Get email generation history |
| `DELETE` | `/api/history/{id}` | Delete a history entry |
| `DELETE` | `/api/history` | Clear all history |

### Generate Email — Request Example

```json
POST /api/generate
{
  "prompt": "Write a follow-up email after a job interview",
  "tone": "professional"
}
```

### Generate Email — Response Example

```json
{
  "subject": "Thank You for the Interview Opportunity",
  "body": "Dear Hiring Manager,\n\nThank you for taking the time to meet with me today...",
  "provider": "gemini",
  "model": "gemini-2.0-flash"
}
```

---

## 📁 Project Structure

```
Assignment/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py              # FastAPI application entry point
│   │   ├── config.py            # Environment configuration
│   │   ├── database.py          # SQLAlchemy database setup
│   │   ├── models.py            # ORM models
│   │   ├── schemas.py           # Pydantic request/response schemas
│   │   ├── routes/
│   │   │   ├── email.py         # Email generation & history routes
│   │   │   └── health.py        # Health check route
│   │   └── services/
│   │       ├── ai_service.py    # Multi-provider AI integration
│   │       └── email_service.py # Business logic layer
│   ├── requirements.txt
│   ├── .env.example
│   └── .env                     # Your local config (git-ignored)
├── frontend/
│   ├── src/
│   │   ├── App.jsx              # Main application component
│   │   ├── main.jsx             # React entry point
│   │   ├── index.css            # Design system & global styles
│   │   ├── components/
│   │   │   ├── Header.jsx       # App header with branding
│   │   │   ├── PromptInput.jsx  # Email prompt textarea
│   │   │   ├── ToneSelector.jsx # Tone selection pills
│   │   │   ├── EmailDisplay.jsx # Generated email display
│   │   │   ├── HistorySidebar.jsx # Email history panel
│   │   │   ├── CopyButton.jsx   # Copy-to-clipboard button
│   │   │   └── LoadingSpinner.jsx # Loading state indicator
│   │   ├── hooks/
│   │   │   └── useEmailGenerator.js # Email generation hook
│   │   └── services/
│   │       └── api.js           # Backend API client
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```

---

## 🎨 Design Highlights

- **Dark Glassmorphism Theme** — Semi-transparent cards with backdrop blur
- **Animated Gradient Accents** — Electric blue to purple gradient throughout
- **Micro-Animations** — Smooth hover effects, transitions, and loading states
- **Premium Typography** — Inter for UI, JetBrains Mono for email content
- **Responsive Layout** — Collapsible sidebar, mobile-optimized controls
- **Floating Gradient Orbs** — Ambient animated background elements

---

## 🔧 Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `AI_PROVIDER` | `gemini` | AI provider (`gemini`, `openai`, `openrouter`) |
| `AI_API_KEY` | — | Your API key (required) |
| `AI_MODEL` | `gemini-2.0-flash` | Model identifier |
| `DATABASE_URL` | `sqlite:///./email_history.db` | Database connection string |

---

## 🧪 Testing

```bash
# Test backend health
curl http://localhost:8000/api/health

# Test email generation
curl -X POST http://localhost:8000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Write a thank you email", "tone": "professional"}'
```

---

## 📝 License

This project was built as a full-stack developer assignment.

---

Built with ❤️ using FastAPI + React + AI
