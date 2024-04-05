import { Dialog } from "@mui/material";
import { useActions } from "../../../hooks/useActions";
import { useNavigate } from "react-router-dom";

import exitIcon from "../../../assets/AuthIcon/closeIcon.svg";

import styles from "./DeleteRecipeModal.module.scss";

const DeleteRecipeModal = ({ open, handleClose, id }) => {
  const { fetchDeleteRecipe } = useActions();
  const navigate = useNavigate();

  const handleDelete = () => {
    fetchDeleteRecipe(id);
    navigate("/my_profile");
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <div className={styles.main}>
        <button onClick={handleClose} className={styles.closeBtn}>
          <img src={exitIcon} alt="" />
        </button>
        <p className={styles.title}>
          Вы действительно хотите удалить данный рецепт?
        </p>
        <div className={styles.btnDiv}>
          <button onClick={handleDelete}>Удалить рецепт</button>
          <button onClick={handleClose}>Отмена</button>
        </div>
      </div>
    </Dialog>
  );
};

export default DeleteRecipeModal;
