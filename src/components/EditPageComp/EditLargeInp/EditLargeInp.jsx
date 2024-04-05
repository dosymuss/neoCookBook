import styles from "./EditLargeInp.module.scss";

const EditLargeInp = ({ text, big = false, value, setValue }) => {
  return (
    <div>
      <p className={big ? styles.textBig : styles.text}>{text}</p>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={styles.inp}
        cols="30"
        rows="10"
        placeholder="Введите текст"
      ></textarea>
    </div>
  );
};

export default EditLargeInp;
