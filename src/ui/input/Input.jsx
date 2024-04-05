import { useState } from "react";
import { useEffect } from "react";

import openEye from "../../assets/AuthIcon/openEye.svg";
import closeEye from "../../assets/AuthIcon/closeEye.svg";
import { isEmpty } from "../../code/projCode/projCode";

import styles from "./Input.module.scss";

const Input = ({ inpName, type, placeholder, show = true, error, ...prop }) => {
  const [passClick, setPassClick] = useState(false);
  const [passType, setPassType] = useState("password");
  const [errEmpty, setErrEmpty] = useState(null);
  const [style, setStyle] = useState({
    border: "none",
  });

  useEffect(() => {
    if (
      error !== null &&
      error !== undefined &&
      Object.keys(error).length > 0
    ) {
      setErrEmpty(true);
      setStyle({ border: "1px solid red" });
    } else {
      setErrEmpty(false);
      setStyle({ border: "none" });
    }
  }, [error]);

  useEffect(() => {
    if (passClick) {
      setPassType("text");
    } else {
      setPassType("password");
    }
  }, [passClick]);

  if (type === "text") {
    return (
      <div>
        <input
          style={{ ...style, width: `${inpName === "prof" && "400px"}` }}
          {...prop}
          type="text"
          className={styles.inp}
          placeholder={placeholder}
        />
        {errEmpty && show && <p className={styles.errorMess}>{error}</p>}
      </div>
    );
  }
  if (type === "password") {
    return (
      <div>
        <div
          style={{ ...style, width: `${inpName === "prof" && "400px"}` }}
          className={styles.inpDivPass}
        >
          <input {...prop} type={passType} placeholder={placeholder} />
          <button onClick={() => setPassClick(!passClick)}>
            <img src={passClick ? openEye : closeEye} alt="" />
          </button>
        </div>
        {errEmpty && show && <p className={styles.errorMess}>{error}</p>}
      </div>
    );
  }
  if (inpName === "comment") {
    return (
      <input
        style={style}
        {...prop}
        type="text"
        className={styles.inpComm}
        placeholder={placeholder}
      />
    );
  }
};

export default Input;
