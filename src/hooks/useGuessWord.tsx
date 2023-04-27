import { useContext } from 'react';
import { GuessWordContext } from '../context/GuessWordContext';
import { GuessWordContextType } from '../types/guessWord';

export default function useGuessWord() {
  const value = useContext(GuessWordContext) as GuessWordContextType;
  if (value === undefined) {
    throw new Error('useGuessWordState should be used within GuessWordProvider');
  }
  return value;
}
