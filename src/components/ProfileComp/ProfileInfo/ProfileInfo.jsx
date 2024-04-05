import { useSelector } from "react-redux";

import Container from "../../../ui/Container/Container";
import noneProfileImage from "../../../assets/profilePage/ProfileImage.svg";
import updateIconOrange from "../../../assets/profilePage/updateIconOrange.svg";

import styles from "./ProfileInfo.module.scss";

const ProfileInfo = ({ open, setOpen }) => {
  const myProfile = useSelector((state) => state.profile.profile);

  return (
    <Container>
      <div className={styles.main}>
        <img
          className={styles.image}
          src={myProfile.avatar ? myProfile.avatar.file : noneProfileImage}
          alt=""
        />
        <div className={styles.descDiv}>
          <p className={styles.title}>{myProfile.username}</p>
          <button onClick={() => setOpen(!open)} className={styles.updateBtn}>
            <img src={updateIconOrange} alt="" />
            <p>Редактировать профиль</p>
          </button>
        </div>
      </div>
    </Container>
  );
};

export default ProfileInfo;
