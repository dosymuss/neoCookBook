

import styles from "./RecipeCommentsItem.module.scss";
import RecipeCommentsItem from "../RecipeCommentsList/RecipeCommentsList";

const RecipeCommentsList = ({ comments }) => {
  return (
    <div className={styles.main}>
      {comments.map((item) => (
        <RecipeCommentsItem key={item.id} comment={item}/>
      ))}
    </div>
  );
};

export default RecipeCommentsList;
