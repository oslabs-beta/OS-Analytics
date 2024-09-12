import NavbarDashboard from "../Navbar/NavbarDashboard"
import NavMobile from "../Navbar/NavMobile"
import Sidebar from "./Sidebar"
import DashBoardDisplay from "./DashboardDisplay"
function UserView(){
    return (
        <div className="viewWithSide">
            <NavbarDashboard />
            <NavMobile />
            <Sidebar/>
            <DashBoardDisplay />
        </div>
    )
}

export default UserView
