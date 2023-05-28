import { useContext } from 'react';
import { TimerContext } from '../context/TimerContext';
import { TimerContextType } from '../types/timer';

export default function useTimer() {
  const value = useContext(TimerContext) as TimerContextType;
  if (value === undefined) {
    throw new Error('useTimerState should be used within TimerProvider');
  }
  return value;
}
