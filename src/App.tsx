import styled from 'styled-components';
import Instructor from './components/Instructor';
import Timer from './components/Timer';
import GameContainer from './components/GameContainer';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

function App() {
  return (
    <Wrapper>
      <Timer />
      <Instructor />
      <GameContainer />
    </Wrapper>
  );
}

export default App;
