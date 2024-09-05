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

import { filterDataByTimeFrame } from '../../../services/filterDataByTimeFrame ';
import { NoKeywordChart } from "../../../../types";

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

  const aggregatedData: { [key: string]: number } = {};

  for (let i = 0; i < filteredData.length; i++) {
    const curr = filteredData[i];
    const clickTime = new Date(curr.time || 0);

    let timeKey = '';

    switch (timeFrame) {
      case '1 day':
        timeKey = `${clickTime.getHours()}:00`;
        break;
      case '1 month':
        timeKey = `Day ${clickTime.getDate()}`;
        break;
      case '1 year':
        timeKey = `${clickTime.getMonth() + 1}/${clickTime.getFullYear()}`;
        break;
      case '5 years':
        timeKey = `${clickTime.getFullYear()}`;
        break;
      case 'allTime':
        timeKey = `${clickTime.getMonth() + 1}/${clickTime.getFullYear()}`;
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
