import styled, { keyframes } from "styled-components";

const Title = styled.h1`
  color: tomato;
  &:hover {
    color: teal;
  }
`;

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  /* h1 {
    color: tomato;
    &:hover {
      color: teal;
    }
  } */
  ${Title}:hover {
    font-size: 99px;
  }
`;

const Box = styled.div`
  background-color: ${(props) => props.bgColor};
  width: 100px;
  height: 100px;
`;

const Circle = styled(Box)`
  border-radius: 50px;
`;

const Btn = styled.button`
  color: tomato;
`;

const Input = styled.input.attrs({ required: true, maxLength: 10 })`
  background-color: tomato;
`;

const anim = keyframes`
  from {
    color: tomato;
  }
  to {
    color: teal;
  }
`;
const BtnAnim = styled.button`
  animation: ${anim} 0.5s infinite;
`;

function App() {
  return (
    <Wrapper>
      {/* <Box bgColor="teal" />
      <Circle bgColor="tomato" /> */}
      {/* <Btn>Log In</Btn>
      <Btn as="a" href="/">
        Go home
      </Btn> */}
      {/* <Input />
      <Input />
      <Input /> */}
      {/* <BtnAnim>hello</BtnAnim> */}
      <Title>Hello to Super Recap</Title>
    </Wrapper>
  );
}

export default App;
