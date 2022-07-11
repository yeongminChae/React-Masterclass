import styled from "styled-components";

interface ContainerProps {
  bgColor: string;
  borderColor: string;
}

const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor};
  border-radius: 100px;
  border: 1px solid ${(props) => props.borderColor};
`;

interface CircleProps {
  bgColor: string;
  borderColor?: string; // '?' mean is optional
  text?: string;
}

function Circle({
  bgColor,
  borderColor,
  text = "this is default value",
}: CircleProps) {
  return (
    <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>
      {/* borderColor={borderColor ?? bgColor}  -> if there is no bordercolor's value , that color will be same with bgColor */}
      {text}
    </Container>
  );
}

export default Circle;
