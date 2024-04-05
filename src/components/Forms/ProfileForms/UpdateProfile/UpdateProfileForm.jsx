import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useActions } from "../../../../hooks/useActions";
import { useSelector } from "react-redux";

import Input from "../../../../ui/input/Input";
import updateUserNone from "../../../../assets/ProfileImage/updateUserNone.svg";
import plusIcon from "../../../../assets/ProfileImage/plusIcon.svg";
import lockIcon from "../../../../assets/ProfileImage/lockIcon.svg";
import Button from "../../../../ui/Button/Button";
import { validateUpdateProfile } from "../../../../code/validation/validation";

import styles from "./UpdateProfileForm.module.scss";

const UpdateProfile = ({ setOpen, setCurrentOpen }) => {
  const [file, setFile] = useState(null);

  const { fetchPutProfileInfo } = useActions();

  const status = useSelector((state) => state.profile.status);
  const myProfile = useSelector((state) => state.profile.profile);

  const [photo, setPhoto] = useState(myProfile.avatar?.file);

  console.log(myProfile);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhoto(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }, [file]);

  const formik = useFormik({
    initialValues: {
      username: myProfile.username,
      email: myProfile.email,
    },
    validationSchema: validateUpdateProfile,
    onSubmit: (values) => {
      console.log(values);

      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("username", values.username);
      formData.append("avatar", file);

      fetchPutProfileInfo(formData);
      console.log(status);

      if (status === "fulfilled") {
        setCurrentOpen(false);
      }
    },
  });

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  if (Object.keys(myProfile).length > 0) {
    return (
      <div className={styles.main}>
        <label className={styles.imageDiv}>
          <input type="file" onChange={handleChange} />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "400px",
            }}
          >
            <div>
              <img src={photo ? photo : updateUserNone} alt="" />
              <img className={styles.plusImg} src={plusIcon} alt="" />
            </div>
          </div>
        </label>
        <label>
          <span className={styles.inpDesc}>Имя пользователя</span>
          <Input
            inpName={"prof"}
            id={"username"}
            placeholder={"Имя пользователя"}
            type={"text"}
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name={"username"}
            error={formik.errors.username}
          />
        </label>
        <label>
          <span className={styles.inpDesc}>Адрес электронной почты</span>
          <Input
            inpName={"prof"}
            id={"email"}
            placeholder={"Адрес электронной почты"}
            type={"text"}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name={"email"}
            error={formik.errors.email}
          />
        </label>
        <div className={styles.passDiv}>
          <button
            onClick={() => {
              setOpen(true);
              setCurrentOpen(false);
            }}
          >
            <img src={lockIcon} alt="" />
            <p>Изменить пароль</p>
          </button>
        </div>
        <Button
          isValid={
            formik.isValid &&
            formik.values.email !== "" &&
            formik.values.username
          }
          onClick={formik.handleSubmit}
          text={"Сохранить изменения"}
        />
      </div>
    );
  }
};

export default UpdateProfile;
