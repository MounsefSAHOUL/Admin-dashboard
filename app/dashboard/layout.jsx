import { SideBar, NavBar, Footer } from "@app/index"
import styles from "../ui/dashboard/dashboard.module.css"
const layout = ({children}) => {
  return (
    <div className={styles.container}>
        <div className={styles.menu}>
            <SideBar />
        </div>
        <div className={styles.content}>
            <NavBar />
            {children}
            <Footer />
        </div>
    </div>
  )
}

export default layout