import ClickGraph from "./Charts/LineGraph-clicks";
import DuelPieGraphs from "./Charts/DuelPieChart-clicks";
import BarGraph from "./Charts/BarGraph-clicks";
import AiResponseComponent from "./Charts/aiResponse";
import { userDataAtom } from "../../state/Atoms";
import { useAtom } from "jotai";
import styles from "./Charts.module.css";
import { mapUserData } from "../../services/extractData";
import RadarChart from "./Charts/RadarGraph-clicks";
import StackedBarChart from "./Charts/StackedBarGraph-clicks";
//to add graph in other components

const AllUserData = () => {
  const [userData] = useAtom(userDataAtom);
  const mappedData = mapUserData(userData);

  return (
    <div className={styles.chartDisplay}>
      <ClickGraph data={mappedData} />
      <DuelPieGraphs
        data={mappedData}
        keyword={"user_browser"}
        keywordTwo={"user_os"}
      />
      <BarGraph data={mappedData} keyword={"website"} />
      <RadarChart
        data={mappedData}
        keyword={"website"}
        keywordTwo = {"user_browser"}
      />
      <StackedBarChart data ={mappedData} keyword={"user_browser"} keywordTwo={"user_os"}  />
      <AiResponseComponent />
    </div>
  );
};

export default AllUserData;
