export interface ITimer {
  isOn: boolean;
  minutes: number;
  seconds: number;
}

export type TimerContextType = {
  timer: ITimer;
  timerOn: () => void;
  timerOff: () => void;
};
