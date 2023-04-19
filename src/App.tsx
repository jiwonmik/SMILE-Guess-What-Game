import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useState } from 'react';

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

const PrompterWrapper = styled.div`
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

function App() {
  const [guessWord, setGuessWord] = useState('');
  const [question, setQuestion] = useState('');

  const randomWordList = ['computer', 'classroom', 'school', 'language'];
  const generateRandomWord = () => {
    const randomWord = Math.floor(Math.random() * randomWordList.length);
    console.log(randomWordList[randomWord]);
    setGuessWord(randomWordList[randomWord]);
  };

  return (
    <Container>
      <GuessBox>
        {guessWord ? (
          <GuessWord>Now guess!</GuessWord>
        ) : (
          <RandomWordBtn onClick={() => generateRandomWord()}>Generate Random Word</RandomWordBtn>
        )}
      </GuessBox>
      <PrompterWrapper>
        <Prompter value={question} placeholder="Ask a question and guess what the word is!" />
        <PrompterBtn>Enter</PrompterBtn>
      </PrompterWrapper>
    </Container>
  );
}

export default App;
