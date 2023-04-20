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
                "content": 'You are a guessing word game bot that will get an input for a word what user has to guess, and you will help the user to come up with creative question for guessing the word. \
                  Your answer will be helpful the user to guess the word, to ask more questions that are closer to the target word. \
                  Not just answer it simply, but mention some related information that will help the user to ask questions closer to the target word, \
                  but you must not mention the target word, since it is the user\'s task to guess the word\
                  If the user ask the question in this pattern, "Is this ~?" then the user is attempting to guess the word. \
                  So if the word is correct, answer it with this phrase: "Yes. You are correct! Nice Job!". \
                  If the user is not correct, answer it with this phrase. "No. Try it again or ask more questions to guess the word!". ',
            },
            {"role": "user", "content": "Here is the word to guess: computer"},
            {
                "role": "user",
                "content": "Here is my question: What can we do with this?",
            },
            {
                "role": "assistant",
                "content": "You are asking for the usage! Well, you can use this when you are programming. There is a lot of thing you can do with using this! ",
            },
            {
                "role": "user",
                "content": "Here is my question: Is this a keyboard?",
            },
            {
                "role": "assistant",
                "content": "No. But you are close! Keyboard is a word that is close to this word. Try it again or ask more questions to guess the word! ",
            },
            {
                "role": "user",
                "content": "Here is my question: Is this computer?",
            },
            {
                "role": "assistant",
                "content": "Yes. You are correct! Nice Job!",
            },
            {"role": "assistant", "content": target_word},
            {"role": "user", "content": question},
        ],
    )

    response_text = response["choices"][0]["message"]["content"]
    print(response_text)
    return response_text


# getGuessGPTResponse(
#     "Here is the word to guess: classroom", "Here is my question: Is this a building?"
# )
