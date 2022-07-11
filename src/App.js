import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
  display: flex;
`;
const rotateAnimation = keyframes`
  0% {
    transform:rotate(0deg);
    border-radius:0px
  }
  50%{
    transform:rotate(360deg);
    border-radius:100px
  }
  100% {
    transform:rotate(0deg);
    border-radius:0px
  }
`;
const Box = styled.div`
  height: 200px;
  width: 200px;
  background-color: tomato;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${rotateAnimation} 2s linear infinite;
  span {
    //select the span inside of Box
    font-size: 30px;
    &:hover {
      font-size: 40px;
    }
    &:active {
      opacity: 0;
    }
  }
`;

function App() {
  return (
    <Wrapper>
      <Box>
        <span>😂</span>
      </Box>
    </Wrapper>
  );
}

export default App;
