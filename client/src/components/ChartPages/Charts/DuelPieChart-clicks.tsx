import { Pie, Doughnut } from "react-chartjs-2";
import { useAtom } from "jotai";
import { timeFrameAtom } from "../../../state/Atoms";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import styles from "../Charts.module.css";
import { filterDataByTimeFrame } from "../../../services/filterDataByTimeFrame ";
import { PieChartsProps } from "../../../../types";
import ChartDownload from "../ChartDownload";
import { useRef } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieCharts = ({ data, keyword, keywordTwo }: PieChartsProps) => {
  const [timeFrame] = useAtom(timeFrameAtom);
  const browserChartRef = useRef(null); 
  const osChartRef = useRef(null); 
  const filteredData = filterDataByTimeFrame(data, timeFrame);
  const browserCounts: { [key: string]: number } = {};
  const osCounts: { [key: string]: number } = {};

  filteredData.forEach((item) => {
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
        label: "Browsers",
        data: browserData,
        backgroundColor: [
          "rgba(0, 122, 255, 0.3)",
          "rgba(251, 188, 5, 0.3)",
          "rgba(0, 82, 204, 0.3)",
          "rgba(255, 69, 0, 0.3)",
        ],
        borderColor: [
          "rgba(0, 122, 255, 1)",
          "rgba(251, 188, 5,1",
          "rgba(0, 82, 204, 1)",
          "rgba(255, 69, 0, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const osChartData = {
    labels: osLabels,
    datasets: [
      {
        label: "Operating Systems",
        data: osData,
        backgroundColor: [
          "rgba(0, 122, 255, 0.3)",
          "rgba(251, 188, 5, 0.3)",
          "rgba(0, 82, 204, 0.3)",
          "rgba(255, 69, 0, 0.3)",
        ],
        borderColor: [
          "rgba(0, 122, 255, 1)",
          "rgba(251, 188, 5, 1)",
          "rgba(0, 82, 204, 1)",
          "rgba(255, 69, 0, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div
      className={styles.chartBox}
      style={{
        display: "flex",
        justifyContent: "space-around",
        padding: "20px",
      }}
    >
      <div style={{ width: "45%" }}>
        <h3
          style={{ color: "white", textAlign: "center", marginBottom: "20px" }}
        >
          User Browsers
        </h3>
        <Pie ref={osChartRef} data={osChartData} />
        <div style={{ marginLeft: "120px" }}>
          <ChartDownload chartRef={osChartRef} />
        </div>
      </div>

      <div style={{ width: "45%" }}>
        <h3
          style={{ color: "white", textAlign: "center", marginBottom: "20px" }}
        >
          User Operating Systems
        </h3>
        <Doughnut ref={browserChartRef} data={browserChartData} />
        <div style={{ marginLeft: "140px" }}>
          <ChartDownload chartRef={browserChartRef} />
        </div>
      </div>
    </div>
  );
};

export default PieCharts;
