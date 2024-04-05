import { Dialog } from "@mui/material";
import styles from "./NewPassModal.module.scss";

const NewPassModal = ({ open , onClose, children }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
    >
      <div className={styles.main}>{children}</div>
    </Dialog>
  );
};

export default NewPassModal;
