import Navbar from "../Navbar/Navbar"
import NavMobile from "../Navbar/NavMobile"
import Dashboard from "./Dashboard"
import Sidebar from "./Sidebar"

function UserView(){
    return (
        <div className="viewWithSide">
            <Navbar />
            <NavMobile />
            <Sidebar/>
            <Dashboard />
        </div>
    )
}

export default UserView
