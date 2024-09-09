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

const WebsiteData = () => {
  const [websiteData] = useAtom(websiteDataAtom);
  const allDataResponse = mapUserData(websiteData);
const [webstiteRefferalData] = useAtom(websiteReferralDataAtom)
  //console.log(allDataResponse);
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
 <BarGraph_referrer data={webstiteRefferalData} />
      <AiResponseComponent />
    </div>
  );
};

export default WebsiteData;
