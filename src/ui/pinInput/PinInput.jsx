import PinInput from "react-pin-input";
import styles from "./PinInput.module.scss";

const CodeInput = ({ setValue, error }) => {
  return (
    <div className={styles.main}>
      <PinInput
        length={4}
        initialValue=""
        type="numeric"
        inputMode="number"
        style={{ display: "flex", gap: "17px" }}
        inputStyle={{
          borderRadius: "16px",
          padding: "12px 16px",
          width: "55px",
          height: "60px",
          backgroundColor: "#f1f1f1",
          fontWeight: "500",
          fontSize: "32px",
          textAlign: "center",
          color: "#4b4242",
          border: error ? "1px solid red" : "none",
        }}
        onComplete={(value, index) => {
          //   console.log(value, index);
          setValue(value);
        }}
        autoSelect={true}
        regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
      />
      {error && <p className={styles.errText}>Неверный код</p>}
    </div>
  );
};

export default CodeInput;
