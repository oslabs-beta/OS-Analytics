import styles from "./UserView.module.css";
import { activeUserAtom, activeWebsiteAtom } from "../../state/Atoms";
import { useAtom } from "jotai";
import ClickDataVisualization from "../ChartPages/AllUserData";
import ClickDataVisualizationWebsite from "../ChartPages/WebsiteData";
import TimeFrameDropdown from "../ChartPages/TimeFrameDropdown";
import SelectWebsiteDropDown from "../ChartPages/SelectWebsiteDropdown";
import populateAtoms from "../../services/populateAtoms";
function Dashboard() {
  const [activeUser] = useAtom(activeUserAtom);
  const [activeWebsite,setActiveWebsite] = useAtom(activeWebsiteAtom);
  const { id } = useParams();
  setActiveWebsite(id!)

  return (
    <section id="dashboard-section" className={styles.dashboard}>
      <div className={styles.chartBox}>
      
        <TimeFrameDropdown />
      </div>
      <div>
        {activeWebsite === "overview"? (
          <ClickDataVisualization />
        ) : (
          <ClickDataVisualizationWebsite />
        )}
      </div>
    </section>
  );
}

export default Dashboard;
