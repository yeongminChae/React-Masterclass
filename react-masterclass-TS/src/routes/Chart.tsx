import { useQuery } from "react-query";
import { fetchCoinHistory } from "./api";
import Apexchart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { themeAtom } from "../Atoms";
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

function Chart({ coinId }: ChartProps) {
  const isDark = useRecoilValue(themeAtom);
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
          type="line"
          series={[
            {
              name: "Price",
              data: data?.map((price) => Number(price.close)) ?? [],
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              height: 500,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: {
              show: false,
            },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            title: {
              text: "Line Chart (Overview) ",
              align: "left",
              style: {
                color: "#54BAB9",
              },
            },
            yaxis: { show: false },
            xaxis: {
              labels: {
                show: false,
                datetimeFormatter: { month: "mmm 'yy" },
              },
              axisTicks: { show: false },
              axisBorder: { show: false },
              type: "datetime",
              categories:
                data?.map((price) => Number(price.time_close * 1000)) ?? [],
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
            },
            colors: ["#0fbcf9"],
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(2)}`,
              },
            },
          }}
        />
      )}{" "}
    </div>
  );
}

export default Chart;
