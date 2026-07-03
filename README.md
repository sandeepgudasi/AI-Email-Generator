# ✉️ AI Email Generator

> A full-stack AI-powered email generation application built with
> **React**, **FastAPI**, and **Python**. Generate professional emails
> from natural language prompts using multiple LLM providers with
> dynamic model selection.

## 🚀 Features

### Core

-   🤖 AI-powered email generation
-   ✉️ Automatic subject generation
-   🎭 Tone selection (Professional, Friendly, Formal, Casual)
-   📱 Responsive UI
-   ⚡ FastAPI backend integration
-   ❌ Error handling

### Advanced

-   📋 Copy to Clipboard
-   🕘 Email History (SQLite)
-   🔄 Multiple AI Providers (Gemini, OpenAI, OpenRouter, Ollama)
-   🧠 Dynamic Model Selection
-   💡 Example Prompts

## 🧠 Supported Providers

  Provider         Support
  ---------------- ---------
  Google Gemini    ✅
  OpenAI           ✅
  OpenRouter       ✅
  Ollama (Local)   ✅

Users can select both the AI provider and model directly from the UI.

## 🏗️ Architecture

``` text
React UI
   │
   ▼
FastAPI API
   │
   ▼
AI Service Layer
   │
 ┌─┼───────────────┐
 ▼ ▼       ▼      ▼
Gemini OpenAI OpenRouter Ollama
   │
   ▼
SQLite
```

## 🛠️ Tech Stack

-   Frontend: React 18, Vite, CSS
-   Backend: FastAPI, Python 3.10+
-   AI: Gemini, OpenAI, OpenRouter, Ollama
-   Database: SQLite + SQLAlchemy

## ⚙️ Installation

``` bash
git clone https://github.com/sandeepgudasi/AI-Email-Generator.git
cd AI-Email-Generator
```

### Backend

``` bash
cd backend
python -m venv venv
# Windows
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### Frontend

``` bash
cd frontend
npm install
npm run dev
```

### Environment Examples

``` env
AI_PROVIDER=gemini
AI_API_KEY=your_key
AI_MODEL=gemini-2.0-flash
```

``` env
AI_PROVIDER=ollama
OLLAMA_BASE_URL=http://localhost:11434
AI_MODEL=llama3.2
```

## ▶️ Usage

1.  Select AI Provider
2.  Select AI Model
3.  Enter prompt
4.  Choose tone
5.  Generate email
6.  Copy or review history

## 📡 API

-   GET `/api/health`
-   POST `/api/generate`
-   GET `/api/history`
-   DELETE `/api/history/{id}`
-   DELETE `/api/history`

## 🔒 Security

-   Environment variables for secrets
-   Pydantic validation
-   SQLAlchemy ORM
-   Local LLM support via Ollama

## 💡 Design Decisions

-   FastAPI for performance
-   React component architecture
-   Service layer for AI integration
-   Provider abstraction
-   Runtime model selection

## 🚀 Future Work

-   Authentication
-   Docker
-   PostgreSQL
-   SMTP Integration
-   CI/CD

## 👨‍💻 Author

**Sandeep Gudasi**

GitHub: https://github.com/sandeepgudasi

## 📄 License

Built as a Full Stack AI Developer technical assessment.
