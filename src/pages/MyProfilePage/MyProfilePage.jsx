import { useEffect, useState } from "react";
import { useActions } from "../../hooks/useActions";
import {jwtDecode} from "jwt-decode"

import Header from "../../components/Header/Header";
import Categories from "../../components/Categories/Categories/Categories";
import ProfileInfo from "../../components/ProfileComp/ProfileInfo/ProfileInfo";
import ProfileList from "../../components/ProfileComp/ProfileList/ProfileList";
import { getProfileInfo } from "../../api/profileApi";
import ProfileModal from "../../ui/profileModal/ProfileModal";
import exitIcon from "../../assets/AuthIcon/closeIcon.svg";
import returnIcon from "../../assets/AuthIcon/exitIcon.svg";

import styles from "./MyProfilePage.module.scss";
import UpdateProfile from "../../components/Forms/ProfileForms/UpdateProfile/UpdateProfileForm";
import UpdateProfilePassword from "../../components/Forms/ProfileForms/UpdateProfilePassword/UpdateProfilePassword";
import { useSelector } from "react-redux";

const MyProfilePage = () => {
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const { fetchGetMyProfileInfo } = useActions();

  useEffect(() => {
    const obj = jwtDecode(JSON.parse(localStorage.getItem("token")).access);
    fetchGetMyProfileInfo(obj.user_id);
  }, []);

  const myProfile = useSelector((state) => state.profile.profile);

  if (Object.keys(myProfile).length > 0) {
    return (
      <div>
        <Header />
        <Categories />
        <div>
          <ProfileInfo open={updateModalOpen} setOpen={setUpdateModalOpen} />
          <ProfileList />
        </div>
        <ProfileModal open={updateModalOpen} title={"Редактирование профиля"}>
          <button
            onClick={() => setUpdateModalOpen(false)}
            className={styles.closeIcon}
          >
            <img src={exitIcon} alt="" />
          </button>
          <UpdateProfile
            setCurrentOpen={setUpdateModalOpen}
            setOpen={setPasswordModalOpen}
          />
        </ProfileModal>
        <ProfileModal title={"Изменение пароля"} open={passwordModalOpen}>
          <button
            className={styles.exitBtn}
            onClick={() => {
              setUpdateModalOpen(true);
              setPasswordModalOpen(false);
            }}
          >
            <img src={returnIcon} alt="" />
          </button>
          <button
            onClick={() => {
              setPasswordModalOpen(false);
            }}
            className={styles.closeIcon}
          >
            <img src={exitIcon} alt="" />
          </button>
          <UpdateProfilePassword
            setEarlyModal={setUpdateModalOpen}
            setOpen={setPasswordModalOpen}
          />
        </ProfileModal>
      </div>
    );
  }
};

export default MyProfilePage;
