import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { getRandomWord } from './utils';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Container,
  Heading,
  Highlight,
  Input,
  Spinner,
  Text,
} from '@chakra-ui/react';
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
  height: 250px;
`;

const PrompterForm = styled.form`
  display: flex;
  flex-direction: row;
  padding: 20px;
`;

function App() {
  const [guess_word, setGuessWord] = useState('');
  const [question, setQuestion] = useState('');
  const [correct, setCorrect] = useState(false);

  const { isFetching, data, refetch } = useAnswer({ guess_word, question });

  const onSubmitQuestion = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    refetch().then(() => setCorrect(true));
  };

  const startGame = () => {
    setGuessWord(getRandomWord());
    setCorrect(false);
  };

  return (
    <Wrapper>
      <GuessBox>
        {correct ? (
          <>
            <Container centerContent>
              <Alert
                status="success"
                flexDir="column"
                width="400px"
                borderRadius="10px"
                marginBottom="20px"
                padding="30px"
              >
                <AlertIcon />
                <AlertTitle marginBottom="10px">You are correct!</AlertTitle>
                <AlertDescription>
                  <Highlight
                    query={guess_word}
                    styles={{
                      px: '2',
                      py: '1',
                      rounded: 'full',
                      bg: 'red.100',
                      fontWeight: 'bold',
                    }}
                  >
                    {'The word is ' + guess_word}
                  </Highlight>
                </AlertDescription>
              </Alert>
              <Button onClick={startGame}>Try with another word</Button>
            </Container>
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
        isFetching ? (
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
