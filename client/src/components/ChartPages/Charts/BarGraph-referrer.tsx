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
import styles from '../Charts.module.css';
import { filterReferralDataByTimeFrame } from "../../../services/filterDataByReferralTimeFrame";
import { referralBarChartProps } from "../../../../types";
import { BorderAllRounded } from "@mui/icons-material";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data }: referralBarChartProps) => {
  const [timeFrame] = useAtom(timeFrameAtom);
  console.log(data);
  const filteredData = filterReferralDataByTimeFrame(data, timeFrame);
  console.log(filteredData);
  const websiteCounts: { [key: string]: number } = {};

  filteredData.forEach(item => {
    if (websiteCounts[item.referrer]) {
      websiteCounts[item.referrer] += 1;
    } else {
      websiteCounts[item.referrer] = 1;
    }
  });


  const sortedReferrals = Object.entries(websiteCounts)
    .sort(([, countA], [, countB]) => countB - countA) 
    .slice(0, 8); 
  console.log(sortedReferrals);


  const labels = sortedReferrals.map(([referrer]) => referrer);
  const counts = sortedReferrals.map(([, count]) => count);

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
        label: "Referrals",
        data: counts,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 3,
        borderRadius: 5,
      },
    ],
  };

  const options :any= {
    indexAxis: 'y',
    scales: {
      x: {
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
        text: "Top 8 Referrals",
        color: 'white',
        font: {
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
