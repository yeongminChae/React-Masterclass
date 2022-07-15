import { useQuery } from "react-query";
import { fetchCoinHistory } from "./api";
import Apexchart from "react-apexcharts";
import { themeAtom } from "../Atoms";
import { useRecoilValue } from "recoil";

interface ChartProps {
  coinId: string;
}

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

interface ICandleChartItem {
  x: Date;
  y: number[];
}

const Candlestick = ({ coinId }: ChartProps) => {
  const isDark = useRecoilValue(themeAtom);
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <Apexchart
          type="candlestick"
          series={[
            {
              name: "Price",
              data: data?.map((price) => {
                return {
                  x: new Date(price.time_open * 1000),
                  y: [
                    parseFloat(price.open),
                    parseFloat(price.high),
                    parseFloat(price.low),
                    parseFloat(price.close),
                  ],
                };
              }) as ICandleChartItem[],
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              type: "candlestick",
              height: 350,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            title: {
              text: "Candlestick Chart",
              align: "left",
              style: {
                color: "#54BAB9",
              },
            },
            stroke: {
              curve: "smooth",
              width: 2,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              labels: {
                show: false,
                datetimeFormatter: { month: "mmm 'yy" },
                style: {
                  colors: "#9c88ff",
                },
              },
              axisTicks: { show: false },
              axisBorder: { show: false },
              type: "datetime",
              categories:
                data?.map((price) => Number(price.time_close * 1000)) ?? [],
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#3C90EB",
                  downward: "#DF7D46",
                },
              },
            },
            tooltip: {
              y: {
                formatter: (value) => `${value.toFixed(2)}$`,
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default Candlestick;
