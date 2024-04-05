import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import cookerImg from "../../../assets/recipePage/cookerImg.svg";
import raitingIcon from "../../../assets/cardImage/starIcon.svg";
import timeIcon from "../../../assets/cardImage/timeIcon.svg";
import commentIcon from "../../../assets/cardImage/commentIcon.svg";
import SaveBtn from "../../../ui/SaveBtn/SaveBtn";
import noneUserImg from "../../../assets/recipePage/userNoneImg.svg";
import { convertTimeToReadable } from "../../../code/projCode/projCode";
import editIcon from "../../../assets/recipePage/EditIcon.svg";
import deleteIcon from "../../../assets/recipePage/DeleteIcon.svg";
import DeleteRecipeModal from "../DeleteRecipeModal/DeleteRecipeModal";

import styles from "./RecipeAthAndDesc.module.scss";

const RecipeAuthAndDesc = ({ id }) => {
  const [time, setTime] = useState(null);
  const [imageHave, setImageHave] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();

  const recipe = useSelector((state) => state.recipe.recipe);

  useEffect(() => {
    if (Object.keys(recipe).length > 0) {
      const timeConvert = convertTimeToReadable(recipe.cooking_time);
      setTime(timeConvert);
      if (recipe?.user?.avatar?.file) {
        setImageHave(true);
      }
    }
  }, [recipe]);

  const token = JSON.parse(localStorage.getItem("token"));
  const tokenDecode = jwtDecode(token.access);

  if (recipe) {
    const ratingString =
      recipe.avg_rating === null ? "0" : String(recipe.avg_rating);

    return (
      <div className={styles.main}>
        <p className={styles.category}>{recipe?.category?.name}</p>
        <p className={styles.name}>{recipe?.name}</p>
        <div className={styles.userDiv}>
          <img
            className={styles.img}
            src={imageHave ? recipe?.user?.avatar?.file : noneUserImg}
            alt=""
          />
          <button
            onClick={() => navigate(`/profile/${recipe.user.id}`)}
            className={styles.userName}
          >
            {recipe?.user?.username}
          </button>
        </div>
        <div className={styles.descDiv}>
          <div className={styles.descItem}>
            <img src={raitingIcon} alt="" />
            <p className={styles.descText}>
              Рейтинг:{" "}
              {ratingString.length > 3
                ? ratingString.substring(0, 3)
                : ratingString}
            </p>
          </div>
          <div>
            <p className={styles.descText}>
              Ингридиентов: {recipe.ingredients_count}
            </p>
          </div>
          <div className={styles.descItem}>
            <img src={timeIcon} alt="" />
            <p className={styles.descText}>{time}</p>
          </div>
          <div className={styles.descItem}>
            <img src={commentIcon} alt="" />
            <p className={styles.descText}>{recipe.comments_count}</p>
          </div>
          <SaveBtn id={id} isBookMarked={recipe.is_bookmarked} />
        </div>
        {recipe.user.id === tokenDecode.user_id && (
          <div className={styles.btnDiv}>
            <button onClick={() => navigate(`/edit_page/${id}`)}>
              <img src={editIcon} alt="" />
              <p>Редактировать</p>
            </button>
            <button onClick={() => setOpenModal(true)}>
              <img src={deleteIcon} alt="" />
              <p>Удалить рецепт</p>
            </button>
          </div>
        )}
        <DeleteRecipeModal
          open={openModal}
          handleClose={() => setOpenModal(false)}
          id={id}
        />
      </div>
    );
  } else {
    return null; // Можно вернуть заглушку, пока данные загружаются
  }
};

export default RecipeAuthAndDesc;
