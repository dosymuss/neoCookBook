import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useActions } from "../../../hooks/useActions";
import { useSelector } from "react-redux";

import Button from "../../../ui/Button/Button";
import Input from "../../../ui/input/Input";
import { validateRegister } from "../../../code/validation/validation";

import styles from "./RegisterForm.module.scss";
import GoogleBtn from "../../../ui/googleBtn/GoogleBtn";

const RegisterForm = () => {
  const userState = useSelector((state) => state.user);
  const { fetchRegister } = useActions();

  const [style, setStyle] = useState({
    color: "#7c7575",
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      confirm_password: "",
    },
    onSubmit: (values) => {
      console.log(userState);
      fetchRegister(values);
      console.log(values);
    },
    validationSchema: validateRegister,
  });
  useEffect(() => {
    if (formik.errors.password) {
      setStyle({ color: "#e44c4c" });
    } else {
      setStyle({ color: "#7c7575" });
    }
  }, [formik.errors.password]);

  return (
    <div className={styles.main}>
      <h2>Регистрация</h2>
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
          id={"username"}
          error={formik.errors.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name={"username"}
          value={formik.values.username}
          type={"text"}
          placeholder={"Имя пользователя"}
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
          show={false}
        />
        <p style={style} className={styles.passDesc}>
          Минимум 8 символов, включая цифры и спецсимволы (!, “, #, $ и т.д.)
        </p>
        <Input
          id={"confirm_password"}
          error={formik.errors.confirm_password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name={"confirm_password"}
          value={formik.values.confirm_password}
          type={"password"}
          placeholder={"Подтвердите пароль"}
          show={true}
        />
        <Button
          isValid={
            formik.isValid &&
            formik.values.email !== "" &&
            formik.values.name !== "" &&
            formik.values.password !== "" &&
            formik.values.confirm_password !== ""
          }
          onClick={formik.handleSubmit}
          text={formik.isSubmitting ? "Отправка..." : "Войти"}
        />
      </div>
      {/* <GoogleBtn text={"Регистрация с аккаунтом Google"}/> */}
    </div>
  );
};

export default RegisterForm;
