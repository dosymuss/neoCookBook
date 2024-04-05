import { Dialog } from "@mui/material";

import styles from "./ProfileModal.module.scss";

const ProfileModal = ({ open, handleClose, children, title }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <div className={styles.main}>
      <p className={styles.title}>{title}</p>
        {children}
        </div>
    </Dialog>
  );
};

export default ProfileModal;
