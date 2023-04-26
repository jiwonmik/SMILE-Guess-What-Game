from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from guess_question_gpt import getGuessGPTResponse

app = FastAPI()

origins = ["http://localhost:5173", "https://smile-question-prompter.vercel.app"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class GuessInput(BaseModel):
    target_word: str
    question: str


@app.post("/smile/smile-guess")
def guessPrompter(input: GuessInput):
    gpt_response = getGuessGPTResponse(input.guess_word, input.question)

    question_info = {
        "question": input.question,
        "valid": False,
        "gpt_response": gpt_response,
    }

    if input.guess_word in gpt_response:
        question_info["valid"] = True

    return question_info
