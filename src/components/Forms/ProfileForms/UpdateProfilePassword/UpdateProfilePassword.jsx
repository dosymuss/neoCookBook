import { useFormik } from "formik";
import { useSelector } from "react-redux";

import { useActions } from "../../../../hooks/useActions";
import { validateUpdateProfilePassword } from "../../../../code/validation/validation";
import Button from "../../../../ui/Button/Button";
import Input from "../../../../ui/input/Input";

import styles from "./UpdateProfilePassword.module.scss";

const UpdateProfilePassword = ({ setOpen, setEarlyModal }) => {
  const { fetchPutProfilePassword } = useActions();
  const status = useSelector((state) => state.profile.status);

  const formik = useFormik({
    initialValues: {
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
    onSubmit: (values) => {
      console.log(values);
      fetchPutProfilePassword(values);
      if (status === "fulfilled") {
        setOpen(false);
        setEarlyModal(true);
      }
    },
    validationSchema: validateUpdateProfilePassword,
  });

  return (
    <div>
      <div className={styles.inpDiv}>
        <label>
          <span className={styles.inpDesc}>Текущий пароль</span>
          <Input
            placeholder={"Текущий пароль"}
            value={formik.values.current_password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.current_password}
            name={"current_password"}
            id={"current_password"}
            type={"password"}
            inpName={"prof"}
          />
        </label>
        <label>
          <span className={styles.inpDesc}>Новый пароль</span>
          <Input
            show={false}
            placeholder={"Новый пароль"}
            value={formik.values.new_password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.new_password}
            name={"new_password"}
            id={"new_password"}
            type={"password"}
            inpName={"prof"}
          />
          <span
            className={
              formik.errors.new_password
                ? styles.errorTextAcc
                : styles.errorText
            }
          >
            Минимум 8 символов, включая цифры и спецсимволы (!, “, #, $ и т.д.)
          </span>
        </label>
        <label>
          <span className={styles.inpDesc}>Подтвердите пароль</span>
          <Input
            placeholder={"Подтвердите пароль"}
            value={formik.values.confirm_password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.confirm_password}
            name={"confirm_password"}
            id={"confirm_password"}
            type={"password"}
            inpName={"prof"}
          />
        </label>
      </div>
      <Button
        onClick={formik.handleSubmit}
        isValid={
          formik.isValid &&
          formik.values.current_password !== "" &&
          formik.values.confirm_password !== "" &&
          formik.values.new_password !== ""
        }
        text={"Cохранить изменения"}
      />
    </div>
  );
};

export default UpdateProfilePassword;
