AI Emotional Storyteller

An intelligent web application that crafts personalized short stories, poems, or motivational messages based on the user's selected mood. 
This project leverages the power of Google's Gemini API, is orchestrated with LangChain, and is built with a modern full-stack architecture featuring a React frontend and a Python/FastAPI backend.

Key Features

  - Emotion-Driven Generation: Select a mood (Happy, Sad, Stressed, etc.) to receive tailored content.
  - Multiple Creative Styles: Choose to generate a short Story, a Poem, or a Motivational Quote.
  - Real-time AI Interaction: Powered by Google's Gemini API for high-quality, creative text generation.
  - Text-to-Speech: Listen to the generated content directly in the browser using the Web Speech API.
  - Modern & Responsive UI: A clean, light-themed, and fully responsive interface built with React and Tailwind CSS.
  - Full-Stack Architecture: Demonstrates a complete client-server model with a Python backend serving the AI logic.

Tech Stack

Frontend: React.js, Vite, Tailwind CSS, Axios
Backend: Python, FastAPI, Uvicorn, Gunicorn
LLM / AI: Google Gemini API, LangChain
Deployment: Render (Static Site for Frontend, Web Service for Backend)

Getting Started

Follow these instructions to set up and run the project on your local machine.

Prerequisites

  - Node.js
  - Python 
  - Git

Installation & Setup

1.  Clone the repository:
    git clone [https://github.com/YourUsername/ai-emotional-storyteller.git](https://www.google.com/search?q=https://github.com/YourUsername/ai-emotional-storyteller.git)
    cd ai-emotional-storyteller
    (Replace YourUsername with your actual GitHub username.)

2.  Setup the Backend:

    # Navigate to the backend directory

    cd backend

    # Create and activate a Python virtual environment

    python -m venv venv

    # On Windows

    venv\\Scripts\\activate

    # On macOS/Linux

    # source venv/bin/activate

    # Install Python dependencies

    pip install -r requirements.txt

3.  Setup the Frontend:

    # Navigate to the frontend directory from the root

    cd ../frontend

    # Install Node.js dependencies

    npm install

Environment Variables

The backend requires an API key from Google to connect to the Gemini API.

1.  Create a file named .env inside the backend directory.
2.  Add your API key to this file:
    # backend/.env
    GOOGLE\_API\_KEY="YOUR\_GEMINI\_API\_KEY\_HERE"
    This .env file is included in .gitignore and will not be committed to GitHub.

Running the Application Locally

You will need two terminals running simultaneously.

1.  Terminal 1: Start the Backend Server

    # (From the root folder)

    cd backend
    venv\\Scripts\\activate
    uvicorn main:app --reload
    The backend will be running at [http://127.0.0.1:8000](https://www.google.com/search?q=http://127.0.0.1:8000).

2.  Terminal 2: Start the Frontend Server

    # (From the root folder)

    cd frontend
    npm run dev
    The frontend will be running at http://localhost:5173.

3.  Open your browser and navigate to http://localhost:5173 to use the application.

Deployment

This application is deployed on Render as two separate services:

  - A Static Site for the React frontend.
  - A Web Service for the Python/FastAPI backend.

The services are configured via the Render dashboard, with environment variables set for the GOOGLE\_API\_KEY (backend) and the VITE\_API\_URL (frontend) to link the two.

Future Ideas

  - Mood Detection from Text: Allow users to type how they feel instead of selecting an emoji.
  - Voice Input: Integrate the Web Speech Recognition API for a fully voice-controlled experience.
  - User Journals: Allow users to save their favorite generated stories to a personal, private journal.
  - Expanded Content: Add more output styles like "Haiku," "Fable," or "Affirmation."
