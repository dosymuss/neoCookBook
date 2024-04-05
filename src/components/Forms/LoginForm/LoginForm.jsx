import { useFormik } from "formik";
import { useActions } from "../../../hooks/useActions";
import { useEffect } from "react";
import { useState } from "react";

import Input from "../../../ui/input/Input";
import Button from "../../../ui/Button/Button";
import { validateLogin } from "../../../code/validation/validation";
import NewPassModal from "../../../ui/newPassModal/NewPassModal";
import EmailForm from "../newPass/EmailForm/EmailForm";
import EmailConfirmForm from "../newPass/confirmEmail/ConfirmEmail";
import NewPassForm from "../newPass/newPassForm/NewPassForm";

import exitIcon from "../../../assets/AuthIcon/exitIcon.svg";
import closeIcon from "../../../assets/AuthIcon/closeIcon.svg";

import styles from "./LoginForm.module.scss";
import GoogleBtn from "../../../ui/googleBtn/GoogleBtn";

const LoginForm = ({ handleOpen, handleClose, open }) => {
  const { fetchLogin } = useActions();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validateLogin,
    onSubmit: (values) => {
      fetchLogin(values);
      console.log(values);
    },
  });

  return (
    <div className={styles.main}>
      <h2>Вход</h2>
      <div className={styles.inpDiv}>
        <Input
          id={"email"}
          error={formik.errors.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name={"email"}
          value={formik.values.email}
          type={"text"}
          placeholder={"Адрес электронной почты"}
        />
        <Input
          id={"password"}
          error={formik.errors.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name={"password"}
          value={formik.values.password}
          type={"password"}
          placeholder={"Пароль"}
          show={true}
        />
        <div>
          <button
            className={styles.forgotBtn}
            onClick={() => {
              handleClose();
              handleOpen();
            }}
          >
            Забыли пароль
          </button>
        </div>
        <Button
          isValid={
            formik.isValid &&
            formik.values.email !== "" &&
            formik.values.password !== ""
          }
          onClick={formik.handleSubmit}
          text={formik.isSubmitting ? "Отправка..." : "Далее"}
        />
      </div>
      {/* <GoogleBtn text={"Вход с аккаунтом Google"} /> */}
    </div>
  );
};

export default LoginForm;
