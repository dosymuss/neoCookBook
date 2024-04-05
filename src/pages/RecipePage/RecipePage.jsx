import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useActions } from "../../hooks/useActions";
import { useSelector } from "react-redux";

import Header from "../../components/Header/Header";
import Categories from "../../components/Categories/Categories/Categories";
import RecipeAuthAndDesc from "../../components/recipePageComp/RecipePageAuthAndDesc/RecipeAuthAndDesc";
import RecipeVideoPlayer from "../../ui/recipeVideoPlayer/RecipeVideoPlayer";
import recipeExample from "../../assets/recipePage/recipePageExam.svg";
import IngredientsComp from "../../components/recipePageComp/IngredientsComp/IngredientsComp";
import RecipeRatingComp from "../../components/recipePageComp/RecipeRatingComp/RecipeRatingComp";
import RecipeComments from "../../components/recipePageComp/RecipeComments/RecipeComments/RecipeComments";


import styles from "./RecipePage.module.scss";

const RecipePage = () => {
  const { id } = useParams();
  const { fetchGetRecipeById } = useActions();
  console.log(id);

  useEffect(() => {
    fetchGetRecipeById(id);
  }, [id]);

  const recipe = useSelector((state) => state.recipe.recipe);

  console.log(recipe);
  

  return (
    <>
      <Header />
      <Categories />
      {Object.keys(recipe).length > 0 && (
        <div className={styles.recipeDiv}>
          <div className={styles.wrap}>
            <RecipeAuthAndDesc id={id} />
            <RecipeVideoPlayer
              url={recipe.cooking_url}
              image={recipe.image?.file}
            />

            <p className={styles.descText}>{recipe.description}</p>

            <img className={styles.img} src={recipe.image?.file} alt="" />

            <IngredientsComp ingredients={recipe.ingredients} />
            <div>
              <p className={styles.title}>Приготовление:</p>
              <p className={styles.listText}>{recipe.cooking_description}</p>
            </div>
            <RecipeRatingComp
              count={recipe.avg_rating_count}
              raiting={recipe.avg_rating}
              id={id}
              userRateNumber={recipe.user_rate_number}
            />
            <RecipeComments />
          </div>
        </div>
      )}
    </>
  );
};

export default RecipePage;
