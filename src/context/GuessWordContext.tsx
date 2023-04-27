import { createContext, useState } from 'react';
import { getRandomWord } from '../utils';
import { GuessWordContextType } from '../types/guessWord';

const GuessWordContext = createContext<GuessWordContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

const GuessWordProvider = ({ children }: Props) => {
  const [guess_word, setGuessWord] = useState('');

  const generate = () => {
    setGuessWord(getRandomWord());
  };
  const reset = () => {
    setGuessWord('');
  };

  return (
    <GuessWordContext.Provider value={{ guess_word, generate, reset }}>
      {children}
    </GuessWordContext.Provider>
  );
};

export { GuessWordContext, GuessWordProvider };
