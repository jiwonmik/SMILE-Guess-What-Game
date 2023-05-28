import { createContext, useEffect, useState } from 'react';
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

  useEffect(() => {
    const timerFn = setInterval(() => {
      if (timer.seconds > 0) {
        setTimer((prev) => {
          return {
            ...prev,
            seconds: timer.seconds - 1,
          };
        });
      }
      if (timer.seconds == 0) {
        if (timer.minutes == 0) {
          clearInterval(timerFn);
          () => timerOff();
        } else {
          setTimer((prev) => {
            return {
              ...prev,
              minutes: timer.minutes - 1,
              seconds: 59,
            };
          });
        }
      }
    }, 1000);
    return () => clearInterval(timerFn);
  }, [timer.seconds]);

  const timerOn = (minutes: number, seconds: number) => {
    setTimer(() => {
      return {
        isOn: true,
        minutes: minutes,
        seconds: seconds,
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
