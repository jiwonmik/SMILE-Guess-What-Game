import { createContext, useState } from 'react';
import { TimerContextType } from '../types/timer';

const TimerContext = createContext<TimerContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

const initialState = {
  isOn: false,
  minutes: 0,
  seconds: 0,
};

const TimerProvider = ({ children }: Props) => {
  const [timer, setTimer] = useState(initialState);

  const timerOn = () => {
    setTimer((prev) => {
      return {
        ...prev,
        isOn: true,
      };
    });
  };
  const timerOff = () => {
    setTimer(() => initialState);
  };

  return (
    <TimerContext.Provider value={{ timer, timerOn, timerOff }}>{children}</TimerContext.Provider>
  );
};

export { TimerContext, TimerProvider };
