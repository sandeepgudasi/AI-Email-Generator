# ✉️ AI Email Generator

> A production-ready AI-powered SaaS application that generates
> professional emails using Large Language Models (LLMs). Built with
> **React**, **FastAPI**, and **Python**, the application creates
> personalized emails in seconds with multiple AI provider support.

------------------------------------------------------------------------

## 📌 Overview

AI Email Generator helps users generate polished emails for business,
sales, marketing, HR, customer support, and personal communication.
Users simply provide a prompt, choose a tone, and the AI generates a
professional subject line and email body.

This project demonstrates full-stack development, REST API design, AI
integration, clean architecture, and modern UI development.

------------------------------------------------------------------------

## ✨ Features

### Core Features

-   🤖 AI-powered email generation
-   ✉️ Automatic subject line generation
-   🎭 Multiple tone selection (Professional, Friendly, Formal, Casual)
-   ⚡ Fast email generation
-   📱 Fully responsive interface
-   🎨 Modern glassmorphism UI

### Advanced Features

-   📋 One-click copy to clipboard
-   🕘 Persistent email history (SQLite)
-   🔄 Multiple AI providers
    -   Google Gemini
    -   OpenAI
    -   OpenRouter
-   💡 Example prompt suggestions
-   ⚠️ Robust error handling
-   🔁 Retry support

------------------------------------------------------------------------

# 🏗️ System Architecture

``` text
+-------------+
| React (Vite)|
+------+------+
       |
       | REST API
       v
+------+------+
| FastAPI API |
+------+------+
       |
       +-------------------+
       |                   |
       v                   v
 SQLite Database      AI Provider
                  (Gemini/OpenAI/OpenRouter)
```

------------------------------------------------------------------------

# 🛠️ Tech Stack

  Layer      Technology
  ---------- -----------------------------------
  Frontend   React 18, Vite, Vanilla CSS
  Backend    FastAPI, Python 3.10+
  AI         Google Gemini, OpenAI, OpenRouter
  Database   SQLite + SQLAlchemy
  HTTP       Fetch API, httpx

------------------------------------------------------------------------

# 📸 Screenshots

Add screenshots before submitting.

``` text
screenshots/
├── home.png
├── generate.png
└── history.png
```

------------------------------------------------------------------------

# 🚀 Getting Started

## Prerequisites

-   Python 3.10+
-   Node.js 18+
-   npm 9+
-   API Key (Gemini/OpenAI/OpenRouter)

## Clone Repository

``` bash
git clone https://github.com/sandeepgudasi/AI-Email-Generator.git
cd AI-Email-Generator
```

------------------------------------------------------------------------

## Backend Setup

``` bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

# Linux/macOS
source venv/bin/activate

pip install -r requirements.txt
```

Create `.env`

``` env
AI_PROVIDER=gemini
AI_API_KEY=your_api_key
AI_MODEL=gemini-2.0-flash
DATABASE_URL=sqlite:///./email_history.db
```

Run backend

``` bash
uvicorn app.main:app --reload --port 8000
```

API Docs

http://localhost:8000/docs

------------------------------------------------------------------------

## Frontend Setup

``` bash
cd frontend
npm install
npm run dev
```

Frontend

http://localhost:5173

------------------------------------------------------------------------

# 📡 REST API

  Method   Endpoint            Description
  -------- ------------------- ----------------
  GET      /api/health         Health Check
  POST     /api/generate       Generate Email
  GET      /api/history        Fetch History
  DELETE   /api/history/{id}   Delete Email
  DELETE   /api/history        Clear History

Example Request

``` json
{
  "prompt":"Write a cold outreach email for a SaaS analytics product",
  "tone":"professional"
}
```

Example Response

``` json
{
  "subject":"Quick idea for your analytics workflow",
  "body":"Hi John,...",
  "provider":"gemini",
  "model":"gemini-2.0-flash"
}
```

------------------------------------------------------------------------

# 📁 Project Structure

``` text
AI-Email-Generator/
│
├── backend/
│   ├── app/
│   ├── requirements.txt
│   └── .env.example
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

------------------------------------------------------------------------

# 🔒 Security

-   Environment variables for secrets
-   API keys excluded from Git
-   Input validation using Pydantic
-   SQLAlchemy ORM
-   Centralized configuration

------------------------------------------------------------------------

# 💡 Design Decisions

-   FastAPI for high-performance APIs
-   React + Vite for fast frontend development
-   SQLAlchemy for ORM abstraction
-   Provider abstraction to switch AI providers easily
-   Modular service architecture for maintainability

------------------------------------------------------------------------

# 🚀 Future Enhancements

-   User authentication
-   Email templates
-   Rich text editor
-   Export to PDF
-   SMTP integration
-   Docker support
-   Unit & integration tests
-   CI/CD pipeline

------------------------------------------------------------------------

# 👨‍💻 Author

**Sandeep Gudasi**

AI Engineer \| Python Developer

GitHub: https://github.com/sandeepgudasi

------------------------------------------------------------------------

# 📄 License

This project was developed as part of a technical assessment and is
intended for demonstration and evaluation purposes.

If you found this project useful, consider giving it a ⭐ on GitHub.
