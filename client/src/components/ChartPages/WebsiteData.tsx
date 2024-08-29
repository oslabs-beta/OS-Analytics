import ClickGraph from "./Charts/LineGraph-clicks";
import DuelPieGraphs from "./Charts/DuelPieChart-clicks";
import BarGraph from "./Charts/BarGraph-clicks";
import TimeFrameDropdown from "./TimeFrameDropdown";
import AiResponseComponent from "./Charts/aiResponse";
import {websiteDataAtom } from '../../state/Atoms';
import ScatterChart from "./Charts/ScatterChart-clicks";
import styles from './Charts.module.css'
import { useAtom } from 'jotai';

const ClickDataVisualization = () => {
    const [websiteData] = useAtom(websiteDataAtom);


  const extractBrowserAndOS = (userAgent: any) => {
    let browser = "Unknown Browser";
    let os = "Unknown OS";

    if (userAgent.includes("Chrome")) {
      browser = "Chrome";
    } else if (userAgent.includes("Firefox")) {
      browser = "Firefox";
    } else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
      browser = "Safari";
    } else if (userAgent.includes("Edge")) {
      browser = "Edge";
    }

    if (userAgent.includes("Windows NT 10.0")) {
      os = "Windows 10";
    } else if (userAgent.includes("Windows NT 6.1")) {
      os = "Windows 7";
    } else if (userAgent.includes("Mac OS X")) {
      os = "macOS";
    } else if (userAgent.includes("Linux")) {
      os = "Linux";
    }

    return { browser, os };
  };

  const allDataResponse = websiteData.map((query: any) => {
    const { browser, os } = extractBrowserAndOS(query.user_browser);

    return {
      element: query.element,
      dataset_id: query.dataset_id,
      x_coord: query.x_coord,
      y_coord: query.y_coord,
      time: query.created_at,
      user_browser: browser,
      website: query.website_name,
      user_os: os,
      page_url: query.page_url,
    };
  });

  //console.log(allDataResponse);
  return (
    <div className={styles.chartDisplay}>
        <TimeFrameDropdown />
        <BarGraph data={allDataResponse} keyword={"page_url"} />
        <ScatterChart data={allDataResponse} />
      <ClickGraph data={allDataResponse} />
      <DuelPieGraphs
        data={allDataResponse}
        keyword={"user_browser"}
        keywordTwo={"user_os"}
      />
      
      <AiResponseComponent />
    </div>
  );
};

export default ClickDataVisualization;
