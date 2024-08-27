import Navbar from "../Navbar/Navbar"
import NavMobile from "../Navbar/NavMobile"
import Dashboard from "./Dashboard"
import Sidebar from "./Sidebar"

function UserView(){
    return (
        <div>
            <Navbar />
            <NavMobile />
            <Sidebar/>
            <Dashboard />
        </div>
    )
}

export default UserView
