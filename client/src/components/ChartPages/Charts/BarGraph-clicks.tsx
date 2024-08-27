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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data, keyword }: any) => {
  const [timeFrame] = useAtom(timeFrameAtom);

  const filteredData = [];

  const now = new Date();
  
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const clickTime = new Date(item.time);
  
    if (timeFrame === "24hours") {
      if (now.getTime() - clickTime.getTime() <= 24 * 60 * 60 * 1000) {
        filteredData.push(item);
      }
    } else if (timeFrame === "month") {
      if (now.getMonth() === clickTime.getMonth() && now.getFullYear() === clickTime.getFullYear()) {
        filteredData.push(item);
      }
    } else {
      filteredData.push(item);
    }
  }

  const websiteCounts: { [key: string]: number } = {};

  filteredData.forEach((item: any) => {
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
        text: "Clicks Per Website",
        color: 'white',
        font: {
          size: 20
        }
      },
    },
  };

  return (
    <div style={{ padding: '20px', margin: 'auto', textAlign: 'center' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
