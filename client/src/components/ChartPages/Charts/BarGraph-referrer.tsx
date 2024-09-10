import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { useAtom } from "jotai";
import { timeFrameAtom } from '../../../state/Atoms';
import styles from '../Charts.module.css';
import { filterReferralDataByTimeFrame } from "../../../services/filterDataByReferralTimeFrame";
import { referralBarChartProps } from "../../../../types";
import ChartDownload from "../ChartDownload";
import { useRef } from "react";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data }: referralBarChartProps) => {
    const chartRef = useRef(null);
  const [timeFrame] = useAtom(timeFrameAtom);
  const filteredData = filterReferralDataByTimeFrame(data, timeFrame);
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

  const options: ChartOptions<'bar'>= {
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
        text: "Top referrals",
        color: 'white',
        font: {
          size: 20
        }
      },
    },
  };

  return (
    <div>
      
 
    <div className={styles.chartBox} style={{ padding: '20px', margin: 'auto', textAlign: 'center' }}>

        <Bar ref={chartRef} data={chartData} options={options} />
        <div style={{ marginLeft: "620px" }}>
        <ChartDownload chartRef={chartRef} />
      </div>
          </div> 
    </div>
  );
};

export default BarChart;
