import { createContext, useState } from 'react';
import { GameContextType } from '../types/game';

const GameContext = createContext<GameContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

const GameProvider = ({ children }: Props) => {
  const [game, setGame] = useState(false);

  const start = () => {
    setGame(false);
  };
  const end = () => {
    setGame(true);
  };

  return <GameContext.Provider value={{ game, start, end }}>{children}</GameContext.Provider>;
};

export { GameContext, GameProvider };
