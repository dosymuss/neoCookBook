import { useFormik } from "formik";
import { useState, useEffect } from "react";

import Input from "../../../../ui/input/Input";
import Button from "../../../../ui/Button/Button";
import { validateResetPassword } from "../../../../code/validation/validation";
import { fetchResetPass } from "../../../../api/auth";
import { toastSuccess } from "../../../../ui/Toast/toast";

import styles from "./NewPassForm.module.scss";

const NewPassForm = ({ setClose }) => {
  const [style, setStyle] = useState({
    color: "#7c7575",
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      confirm_password: "",
    },
    onSubmit: (values) => {
      console.log(values);
      fetchResetPass(values).then((res) => {
        if (res.status === 200) {
          toastSuccess("Пароль успешно изменен");
          setClose();
        }
      });
    },
    validationSchema: validateResetPassword,
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
      <h2 className={styles.title}>Создание пароля</h2>
      <div>
        <Input
          id={"password"}
          error={formik.errors.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name={"password"}
          value={formik.values.password}
          type={"password"}
          placeholder={"Новый пароль"}
          show={false}
        />
        <span style={style} className={styles.passDesc}>
          Минимум 8 символов, включая цифры и спецсимволы (!, “, #, $ и т.д.)
        </span>
      </div>
      <Input
        id={"confirm_password"}
        error={formik.errors.confirm_password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        name={"confirm_password"}
        value={formik.values.confirm_password}
        type={"password"}
        placeholder={"Подтвердите пароль"}
      />
      <Button
        onClick={formik.handleSubmit}
        isValid={
          formik.isValid &&
          formik.values.password !== "" &&
          formik.values.confirm_password !== ""
        }
        text={"Сохранить"}
      />
    </div>
  );
};

export default NewPassForm;
