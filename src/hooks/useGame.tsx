import { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import { GameContextType } from '../types/game';

export default function useGame() {
  const value = useContext(GameContext) as GameContextType;
  if (value === undefined) {
    throw new Error('useGameState should be used within CorrectProvider');
  }
  return value;
}
