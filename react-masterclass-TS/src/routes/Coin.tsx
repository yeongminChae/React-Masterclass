import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

interface Routeparams {
  coinId: string;
}

interface RouteState {
  name: string;
}
function Coin() {
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams<Routeparams>();
  const { state } = useLocation<RouteState>();
  const [info, setInfo] = useState({});
  const [priceInfo, setPriceInfo] = useState({});
  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      setInfo(infoData);
      setPriceInfo(priceData);
    })();
  }, []);
  return (
    <Container>
      <Header>
        <Title>{state?.name || "Loading..."}</Title>
      </Header>
      {loading ? <Loader>Loading...</Loader> : <span>null</span>}
    </Container>
  );
}

export default Coin;
// coin id로 코인 받기 (Coins)
// https://api.coinpaprika.com/v1/coins/btc-bitcoin
// https://api.coinpaprika.com/#operation/getCoinById
// coin id로 특정 코인에 대한 시세 정보 얻기 (Tickers)
// https://api.coinpaprika.com/v1/tickers/btc-bitcoin
// https://api.coinpaprika.com/#operation/getTickersById
