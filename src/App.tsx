import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { getOpenAIResponse } from './api/api';
import { IResBody } from './api/types';
import { getRandomWord } from './utils';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const GuessBox = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

const GuessWord = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RandomWordBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  font-size: 20px;
  width: 500px;
`;

const PrompterForm = styled.form`
  display: flex;
  flex-direction: row;
`;

const Prompter = styled(motion.input)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  width: 600px;
  height: 60px;
  margin-right: 10px;
  font-size: 20px;
`;

const PrompterBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  font-size: 20px;
`;

const Answer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;

function App() {
  const [guessWord, setGuessWord] = useState('');
  const [question, setQuestion] = useState('');
  const [gptAnswer, setGptAnswer] = useState<IResBody | null>(null);

  const onSubmitQuestion = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    getOpenAIResponse({ target_word: guessWord, question: question }).then((result) => {
      setGptAnswer({
        question: result.question,
        valid: result.valid,
        gpt_response: result.gpt_response,
      });
    });
  };

  const startGame = () => {
    setGuessWord(getRandomWord());
    setGptAnswer(null);
  };
  console.log(guessWord);

  return (
    <Container>
      <GuessBox>
        {gptAnswer?.valid ? (
          <>
            <GuessWord>Your correct! The word is {guessWord}</GuessWord>
            <RandomWordBtn onClick={startGame}>Try with another word</RandomWordBtn>
          </>
        ) : guessWord ? (
          <GuessWord>Now guess!</GuessWord>
        ) : (
          <RandomWordBtn onClick={startGame}>Generate Random Word</RandomWordBtn>
        )}
      </GuessBox>
      <PrompterForm onSubmit={onSubmitQuestion}>
        <Prompter
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question and guess what the word is!"
        />
        <PrompterBtn>Enter</PrompterBtn>
      </PrompterForm>
      <Answer>{gptAnswer?.gpt_response}</Answer>
    </Container>
  );
}

export default App;
