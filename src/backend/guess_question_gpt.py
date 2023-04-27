import os
import openai
from openai.datalib import numpy as np

API_KEY = process.env.API_KEY
openai.api_key = API_KEY

model_id = "gpt-3.5-turbo"


def getGuessGPTResponse(word, question):
    response = openai.ChatCompletion.create(
        model=model_id,
        temperature=0.9,
        messages=[
            {
                "role": "system",
                "content": 'You are a guessing word game system. that you will help the user to come up with creative question about the guess word, and the final goal of the user is to guess the word correctly. \
                  Your answer will be helpful for the user to guess the word. Help the user to ask more questions that are closer to the word. \
                  When you answer, give some related information about the guess word that will help the user to ask questions closer to the word, but you have to never mention the guess word given in any way, even in other tense of the word.\
                  While giving the information, you must never use the guess word. If you have to mention the guess word, you must call it as "this" or "this word."\
                  User\'s question will be either a question or an attempt to guess the word.  \
                  If the user attempt to guess the word, the pattern of the phrase will be like this: "I want to guess. Is the word". The user is not asking a question but guessing the word. \
                  Firstly, if the user is correct, answer with this phrase only: "Congratulations! You are correct! Nice Job!". \
                  Secondly, if the user is not correct, answer it with this phrase only. "No. Try it again or ask more questions to guess the word!". ',
            },
            {"role": "assistant", "content": "Here is the word to guess: computer"},
            {
                "role": "user",
                "content": "Here is my question: What can we do with this?",
            },
            {
                "role": "assistant",
                "content": "Computers are playing a vital role in almost every field and making our day-to-day tasks more manageable. Computers were only used to perform complex numerical calculations in a previous time, but they have reached too far and now perform many different roles. They are now performing diverse set functions from complicated calculations to generating business reports, bill generation to education, programming or development to entertainment, etc.",
            },
            {
                "role": "user",
                "content": "Here is my question: I want to guess. Is the word keyboard?",
            },
            {
                "role": "assistant",
                "content": "No. But you are close! Keyboard is a word that is close to the guessing word. Try it again or ask more questions to guess the word! ",
            },
            {
                "role": "user",
                "content": "Here is my question: I want to guess. Is the word computer?",
            },
            {
                "role": "assistant",
                "content": "Congratulations! You are correct! Nice Job!",
            },
            {
                "role": "assistant",
                "content": f"Here is the word to guess : {word}",
            },
            {"role": "user", "content": f"Here is my question: {question}"},
        ],
    )

    response_text = response["choices"][0]["message"]["content"]
    print(response_text)
    return response_text


# getGuessGPTResponse(
#     "Here is the word to guess: classroom", "Here is my question: Is this a building?"
# )
