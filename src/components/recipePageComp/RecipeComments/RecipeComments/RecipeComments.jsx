import { useSelector } from "react-redux";
import RecipeCommentsInp from "../RecipeCommentsInp/RecipeCommentsInp";
import styles from "./RecipeComments.module.scss";
import { useEffect } from "react";
import RecipeCommentsList from "../RecipeCommentsItem/RecipeCommentsItem";

const RecipeComments = () => {
  const recipe = useSelector((state) => state.recipe.recipe);
  const commenst = useSelector((state) => state.recipe.comments);

  useEffect(() => {
    console.log(recipe);
  }, [recipe]);

  return (
    <div className={styles.main}>
      <p className={styles.title}>Комментарии({recipe.comments_count})</p>
      <RecipeCommentsList comments={commenst} />
      <RecipeCommentsInp id={recipe.id} />
    </div>
  );
};

export default RecipeComments;
