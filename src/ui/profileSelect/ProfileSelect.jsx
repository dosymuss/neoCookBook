import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import { jwtDecode } from "jwt-decode";

import NewPassForm from "../../components/Forms/newPass/newPassForm/NewPassForm";
import EmailConfirmForm from "../../components/Forms/newPass/confirmEmail/ConfirmEmail";
import EmailForm from "../../components/Forms/newPass/EmailForm/EmailForm";
import exitIcon from "../../assets/AuthIcon/exitIcon.svg";
import closeIcon from "../../assets/AuthIcon/closeIcon.svg";
import dropDownIcon from "../../assets/HomePageIcon/dropDownIcon.svg";
import dropUpIcon from "../../assets/HomePageIcon/dropUpIcon.svg";
import AuthModal from "../../components/AuthModal/AuthModal";
import noneUserImage from "../../assets/recipePage/userNoneImg.svg";
import ExitAccModal from "../ExitAccModal/ExitAccModal";
import NewPassModal from "../newPassModal/NewPassModal";

import styles from "./ProfileSelect.module.scss";

const ProfileSelect = () => {
  const logined = useSelector((state) => state.user.logined);
  const token = JSON.parse(localStorage.getItem("token"));
  const [id, setId] = useState(7);

  const [registered, setRegistered] = useState(false);
  const [open, setOpen] = useState(false);
  const [profModalOpen, setProfOpenModal] = useState(false);
  const [exitModalOpen, setExitModalOpen] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [resetPassModal, setResetPassModal] = useState(false);

  const { fetchGetMyProfileInfo } = useActions();

  const navigate = useNavigate();

  useEffect(() => {
    if (registered) {
    }
  }, [registered]);

  useEffect(() => {
    console.log(id);
  }, [id]);

  useEffect(() => {
    if (logined) {
      setOpen(false);
    }
  }, [logined]);

  useEffect(() => {
    if (token && Object.keys(token).length > 0) {
      setRegistered(true);
    }
  }, [token]);

  useEffect(() => {
    if (registered) {
      const obj = jwtDecode(JSON.parse(localStorage.getItem("token")).access);
      fetchGetMyProfileInfo(obj.user_id);
    }
  }, [registered]);

  const profile = useSelector((state) => state.profile.profile);

  return (
    <>
      {registered ? (
        <div className={styles.profWrap}>
          <button
            onClick={() => {
              setProfOpenModal(!profModalOpen);
            }}
            className={styles.main}
          >
            <p>Профиль</p>
            <img src={profModalOpen ? dropUpIcon : dropDownIcon} alt="" />
          </button>
          <div
            className={profModalOpen ? styles.profModal : styles.profModalHiden}
          >
            <div className={styles.profModalContent}>
              <div>
                <img
                  src={profile.avatar ? profile.avatar.file : noneUserImage}
                  alt=""
                />
                <p>{profile.username}</p>
              </div>
              <button onClick={() => navigate("/my_profile")}>
                Перейти в профиль
              </button>
              <button
                className={styles.exitBtn}
                onClick={() => setExitModalOpen(true)}
              >
                Выйти
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button onClick={() => setOpen(true)} className={styles.main}>
          <p>Вход/регистрация</p>
          <img src={dropDownIcon} alt="" />
        </button>
      )}

      <AuthModal
        open={open}
        handleClose={() => setOpen(false)}
        handleOpen={() => setEmailModalOpen(true)}
      />
      <ExitAccModal
        open={exitModalOpen}
        handleClose={() => setExitModalOpen(false)}
      />

      <NewPassModal open={emailModalOpen}>
        <div className={styles.newPassModalWrap}>
          <button
            onClick={() => {
              setEmailModalOpen(false);
              setOpen(true);
            }}
          >
            <img src={exitIcon} alt="" />
          </button>
          <button onClick={() => setEmailModalOpen(false)}>
            <img src={closeIcon} alt="" />
          </button>
        </div>
        <EmailForm
          setOpen={setOtpModalOpen}
          setCloseOtherModal={setEmailModalOpen}
        />
      </NewPassModal>

      <NewPassModal open={otpModalOpen}>
        <div className={styles.newPassModalWrap}>
          <button
            onClick={() => {
              setEmailModalOpen(true);
              setOtpModalOpen(false);
            }}
          >
            <img src={exitIcon} alt="" />
          </button>
          <button onClick={() => setOtpModalOpen(false)}>
            <img src={closeIcon} alt="" />
          </button>
        </div>
        <EmailConfirmForm
          setOpen={() => setResetPassModal(true)}
          setCloseOtherModal={() => setOtpModalOpen(false)}
        />
      </NewPassModal>

      <NewPassModal open={resetPassModal}>
        <div className={styles.newPassModalWrap}>
          <button
            onClick={() => {
              setResetPassModal(false);
              setOtpModalOpen(true);
            }}
          >
            <img src={exitIcon} alt="" />
          </button>
          <button onClick={() => setResetPassModal(false)}>
            <img src={closeIcon} alt="" />
          </button>
        </div>
        <NewPassForm setClose={() => setResetPassModal(false)} />
      </NewPassModal>
    </>
  );
};

export default ProfileSelect;
