import { Dialog } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import LoginForm from "../Forms/LoginForm/LoginForm";
import RegisterForm from "../Forms/RegisterForm/RegisterForm";
import closeIcon from "../../assets/AuthIcon/closeIcon.svg";
import closeIconWhite from "../../assets/AuthIcon/closeIconWhite.svg";

import styles from "./AuthModal.module.scss";

// ! подключить

const AuthModal = ({ open, handleClose, handleOpen }) => {
  const [click, setClick] = useState(false);
  const [firstClass, setFirstClass] = useState(styles.firstBlock);
  const [secondClass, setSecondClass] = useState(styles.secBlock);

  const navigate = useNavigate();

  const { registered } = useSelector((state) => state.user);

  useEffect(() => {
    if (click) {
      setFirstClass(`${styles.firstBlock} ${styles.moveRight}`);
      setSecondClass(`${styles.secBlock} ${styles.moveLeft}`);
    } else {
      setFirstClass(styles.firstBlock);
      setSecondClass(styles.secBlock);
    }
  }, [click]);

  useEffect(() => {
    if (registered) {
      setClick(false);
      location.reload()
    }
  }, [registered]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="md"
    >
      <div className={styles.main}>
        <button onClick={handleClose} className={styles.closeBtn}>
          <img src={click ? closeIcon : closeIconWhite} alt="" />
        </button>
        <div className={firstClass}>
          {click ? (
            <RegisterForm />
          ) : (
            <LoginForm handleClose={handleClose} handleOpen={handleOpen} />
          )}
        </div>
        <div className={secondClass}>
          <div>
            <h2>{click ? "Уже есть аккаунт?" : "Еще нет аккаунта?"} </h2>
            <button onClick={() => setClick(!click)}>
              {click ? "Войти" : "Зарегистрироваться"}
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default AuthModal;
