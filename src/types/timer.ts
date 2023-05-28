export interface ITimer {
  isOn: boolean;
  minutes: number;
  seconds: number;
}

export type TimerContextType = {
  timer: ITimer;
  timerOn: (minutes: number, seconds: number) => void;
  timerOff: () => void;
};
