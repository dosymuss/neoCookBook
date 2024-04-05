import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Container from "../Container/Container";
import {
  convertTextFunc,
  convertTimeToReadable,
} from "../../code/projCode/projCode";

import exampleImage from "../../assets/cardImage/ExampleImage.svg";
import timeIcon from "../../assets/cardImage/timeIcon.svg";
import starIcon from "../../assets/cardImage/starIcon.svg";
import commentIcon from "../../assets/cardImage/commentIcon.svg";
import styles from "./Card.module.scss";
import SaveBtn from "../SaveBtn/SaveBtn";

const Card = ({ recipe }) => {
  const [time, setTime] = useState(null);
  const [desc, setDesc] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (recipe) {
      const readTime = convertTimeToReadable(recipe.cooking_time);
      setTime(readTime);
      const convertText = convertTextFunc(recipe.description);
      setDesc(convertText);
    }
  }, [recipe]);

  const ratingString = recipe.avg_rating === null ? "0" : String(recipe.avg_rating);

  if (recipe) {
    return (
      <Container>
        <div className={styles.main}>
          <img className={styles.img} src={recipe?.image?.file} alt="" />
          <div className={styles.descWrap}>
            <span className={styles.categ}>{recipe.category.name}</span>
            <h2
              onClick={() => navigate(`/recipe/${recipe.id}`)}
              className={styles.name}
            >
              {recipe.name}
            </h2>
            <span className={styles.author}>Автор: {recipe.user.username}</span>
            <div className={styles.rateAndCommWrap}>
              <div className={styles.rateAndCommItem}>
                <img src={starIcon} alt="" />
                <span>
                  Рейтинг:{" "}
                  {ratingString.length > 3
                    ? ratingString.substring(0, 3)
                    : ratingString}
                </span>
              </div>
              <div className={styles.rateAndCommItem}>
                <span>Ингридиентов: {recipe.ingredients_count}</span>
              </div>
              <div className={styles.rateAndCommItem}>
                <img src={timeIcon} alt="" />
                <span>{time}</span>
              </div>
              <div className={styles.rateAndCommItem}>
                <img src={commentIcon} alt="" />
                <span>{recipe.comments_count}</span>
              </div>
            </div>
            <p className={styles.receptInfo}>{desc}</p>
            <SaveBtn id={recipe.id} isBookMarked={recipe.is_bookmarked} />
          </div>
        </div>
      </Container>
    );
  }
};

export default Card;
