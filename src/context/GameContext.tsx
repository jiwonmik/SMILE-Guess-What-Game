import { createContext, useState } from 'react';
import { GameContextType } from '../types/game';

const GameContext = createContext<GameContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

const GameProvider = ({ children }: Props) => {
  const [game, setGame] = useState(false);
  const [answer, setAnswer] = useState('');

  const startGame = () => {
    setGame(false);
    setAnswer('');
  };
  const endGame = () => {
    setGame(true);
  };

  return (
    <GameContext.Provider value={{ game, answer, setAnswer, startGame, endGame }}>
      {children}
    </GameContext.Provider>
  );
};

export { GameContext, GameProvider };
