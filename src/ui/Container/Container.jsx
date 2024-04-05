import styles from "./Container.module.scss"

const Container = ({children}) => {
  return (
    <div className={styles.wrap}>
{children}
    </div>
  )
}

export default Container