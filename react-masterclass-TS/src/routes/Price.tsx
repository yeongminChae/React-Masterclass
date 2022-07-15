import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinTickers } from "./api";

const Container = styled.div`
  display: flex;
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.0784313725);
  margin-top: 20px;
  border-radius: 12px;
  color: ${(props) => props.theme.textColor};
  font-size: 18px;
  font-weight: 600;
  border: 1px solid ${(props) => props.theme.textColor}; ;
`;

const PriceInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 10px 0;
`;

interface PriceProps {
  coinId: string;
}
interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      percent_change_15m: number;
      percent_change_30m: number;
      percent_change_1h: number;
      percent_change_6h: number;
      percent_change_12h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_1y: number;
      percent_from_price_ath: number;
      market_cap_change_24h: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const Price = ({ coinId }: PriceProps) => {
  const { data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId),
    { refetchInterval: 900000 }
  );
  return (
    <Container>
      <PriceInfo>
        <span> 15 Mins </span>
        <span>{tickersData?.quotes.USD.percent_change_15m} %</span>
      </PriceInfo>
      <PriceInfo>
        <span> 30 Mins </span>
        <span>{tickersData?.quotes.USD.percent_change_30m} %</span>
      </PriceInfo>
      <PriceInfo>
        <span> 1 Hour </span>
        <span>{tickersData?.quotes.USD.percent_change_1h} %</span>
      </PriceInfo>
      <PriceInfo>
        <span> 6 Hours </span>
        <span>{tickersData?.quotes.USD.percent_change_6h} %</span>
      </PriceInfo>
      <PriceInfo>
        <span> 12 Hours </span>
        <span>{tickersData?.quotes.USD.percent_change_12h} %</span>
      </PriceInfo>
      <PriceInfo>
        <span> 24 Hours </span>
        <span>{tickersData?.quotes.USD.percent_change_24h} %</span>
      </PriceInfo>
      <PriceInfo>
        <span> 1 Week </span>
        <span>{tickersData?.quotes.USD.percent_change_7d} %</span>
      </PriceInfo>
      <PriceInfo>
        <span> 30 Days </span>
        <span>{tickersData?.quotes.USD.percent_change_30d} %</span>
      </PriceInfo>
      <PriceInfo>
        <span> 1 Year </span>
        <span>{tickersData?.quotes.USD.percent_change_1y} %</span>
      </PriceInfo>
    </Container>
  );
};

export default Price;
