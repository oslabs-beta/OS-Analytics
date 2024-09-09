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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data, keyword }: BarChartProps) => {
  const [timeFrame] = useAtom(timeFrameAtom);

  const filteredData = filterDataByTimeFrame(data, timeFrame);
  console.log(filteredData);
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
    "rgba(54, 162, 235, 0.8)",  
    "rgba(255, 99, 132, 0.8)",  
  ];

  const backgroundColors = labels.map((_, index) => colorPattern[index % colorPattern.length]);
  const borderColors = labels.map((_, index) => colorPattern[index % colorPattern.length].replace("0.8", "1"));

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Clicks",
        data: counts,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 3,
        borderRadius: 5,
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
        text: `Clicks Per ${keyword ==="page_url"? "Page URLS": "Website"}`,
        color: 'black',
        font: {
          weight: 400,
          size: 20
        }
      },
    },
  };

  return (
    <div className={styles.chartBox} style={{ padding: '20px', textAlign: 'center' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
