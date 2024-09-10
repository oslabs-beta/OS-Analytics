import ClickGraph from "./Charts/LineGraph-clicks";
import DuelPieGraphs from "./Charts/DuelPieChart-clicks";
import BarGraph from "./Charts/BarGraph-clicks";
import BarGraph_referrer from "./Charts/BarGraph-referrer";
import AiResponseComponent from "./Charts/aiResponse";
import { websiteDataAtom, websiteReferralDataAtom } from "../../state/Atoms";
import ScatterChart from "./Charts/ScatterChart-clicks";
import styles from "./Charts.module.css";
import { useAtom } from "jotai";
import { mapUserData } from "../../services/extractData";
import RadarChart from "./Charts/RadarGraph-clicks";
import StackedBarChart from "./Charts/StackedBarGraph-clicks";
import Heatmap from "./Charts/Heatmap";

const WebsiteData = () => {
  const [websiteData] = useAtom(websiteDataAtom);
  const allDataResponse = mapUserData(websiteData);
  const [webstiteRefferalData] = useAtom(websiteReferralDataAtom);
  return (
    <div className={styles.chartDisplay}>
      <BarGraph data={allDataResponse} keyword={"page_url"} />
      <ScatterChart data={allDataResponse} />
      <ClickGraph data={allDataResponse} />
      <DuelPieGraphs
        data={allDataResponse}
        keyword={"user_browser"}
        keywordTwo={"user_os"}
      />
      <RadarChart
        data={allDataResponse}
        keyword={"page_url"}
        keywordTwo={"user_browser"}
      />
      <StackedBarChart
        data={allDataResponse}
        keyword={"user_browser"}
        keywordTwo={"page_url"}
      />
      <BarGraph_referrer data={webstiteRefferalData} />
      <AiResponseComponent />
      <Heatmap data={allDataResponse}/>
    </div>
  );
};

export default WebsiteData;
