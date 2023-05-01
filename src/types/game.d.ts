export type GameContextType = {
  game: boolean;
  answer: string;
  setAnswer: Dispatch<SetStateAction<string>>;
  startGame: () => void;
  endGame: () => void;
};
