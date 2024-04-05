import { useFormik } from "formik";
import { useEffect, useState } from "react";

import Button from "../../../../ui/Button/Button";
import CodeInput from "../../../../ui/pinInput/PinInput";

import styles from "./ConfirmEmail.module.scss";
import { fetchConfirmEmail, fetchSendCodeEmail } from "../../../../api/auth";

const EmailConfirmForm = ({ setOpen, setCloseOtherModal }) => {
  const [clickSendBtn, setClickSendBtn] = useState(false);
  const [time, setTime] = useState(59);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  let interval;

  const formik = useFormik({
    initialValues: {
      code: "",
    },
    onSubmit: (values) => {
      console.log(values);
      fetchConfirmEmail(userInfo.user_id, { code: value })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            setCloseOtherModal();
            setOpen();
            setError(false)
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status > 300) {
            setError(true);
          }
        });
    },
  });

  useEffect(() => {
    if (clickSendBtn) {
      interval = setInterval(() => {
        setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    }
    if (time === 0) {
      clearInterval(interval); // Остановить текущий интервал
      setTime(59); // Установить новое значение времени
      setClickSendBtn(false); // Сбросить флаг clickSendBtn
    }

    return () => clearInterval(interval);
  }, [clickSendBtn, time]);

  return (
    <div className={styles.main}>
      <h2 className={styles.title}>Восстановление пароля</h2>
      <span className={styles.desc}>
        На почту example@gmail.com было выслано письмо с 4-значным кодом.
        Введите его ниже
      </span>
      <CodeInput setValue={setValue} error={error}/>

      <Button
        onClick={formik.handleSubmit}
        isValid={value !== ""}
        text={"Далее"}
      />

      {clickSendBtn ? (
        <p className={styles.sendCodeDesc}>Отправить повторно через 0:{time}</p>
      ) : (
        <button
          onClick={() => {
            setClickSendBtn(true);
            fetchSendCodeEmail({ email: userInfo.email });
          }}
          className={styles.sendCodeBtn}
        >
          Отправить код повторно
        </button>
      )}
    </div>
  );
};

export default EmailConfirmForm;
