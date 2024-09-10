import { useRef } from 'react';
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
import { NoKeywordChart } from "../../../../types";
import ChartDownload from '../ChartDownload';

ChartJS.register(CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const ScatterChart = ({ data }: NoKeywordChart) => {
  const [timeFrame] = useAtom(timeFrameAtom);
  const chartRef = useRef(null); 

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
        min: 0,
        max: 1,
        title: {
          display: true,
          text: 'X Coordinate (0-1)',
        },
      },
      y: {
        min: 0,
        max: 1, 
        reverse: true, 
        title: {
          display: true,
          text: 'Y Coordinate (0-1)',
        },
      },
    },
  };

  return (
    <div className={styles.chartBox} style={{ padding: '20px', margin: 'auto', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom style={{ textAlign: 'center' }}>
        Click Scatter Plot
      </Typography>
      <Scatter ref={chartRef} data={scatterData} options={options} />
      <div style={{ marginLeft: "620px" }}>
        <ChartDownload chartRef={chartRef} />
      </div>
    </div>
  );
};

export default ScatterChart;
