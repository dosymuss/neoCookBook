import { Dialog } from "@mui/material";
import { useNavigate } from "react-router-dom";

import exitIcon from "../../assets/AuthIcon/closeIcon.svg";

import styles from "./ExitAccModal.module.scss";

const ExitAccModal = ({ open, handleClose }) => {

  const navigate = useNavigate()

  const logOut = () => {
    localStorage.removeItem("token");
    handleClose();
    location.reload()
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <div className={styles.main}>
        <button onClick={handleClose} className={styles.closeBtn}>
          <img src={exitIcon} alt="" />
        </button>
        <p className={styles.title}>
          Вы действительно хотите выйти из аккаунта?
        </p>
        <div className={styles.btnDiv}>
          <button onClick={logOut}>Выйти</button>
          <button onClick={handleClose}>Отмена</button>
        </div>
      </div>
    </Dialog>
  );
};

export default ExitAccModal;
