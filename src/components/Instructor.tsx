import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Container,
  Heading,
  Highlight,
} from '@chakra-ui/react';

import useGame from '../hooks/useGame';
import useGuessWord from '../hooks/useGuessWord';

const GuessBox = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 250px;
`;

function Instructor() {
  const { guess_word, generate } = useGuessWord();
  const { game, start } = useGame();

  const startGame = () => {
    generate();
    start();
  };

  return (
    <GuessBox>
      {game ? (
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
  );
}

export default Instructor;