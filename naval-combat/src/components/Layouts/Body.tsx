import Game from '../Game'
import styles from './Layouts.module.scss'

const Body = () => {
  return (
    <div className={styles.content}>
        <Game/>
    </div>
  )
}

export default Body