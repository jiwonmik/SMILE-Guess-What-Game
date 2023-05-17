import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Button, Container, Input, Spinner, Text } from '@chakra-ui/react';
import useAnswer from './hooks/useAnswer';
import Instructor from './components/Instructor';
import useGuessWord from './hooks/useGuessWord';
import useGame from './hooks/useGame';
import Timer from './components/Timer';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const PrompterForm = styled.form`
  display: flex;
  flex-direction: row;
  padding: 20px;
`;

function App() {
  const [question, setQuestion] = useState('');
  const { guess_word } = useGuessWord();
  const { game, endGame, answer, setAnswer } = useGame();

  const { fetchStatus, data, refetch } = useAnswer({ guess_word, question });

  const onSubmitQuestion = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    refetch();
  };

  useEffect(() => {
    if (data?.valid) {
      endGame();
    }
    setAnswer(data?.gpt_response);
  }, [data]);

  return (
    <Wrapper>
      <Timer />
      <Instructor />
      <PrompterForm onSubmit={onSubmitQuestion}>
        <Input
          width="600px"
          height="60px"
          marginRight="10px"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question and guess what the word is!"
        />
        <Button colorScheme="red" w="80px" height="full" type="submit" disabled={game}>
          Enter
        </Button>
      </PrompterForm>
      {fetchStatus == 'fetching' ? (
        <Spinner />
      ) : answer ? (
        <Container bg="gray.100" padding="30px" borderRadius="10px">
          <Text>{answer}</Text>
        </Container>
      ) : null}
    </Wrapper>
  );
}

export default App;
