import { Bar } from "react-chartjs-2";
import { useAtom } from "jotai";
import { timeFrameAtom } from '../../../state/Atoms';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import styles from '../Charts.module.css';
import { filterDataByTimeFrame } from "../../../services/filterDataByTimeFrame ";
import { PieChartsProps } from "../../../../types";
import ChartDownload from "../ChartDownload";
import { useRef } from "react";
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const StackedBarChart = ({ data, keyword, keywordTwo }: PieChartsProps) => {
  const [timeFrame] = useAtom(timeFrameAtom);
  const chartRef = useRef(null);
  const filteredData = filterDataByTimeFrame(data, timeFrame);

  const osBrowserCounts: { [os: string]: { [browser: string]: number } } = {};

  filteredData.forEach(item => {
    const os = item[keywordTwo];
    const browser = item[keyword];

    if (!osBrowserCounts[os]) {
      osBrowserCounts[os] = {};
    }

    osBrowserCounts[os][browser] = (osBrowserCounts[os][browser] || 0) + 1;
  });

  const osLabels = Object.keys(osBrowserCounts);
  const browserLabels = Array.from(new Set(filteredData.map(item => item[keyword])));
  
  const browserColors: { [key: string]: string } = {
    Chrome: 'rgba(251, 188, 5, 0.5)',
    Firefox: 'rgba(255, 69, 0, 0.5)',  
    Safari: 'rgba(0, 122, 255, 0.5)', 
    Edge: 'rgba(0, 82, 204, 0.5)',    
  };
  
  

  const browserDatasets = browserLabels.map(browser => ({
    label: browser,
    data: osLabels.map(os => osBrowserCounts[os][browser] || 0),
    backgroundColor: browserColors[browser],
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderWidth: 1,
  }));

  const stackedBarChartData = {
    labels: osLabels,
    datasets: browserDatasets,
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  return (
    <div className={styles.chartBox} style={{ padding: '20px', margin: 'auto', textAlign: 'center' }}>

        <h3 style={{ color: 'white', textAlign: 'center', marginBottom: '20px' }}>Browser Usage by Operating System</h3>
        <Bar ref={chartRef} data={stackedBarChartData} options={options} />
        <div style={{ marginLeft: "620px" }}>
        <ChartDownload chartRef={chartRef} />
   
      </div>
    </div>
  );
};

export default StackedBarChart;
