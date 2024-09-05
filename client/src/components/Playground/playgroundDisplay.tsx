import { useState } from "react";
import FlowPlayground from "./FrequencyReactFlow/FlowPlayground.tsx";
import OverallFlowPlayground from "./OverallReactFlow/OverallFlowPlayground.tsx";
import PermanentDrawerLeft from "./ViewDrawer";
import Navbar from "../Navbar/Navbar";
import populateAtoms from "../../services/populateAtoms";

const PlaygroundDisplay = () => {
  populateAtoms();
  const [selectedView, setSelectedView] = useState("tree");
  const [selectedWebsite, setSelectedWebsite] = useState("");
  const [selectedPage, setSelectedPage] = useState("");

  return (
    <div style={{ display: "flex" }}>
      <Navbar />
      <PermanentDrawerLeft
        onSelectView={setSelectedView}
        onSelectWebsite={setSelectedWebsite}
        onSelectPage={setSelectedPage}
      />
      <div style={{ flexGrow: 1 }}>
        {selectedView === "frequency" && (
          <FlowPlayground
            selectedWebsite={selectedWebsite}
            selectedPage={selectedPage}
          />
        )}
        {selectedView === "tree" && <OverallFlowPlayground />}
      </div>
    </div>
  );
};

export default PlaygroundDisplay;
