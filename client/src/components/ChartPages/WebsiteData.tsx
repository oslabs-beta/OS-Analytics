import ClickGraph from "./Charts/LineGraph-clicks";
import DuelPieGraphs from "./Charts/DuelPieChart-clicks";
import BarGraph from "./Charts/BarGraph-clicks";
import TimeFrameDropdown from "./TimeFrameDropdown";
import AiResponseComponent from "./Charts/aiResponse";
import { websiteDataAtom } from "../../state/Atoms";
import ScatterChart from "./Charts/ScatterChart-clicks";
import styles from "./Charts.module.css";
import { useAtom } from "jotai";
import { mapUserData } from "../../services/extractData";

const ClickDataVisualization = () => {
  const [websiteData] = useAtom(websiteDataAtom);
  const allDataResponse = mapUserData(websiteData);

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
