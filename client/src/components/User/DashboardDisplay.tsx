import { useAtom } from "jotai";
import populateAtoms from "../../services/populateAtoms";
import { userDataAtom } from "../../state/Atoms";
import Dashboard from "./Dashboard";
import Documentation from "../Documentation/Documentation";

function Final() {
  populateAtoms();
  const [data] = useAtom(userDataAtom);

  return (
      <div>
        {data.length === 0 ? (
          <Documentation />
        ) : (
          <Dashboard />
        )}
      </div>
   
  );
}

export default Final;
