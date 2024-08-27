import { Scatter } from 'react-chartjs-2';
import { Typography } from '@mui/material';
import { useAtom } from 'jotai';
import { timeFrameAtom } from '../../../state/Atoms';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, Tooltip, Legend);

interface ScatterChartProps {
  data: any[];
}

const ScatterChart = ({ data }: ScatterChartProps) => {
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
      if (now.getMonth() === clickTime.getMonth() && now.getFullYear() === clickTime.getFullYear()) {
        filteredData.push(item);
      }
    } else {
      filteredData.push(item);
    }
  }

  const scatterData = {
    datasets: [
      {
        label: 'User Clicks',
        data: filteredData.map((item) => ({
          x: item.x_coord,
          y: item.y_coord,
        })),
        backgroundColor: 'rgba(75,192,192,0.6)',
        borderColor: 'rgba(75,192,192,1)',
        pointRadius: 5,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'X Coordinate',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Y Coordinate',
        },
        reverse: true
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div style={{ padding: '20px', margin: 'auto', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom style={{ textAlign: 'center' }}>
        Click Scatter Plot
      </Typography>
      <Scatter data={scatterData} options={options} />
    </div>
  );
};

export default ScatterChart;
