import styled from 'styled-components';
import { useState } from 'react';
import { Button, Container, Input, Spinner, Text } from '@chakra-ui/react';
import useAnswer from './hooks/useAnswer';
import Instructor from './components/Instructor';
import useGuessWord from './hooks/useGuessWord';
import useGame from './hooks/useGame';

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
  const { guess_word, reset } = useGuessWord();
  const { game, endGame } = useGame();

  const { fetchStatus, data, refetch } = useAnswer({ guess_word, question });

  const onSubmitQuestion = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    refetch().then(() => {
      if (data?.valid) {
        endGame();
        reset();
      }
    });
  };
  // console.log(guess_word);
  console.log(fetchStatus);

  return (
    <Wrapper>
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
      ) : data ? (
        <Container bg="gray.100" padding="30px" borderRadius="10px">
          <Text>{data?.gpt_response}</Text>
        </Container>
      ) : null}
    </Wrapper>
  );
}

export default App;
