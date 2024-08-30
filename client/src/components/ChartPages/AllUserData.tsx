import ClickGraph from "./Charts/LineGraph-clicks";
import DuelPieGraphs from "./Charts/DuelPieChart-clicks";
import BarGraph from "./Charts/BarGraph-clicks";
import AiResponseComponent from "./Charts/aiResponse";
import { userDataAtom } from "../../state/Atoms";
import { useAtom } from "jotai";
import styles from "./Charts.module.css";
import { mapUserData } from '../../services/extractData';
const ClickDataVisualization = () => {
  const [userData] = useAtom(userDataAtom); 
  const mappedData = mapUserData(userData)

  return (
    <div className={styles.chartDisplay}>
      <ClickGraph data={mappedData} />
      <DuelPieGraphs
        data={mappedData}
        keyword={"user_browser"}
        keywordTwo={"user_os"}
      />
      <BarGraph data={mappedData} keyword={"website"} />
      <AiResponseComponent />
    </div>
  );
};

export default ClickDataVisualization;
