import styles from "./Dashboard.module.css"
import { activeUserAtom } from "../../state/Atoms"
import { useAtom } from "jotai"

function Dashboard(){
    const [user] = useAtom(activeUserAtom);
    return (
        <div className={styles.dashboard}>
            <h1>{`Welcome back, ${user}`}</h1>
        </div>
    )
}

export default Dashboard
