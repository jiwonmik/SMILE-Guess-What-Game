import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { getRandomWord } from './utils';
import { Button, Container, Heading, Input, Spinner, Text } from '@chakra-ui/react';
import useAnswer from './hooks/useAnswer';

const Wrapper = styled.div`
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

const PrompterForm = styled.form`
  display: flex;
  flex-direction: row;
  padding: 20px;
`;

function App() {
  const [guess_word, setGuessWord] = useState('');
  const [question, setQuestion] = useState('');

  const { fetchStatus, data, refetch } = useAnswer({ guess_word, question });

  const onSubmitQuestion = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    refetch();
  };

  const startGame = () => {
    setGuessWord(getRandomWord());
  };

  return (
    <Wrapper>
      <GuessBox>
        {data?.valid ? (
          <>
            <GuessWord>Your correct! The word is {guess_word}</GuessWord>
            <Button onClick={startGame}>Try with another word</Button>
          </>
        ) : guess_word ? (
          <Heading>Now guess!</Heading>
        ) : (
          <Button onClick={startGame}>Generate Random Word</Button>
        )}
      </GuessBox>
      <PrompterForm onSubmit={onSubmitQuestion}>
        <Input
          width="600px"
          height="60px"
          marginRight="10px"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question and guess what the word is!"
        />
        <Button colorScheme="red" w="80px" height="full" type="submit">
          Enter
        </Button>
      </PrompterForm>
      {data ? (
        fetchStatus == 'fetching' ? (
          <Spinner />
        ) : (
          <Container bg="gray.100" padding="30px" borderRadius="10px">
            <Text>{data?.gpt_response}</Text>
          </Container>
        )
      ) : null}
    </Wrapper>
  );
}

export default App;
