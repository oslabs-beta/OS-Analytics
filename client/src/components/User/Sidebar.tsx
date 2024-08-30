import styles from './UserView.module.css'
import logo from '../../assets/map-logo.png'
import { NavLink } from 'react-router-dom'

function Sidebar(){

    return (
        <div className={styles.sidebar}>
            <div className={styles.logoBox}>
                <img className={styles.sideLogo} src={logo} alt="AT.io" />
                <h3>OS Analytics</h3>
            </div>
            <div className={styles.sidebarLinks}>
            <NavLink to="/dashboard" className={styles.sidebarLink}>
                <img className={styles.sideIcon} src={logo} alt="AT.io" />
                <span className={styles.sidebarSpan}>Dashboard</span>
            </NavLink>
            <NavLink to="/documentation" className={`${styles.sidebarLink}`}>
                <img className={styles.sideIcon} src={logo} alt="AT.io" />
            </NavLink>
            <NavLink to="/settings" className={`${styles.sidebarLink}`}>
                <img className={styles.sideIcon} src={logo} alt="AT.io" />
            </NavLink>
            </div>
 
        </div>
    )
}

export default Sidebar
