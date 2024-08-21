import Navbar from "../Navbar/Navbar"
import Dashboard from "./Dashboard"
import Sidebar from "./Sidebar"

function UserView(){
    return (
        <div>
            <Navbar />
            <Sidebar/>
            <Dashboard />
        </div>
    )
}

export default UserView
