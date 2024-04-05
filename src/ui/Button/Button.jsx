import styles from "./Button.module.scss"

const Button = ({text,isValid, ...prop}) => {
  
  return (
   <button type="submit" disabled={!isValid} {...prop} className={styles.btn}>
    {text}
   </button>
  )
}

export default Button