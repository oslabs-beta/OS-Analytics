import { Pie, Doughnut } from "react-chartjs-2";
import { useAtom } from "jotai";
import { timeFrameAtom } from '../../../state/Atoms';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import styles from '../Charts.module.css';
ChartJS.register(ArcElement, Tooltip, Legend);



const PieCharts = ({ data, keyword, keywordTwo }: any) => {
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

  const browserCounts: { [key: string]: number } = {};
  const osCounts: { [key: string]: number } = {};

  filteredData.forEach(item => {
    browserCounts[item[keyword]] = (browserCounts[item[keyword]] || 0) + 1;
    osCounts[item[keywordTwo]] = (osCounts[item[keywordTwo]] || 0) + 1;
  });

  const browserLabels = Object.keys(browserCounts);
  const browserData = Object.values(browserCounts);

  const osLabels = Object.keys(osCounts);
  const osData = Object.values(osCounts);

  const browserChartData = {
    labels: browserLabels,
    datasets: [
      {
        label: 'Browsers',
        data: browserData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.3)',
          'rgba(54, 162, 235, 0.3)',
          'rgba(255, 206, 86, 0.3)',
          'rgba(75, 192, 192, 0.3)',
          'rgba(153, 102, 255, 0.3)',
          'rgba(255, 159, 64, 0.3)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const osChartData = {
    labels: osLabels,
    datasets: [
      {
        label: 'Operating Systems',
        data: osData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.3)',
          'rgba(54, 162, 235, 0.3)',
          'rgba(255, 206, 86, 0.3)',
          'rgba(75, 192, 192, 0.3)',
          'rgba(153, 102, 255, 0.3)',
          'rgba(255, 159, 64, 0.3)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={styles.chartBox} style={{ display: 'flex', justifyContent: 'space-around', padding: '20px' }}>
      <div style={{ width: '45%' }}>
        <h3 style={{ color: 'white', textAlign: 'center', marginBottom: '20px' }}>User Browsers</h3>
        <Pie data={browserChartData} />
      </div>
      <div style={{ width: '45%' }}>
        <h3 style={{ color: 'white', textAlign: 'center', marginBottom: '20px' }}>User Operating Systems</h3>
        <Doughnut data={osChartData} />
      </div>
    </div>
  );
};

export default PieCharts;
