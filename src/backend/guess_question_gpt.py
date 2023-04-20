import os
import openai
from openai.datalib import numpy as np

API_KEY = process.env.API_KEY
openai.api_key = API_KEY

model_id = "gpt-3.5-turbo"


def getGuessGPTResponse(target_word, question):
    response = openai.ChatCompletion.create(
        model=model_id,
        messages=[
            {
                "role": "system",
                "content": 'You are a guessing word game bot that will get an input for a target word what user has to guess, and you will help the user to come up with creative question for guessing the word. \
                  Your answer will be helpful the user to guess the word, to ask more questions that are closer to the target word. \
                  For answering the question, mention some related information about the word that will help the user to ask questions closer to the target word, but never mention the target word itself in any way.\
                  While giving the information, you never must not use the target word.\
                  User will ask a question for guessing the word or attempt to guess the word.  \
                  If the question starts with this pattern -  "I want to guess. Is this ~?", than the user is not asking a question but guessing the word. Than you have to answer between two types as following description. \
                  If the word user is guessing is the same word with the target word, in other word,s if the user is correct, answer it with this phrase only: "Yes. You are correct! Nice Job!". \
                  If the user is not correct, answer it with this phrase. "No. Try it again or ask more questions to guess the word!". ',
            },
            {"role": "user", "content": "Here is the target word to guess: computer"},
            {
                "role": "user",
                "content": "Here is my question: What can we do with this?",
            },
            {
                "role": "assistant",
                "content": "Well, you can use this when you are programming. There is a lot of thing you can do with using this! ",
            },
            {
                "role": "user",
                "content": "Here is my question: I want to guess. Is this keyboard?",
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
                "content": "Yes. You are correct! Nice Job!",
            },
            {
                "role": "assistant",
                "content": f"Here is the target word to guess {target_word}",
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
