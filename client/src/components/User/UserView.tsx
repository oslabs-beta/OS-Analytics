import NavbarDashboard from "../Navbar/NavbarDashboard"
import NavMobile from "../Navbar/NavMobile"
import Dashboard from "./Dashboard"
import Sidebar from "./Sidebar"

function UserView(){
    return (
        <div className="viewWithSide">
            <NavbarDashboard />
            <NavMobile />
            <Sidebar/>
            <Dashboard />
        </div>
    )
}

export default UserView
