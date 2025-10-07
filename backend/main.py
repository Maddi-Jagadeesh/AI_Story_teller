# main.py
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain_google_genai import ChatGoogleGenerativeAI

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

try:
    # Change it to THIS new, correct line
    llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash", temperature=0.8)
except Exception as e:
    print(f"Error initializing LLM: {e}")
    llm = None

prompt = PromptTemplate(
    input_variables=["emotion", "desc", "style"],
    template="""
    You are an empathetic AI storyteller. Your goal is to generate a creative piece
    that matches the user's emotional state.

    Based on the user's emotion, create a short {style} that comforts, motivates,
    or resonates with them. The output should be under 200 words and end on a
    positive or hopeful note.

    **Emotion:** {emotion}
    **User's thoughts (optional):** {desc}

    **Instructions:**
    1.  Generate a creative title.
    2.  Generate the content of the {style}.
    3.  Format your entire response using these markers:
        TITLE: [Your Title Here]
        CONTENT: [Your Content Here]

    Begin your response now.
    """
)

class StoryRequest(BaseModel):
    emotion: str
    desc: str
    style: str

@app.post("/api/generate")
async def generate_story(request: StoryRequest):
    if llm is None:
        return {"error": "LLM not initialized. Check your API key and configuration."}

    chain = LLMChain(prompt=prompt, llm=llm)

    try:
        # Run the LangChain chain
        raw_result = chain.run(
            emotion=request.emotion,
            desc=request.desc if request.desc else "No specific thoughts provided.",
            style=request.style
        )

        
        title = "A Spark of Hope" # Default title
        content = raw_result # Default content

        if "TITLE:" in raw_result and "CONTENT:" in raw_result:
            parts = raw_result.split("CONTENT:")
            title_part = parts[0].replace("TITLE:", "").strip()
            content_part = parts[1].strip()
            title = title_part
            content = content_part

        return {"title": title, "content": content}

    except Exception as e:
        return {"error": f"An error occurred: {str(e)}"}

@app.get("/")
def read_root():
    return {"message": "AI Emotional Storyteller Backend is running!"}