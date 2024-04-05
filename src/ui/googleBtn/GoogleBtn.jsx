import { useGoogleLogin, GoogleLogin } from "@react-oauth/google";
import { getInfoForG } from "../../api/auth";
import googleIcon from "../../assets/AuthIcon/googleIcon.svg";
import { useActions } from "../../hooks/useActions";

import styles from "./GoogleBtn.module.scss";

const GoogleBtn = ({ text }) => {
  const { fetchLogin } = useActions();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      getInfoForG(tokenResponse.access_token).then((res) => {
        console.log(res.data);
        fetchLogin({
          email: "almazbekovd12@gmail.com",
          password: "Dastan555666$",
        });
      });
    },
  });
  // const responseMessage = (response) => {
  //   console.log(response);
  // };
  // const errorMessage = (error) => {
  //   console.log(error);
  // };
  return (
    <div>
      <button className={styles.button} onClick={login}>
        <img src={googleIcon} alt="гугл" />
        <p>{text}</p>
      </button>
      {/* <GoogleLogin onSuccess={responseMessage} onError={errorMessage}/> */}
    </div>
  );
};

export default GoogleBtn;
