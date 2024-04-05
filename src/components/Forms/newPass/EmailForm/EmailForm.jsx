import { useFormik } from "formik";
import { useEffect } from "react";

import Button from "../../../../ui/Button/Button";
import Input from "../../../../ui/input/Input";
import { validateEmailForm } from "../../../../code/validation/validation";
import { fetchSendCodeEmail } from "../../../../api/auth";

import styles from "./EmailForm.module.scss";

const EmailForm = ({ setOpen, setCloseOtherModal }) => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      console.log(values);
      fetchSendCodeEmail(values)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            localStorage.setItem("userInfo", JSON.stringify({
              email:values.email,
              user_id: res.data.user_id
            }))
            setOpen(true);
            setCloseOtherModal(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    validationSchema: validateEmailForm,
  });

  useEffect(() => {
    console.log(formik.errors);
  }, [formik.errors]);

  return (
    <div className={styles.main}>
      <h2 className={styles.title}>Восстановление пароля</h2>
      <span className={styles.desc}>
        Введите электронную почту, которую вы указывали в профиле
      </span>
      <Input
        id={"email"}
        error={formik.errors.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        name={"email"}
        value={formik.values.email}
        type={"text"}
        placeholder={"Адрес электронной почты"}
        show={true}
      />
      <Button
        onClick={formik.handleSubmit}
        isValid={formik.isValid && formik.values.email!=="" }
        
        text={"Далее"}
      />
    </div>
  );
};

export default EmailForm;
