import { Button } from '@chakra-ui/react';
import { useState } from 'react';
import styled from 'styled-components';
import useTimer from '../hooks/useTimer';

const VWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 200px;
  justify-content: space-between;
  padding: 10px;
`;

const HWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 170px;
  justify-content: space-between;
  padding: 10px;
`;

const TimerInput = styled.input`
  display: flex;
  border-width: 2px;
  border-radius: 8px;
  width: 65px;
  height: 60px;
  padding: 10px;
  font-size: 30px;
`;

const Text = styled.h2`
  display: flex;
  justify-content: center;
  font-size: 13px;
  margin-bottom: 5px;
  color: grey;
`;

const SetTimer = () => {
  const { timerOn } = useTimer();
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(3);

  const validateTime = (time: number) => {
    return time <= 60;
  };

  return (
    <>
      <VWrapper>
        <HWrapper>
          <TimerInput
            className="minutes"
            type="text"
            value={minutes < 10 ? `0${minutes}` : minutes}
            onChange={(e) => {
              if (validateTime(Number(e.target.value))) {
                setMinutes(Number(e.target.value));
              }
            }}
          />
          <Text>Minutes</Text>
        </HWrapper>
        <h1 style={{ display: 'flex', fontSize: 30, fontWeight: 800, marginTop: 15 }}>:</h1>
        <HWrapper>
          <TimerInput
            className="seconds"
            type="text"
            value={Number(seconds) < 10 ? `0${seconds}` : seconds}
            onChange={(e) => {
              if (validateTime(Number(e.target.value))) {
                setSeconds(Number(e.target.value));
              }
            }}
          />
          <Text>Seconds</Text>
        </HWrapper>
      </VWrapper>
      <Button colorScheme="red" w="80px" onClick={() => timerOn(minutes, seconds)}>
        START
      </Button>
    </>
  );
};

export default SetTimer;
