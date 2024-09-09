import { Line } from "react-chartjs-2";
import { Typography } from "@mui/material";
import { useAtom } from "jotai";
import styles from "../Charts.module.css";
import { timeFrameAtom } from "../../../state/Atoms";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { useRef } from "react";
import { filterDataByTimeFrame } from "../../../services/filterDataByTimeFrame ";
import { NoKeywordChart } from "../../../../types";
import ChartDownload from "../ChartDownload";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ClickGraph = ({ data }: NoKeywordChart) => {
  const [timeFrame] = useAtom(timeFrameAtom);
  const filteredData = filterDataByTimeFrame(data, timeFrame);
  const chartRef = useRef(null);
  const aggregatedData: { [key: string]: number } = {};

  const formatDate = (date: Date, options: Intl.DateTimeFormatOptions) =>
    date.toLocaleDateString("en-US", options);

  for (let i = 0; i < filteredData.length; i++) {
    const curr = filteredData[i];
    const clickTime = new Date(curr.time || 0);

    let timeKey = "";

    switch (timeFrame) {
      case "1 day":
        timeKey = `${clickTime.getHours()}:00`;
        break;
      case "1 week":
        timeKey = formatDate(clickTime, { weekday: "short" });
        break;
      case "1 month":
        timeKey = formatDate(clickTime, { month: "short", day: "numeric" });
        break;
      case "1 year":
        timeKey = `${clickTime.getMonth() + 1}/${clickTime.getFullYear()}`;
        break;
      case "5 years":
        timeKey = `${clickTime.getFullYear()}`;
        break;
      case "allTime":
        timeKey = formatDate(clickTime, { month: "short", year: "numeric" });
        break;
      default:
        timeKey = clickTime.toISOString();
        break;
    }

    if (aggregatedData[timeKey]) {
      aggregatedData[timeKey] += 1;
    } else {
      aggregatedData[timeKey] = 1;
    }
  }

  const chartData = {
  
    labels: Object.keys(aggregatedData),
    datasets: [
      {
        label: `Clicks over the selected timeframe`,
        data: Object.values(aggregatedData),
        fill: true,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          maxTicksLimit: timeFrame === "allTime" || "1 month" ? 7 : undefined,
          autoSkip: true,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div
      className={styles.chartBox}
      style={{ padding: "20px", margin: "auto", textAlign: "center" }}
    >
      <Typography variant="h4" gutterBottom style={{ textAlign: "center" }}>
        Click Data Overview
      </Typography>
      <Line ref={chartRef} data={chartData} options={chartOptions} />
      <div style={{ marginLeft: "620px" }}>
        <ChartDownload chartRef={chartRef} />
      </div>
    </div>
  );
};

export default ClickGraph;
