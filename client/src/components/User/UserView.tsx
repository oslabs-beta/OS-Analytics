import NavbarDashboard from "../Navbar/NavbarDashboard"
import NavMobile from "../Navbar/NavMobile"
import Sidebar from "./Sidebar"
import DashBoardDisplay from "./DashboardDisplay"
import Footer from "../Footer/Footer"
function UserView(){
    return (
        <div className="viewWithSide">
            <NavbarDashboard />
            <NavMobile />
            <Sidebar/>
            <DashBoardDisplay />
            <Footer />
        </div>
    )
}

export default UserView
