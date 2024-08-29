import { Line } from 'react-chartjs-2';
import { Typography } from '@mui/material';
import { useAtom } from 'jotai';
import styles from '../Charts.module.css';
import { timeFrameAtom } from '../../../state/Atoms';
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
} from 'chart.js';

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

interface ClickGraphProps {
  data: any[];
}

const ClickGraph = ({ data }: ClickGraphProps) => {
  const [timeFrame] = useAtom(timeFrameAtom);

  const filteredData = [];

  const now = new Date();

  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const clickTime = new Date(item.time);

    if (timeFrame === '24hours') {
      if (now.getTime() - clickTime.getTime() <= 24 * 60 * 60 * 1000) {
        filteredData.push(item);
      }
    } else if (timeFrame === 'month') {
      if (
        now.getMonth() === clickTime.getMonth() &&
        now.getFullYear() === clickTime.getFullYear()
      ) {
        filteredData.push(item);
      }
    } else {
      filteredData.push(item);
    }
  }

  const aggregatedData: { [array: string]: number } = {};

  for (let i = 0; i < filteredData.length; i++) {
    const curr = filteredData[i];
    const clickTime = new Date(curr.time);

    let timeKey;
    if (timeFrame === '24hours') {
      timeKey = clickTime.getHours();
    } else {
      timeKey = clickTime.getDate();
    }

    if (aggregatedData[timeKey]) {
      aggregatedData[timeKey] += 1;
    } else {
      aggregatedData[timeKey] = 1;
    }
  }

  const chartData = {
    labels: Object.keys(aggregatedData).map((key) =>
      timeFrame === '24hours' ? `${key}:00` : `Day ${key}`
    ),
    datasets: [
      {
        label: `Clicks in the last ${
          timeFrame === '24hours' ? '24 hours' : 'month'
        }`,
        data: Object.values(aggregatedData),
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className={styles.chartBox} style={{ padding: '20px', margin: 'auto', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom style={{ textAlign: 'center' }}>
        Click Data Overview
      </Typography>
      <Line data={chartData} />
    </div>
  );
};

export default ClickGraph;
