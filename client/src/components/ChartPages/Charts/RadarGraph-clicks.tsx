import { Radar } from "react-chartjs-2";
import { useAtom } from "jotai";
import { timeFrameAtom } from '../../../state/Atoms';
import {
  Chart as ChartJS,
  RadarController,
  Tooltip,
  Legend,
  RadialLinearScale,
} from "chart.js";
import styles from '../Charts.module.css';
import { filterDataByTimeFrame } from "../../../services/filterDataByTimeFrame ";
import { RadarChartProps } from "../../../../types";
import ChartDownload from "../ChartDownload";
import { useRef } from "react";
ChartJS.register(RadarController, Tooltip, Legend, RadialLinearScale);

const RadarChart = ({ data, keyword, keywordTwo }: RadarChartProps) => {
  const [timeFrame] = useAtom(timeFrameAtom);
  const chartRef = useRef(null);

  const browserLabels = ["Chrome", "Firefox", "Safari", "Edge"];

  const filteredData = filterDataByTimeFrame(data, timeFrame);

  
  const websiteBrowserCounts: { [website: string]: { [browser: string]: number } } = {};

  filteredData.forEach(item => {
    const website = item[keyword];
    const browser = item[keywordTwo]; 

    if (!websiteBrowserCounts[website]) {
      websiteBrowserCounts[website] = { Chrome: 0, Firefox: 0, Safari: 0, Edge: 0 };
    }

    if (browserLabels.includes(browser)) {
      websiteBrowserCounts[website][browser] += 1;
    }
  });

  const datasets = Object.keys(websiteBrowserCounts).map(website => ({
    label: website,
    data: browserLabels.map(browser => websiteBrowserCounts[website][browser] || 0),
    backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`,
    borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
    borderWidth: 1,
  }));

 
  const radarChartData = {
    labels: browserLabels, 
    datasets, 
  };

  return (
    <div className={styles.chartBox} style={{ padding: '20px', margin: 'auto', textAlign: 'center' }}>
   
        <h3 style={{ color: 'black', textAlign: 'center', marginBottom: '20px' }}>Website Clicks by Browser</h3>
        <Radar ref={chartRef} data={radarChartData} />
        <div style={{ justifyContent: 'center' }}>
        <ChartDownload chartRef={chartRef} />
   
      </div>
      </div>
      
 
  );
};

export default RadarChart;
