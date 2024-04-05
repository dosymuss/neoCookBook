import recipePageExam from "../../assets/recipePage/recipePageExam.svg";
import playerImage from "../../assets/recipePage/playerImage.svg";

import styles from "./RecipeVideoPlayer.module.scss";

const RecipeVideoPlayer = ({ url, image }) => {
  if (url) {
    return (
      <a
        target="_blank"
        href={url}
        className={styles.main}
        style={{ backgroundImage: `url(${image})` }}
      >
        <img src={playerImage} alt="" />
      </a>
    );
  }
};

export default RecipeVideoPlayer;
