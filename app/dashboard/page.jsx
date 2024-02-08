import {Card, Transactions, Chart, RightBar} from "@app/index"
import styles from "../ui/dashboard/dashboard.module.css"

const Dashboard = () => {
  
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          <Card />
          <Card />
          <Card />
        </div>
        <Transactions />
        <Chart />
      </div>
      <div className={styles.side}>
        <RightBar />
      </div>
    </div>
  )
}

export default Dashboard