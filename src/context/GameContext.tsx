import { createContext, useState } from 'react';
import { GameContextType } from '../types/game';

const GameContext = createContext<GameContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

const GameProvider = ({ children }: Props) => {
  const [game, setGame] = useState(false);

  const startGame = () => {
    setGame(false);
  };
  const endGame = () => {
    setGame(true);
  };

  return (
    <GameContext.Provider value={{ game, startGame, endGame }}>{children}</GameContext.Provider>
  );
};

export { GameContext, GameProvider };
