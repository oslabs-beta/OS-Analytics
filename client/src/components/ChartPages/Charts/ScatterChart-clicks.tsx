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
import styles from '../Charts.module.css';  
import { filterDataByTimeFrame } from "../../../services/filterDataByTimeFrame ";
import { NoKeywordChart } from "../../../../types"
ChartJS.register(CategoryScale, LinearScale, PointElement, Tooltip, Legend);



const ScatterChart = ({ data }: NoKeywordChart) => {
  const [timeFrame] = useAtom(timeFrameAtom);


  const filteredData = filterDataByTimeFrame(data, timeFrame);

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
    <div className={styles.chartBox} style={{ padding: '20px', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom style={{ textAlign: 'center', fontSize:'20px', color: 'black' }}>
        Click Scatter Plot
      </Typography>
      <Scatter data={scatterData} options={options} />
    </div>
  );
};

export default ScatterChart;
