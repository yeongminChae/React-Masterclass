import { useQuery } from "react-query";
import { fetchCoinHistory } from "./api";
import Apexchart from "react-apexcharts";

interface ChartProps {
  coinId: string;
}

interface IHisorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

const Candlestick = ({ coinId }: ChartProps) => {
  const { isLoading, data } = useQuery<IHisorical[]>(
    ["oplcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );
  return (
    <div>
      {isLoading ? (
        "Loading chart"
      ) : (
        <Apexchart
          series={[
            {
              name: "Price",
              data: data?.map((price) => Number(price.close)) ?? [],
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              type: "candlestick",
              height: 500,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            title: {
              text: "CandleStick Chart",
              align: "left",
            },
            xaxis: {
              type: "datetime",
            },
            yaxis: {
              tooltip: {
                enabled: true,
              },
            },
          }}
        />
      )}{" "}
    </div>
  );
};

export default Candlestick;
