import { useParams } from "react-router-dom";

interface Routeparams {
  coinId: string;
}

function Coin() {
  const { coinId } = useParams<Routeparams>();
  return <h1>Coin: {coinId} </h1>;
}

export default Coin;
