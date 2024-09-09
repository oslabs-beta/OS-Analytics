import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useAtom } from "jotai";
import { timeFrameAtom } from '../../../state/Atoms';
import styles from '../Charts.module.css'
import { filterDataByTimeFrame } from "../../../services/filterDataByTimeFrame ";
import { BarChartProps } from "../../../../types"
import ChartDownload from "../ChartDownload";
import { useRef } from "react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data, keyword }: BarChartProps) => {
  const chartRef = useRef(null);
  const [timeFrame] = useAtom(timeFrameAtom);

  const filteredData = filterDataByTimeFrame(data, timeFrame);
  const websiteCounts: { [key: string]: number } = {};

  filteredData.forEach(item => {
    if (websiteCounts[item[keyword]]) {
      websiteCounts[item[keyword]] += 1;
    } else {
      websiteCounts[item[keyword]] = 1;
    }
  });

  const labels = Object.keys(websiteCounts);
  const counts = Object.values(websiteCounts);

  const colorPattern = [
    "rgba(54, 162, 235, 0.2)",  
    "rgba(255, 99, 132, 0.2)",  
  ];

  const backgroundColors = labels.map((_, index) => colorPattern[index % colorPattern.length]);
  const borderColors = labels.map((_, index) => colorPattern[index % colorPattern.length].replace("0.2", "1"));

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Clicks",
        data: counts,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `Clicks per ${keyword ==="page_url"? "Page URLS": "Website"}`,
        color: 'white',
        font: {
          size: 20
        }
      },
    },
  };

  return (
    <div className={styles.chartBox} style={{ padding: '20px', margin: 'auto', textAlign: 'center' }}>
      <Bar ref={chartRef} data={chartData} options={options} />
      <div style={{ marginLeft: "620px" }}>
        <ChartDownload chartRef={chartRef} />
      </div>
    </div>
  );
};

export default BarChart;
