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

/*
*Imports from jotai to get global state and map hook*
import { userDataAtom,websiteDataAtom } from "../../state/Atoms"; <------ grab global state hooks
import { useAtom } from "jotai"; <------ needed import to use global state as variables
import { mapUserData } from '../../services/extractData';  <------ map hook to parse the extracted global state data


  const [userData] = useAtom(userDataAtom);<------ grabing the gobal state data from the hook
  const mappedData = mapUserData(userData) <------ parsing it before ending it to graphs algorith is found in /services/extractData

 <BarGraph data={mappedData} keyword={"website"} /><---- using the graph anywhere and giving it data and a keyword on which data to display (clicks per "website")

*/
const ClickDataVisualization = () => {
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

export default ClickDataVisualization;
