import styles from "./UserView.module.css";
import { activeUserAtom, activeWebsiteAtom } from "../../state/Atoms";
import { useAtom } from "jotai";
import ClickDataVisualization from "../ChartPages/AllUserData";
import ClickDataVisualizationWebsite from "../ChartPages/WebsiteData";
import TimeFrameDropdown from "../ChartPages/TimeFrameDropdown";
import SelectWebsiteDropDown from "../ChartPages/SelectWebsiteDropdown";
import populateAtoms from "../../services/populateAtoms";
function Dashboard() {
  populateAtoms();
  const [activeUser] = useAtom(activeUserAtom);
  const [activeWebsite] = useAtom(activeWebsiteAtom);

  return (
    <section className={styles.dashboard}>
      <div className={styles.chartBox}>
        <h2>{`Welcome back, ${activeUser} `}</h2>
        <SelectWebsiteDropDown />
        <TimeFrameDropdown />
      </div>

      <div>
        {activeWebsite === "All Websites" ? (
          <ClickDataVisualization />
        ) : (
          <ClickDataVisualizationWebsite />
        )}
      </div>
    </section>
  );
}
export default Dashboard;
