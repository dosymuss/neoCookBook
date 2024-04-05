import { useActions } from "../../../hooks/useActions";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import timeIcon from "../../../assets/EditPage/timeIcon.svg";
import videoIcon from "../../../assets/EditPage/videoIcon.svg";
import imageIcon from "../../../assets/EditPage/ImageIcon.svg";

import EditDragInp from "../EditDragInp/EditDragInp";

import styles from "./EditPageForm.module.scss";
import EditLargeInp from "../EditLargeInp/EditLargeInp";
import EditIngredInp from "../EditIngredInp/EditIngredInp";
import EditCategoryInp from "../EditCategoryInp/EditCategoryInp";
import Button from "../../../ui/Button/Button";
import { useSelector } from "react-redux";

const EditPageForm = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { fetchPostRecipe, fetchGetRecipeById, fetchPutRecipe } = useActions();

  useEffect(() => {
    if (id !== "0") {
      fetchGetRecipeById(id);
    }
  }, [id]);

  const recipe = useSelector((state) => state.recipe.recipe);

  const [ingredList, setIngredList] = useState([
    {
      name: "",
      amount: "",
    },
  ]);
  const [name, setName] = useState("");
  const [time, setTime] = useState({
    hour: "",
    minute: "",
  });
  const [url, setUrl] = useState(null);
  const [imageId, setImageId] = useState(null);
  const [result, setResult] = useState(null);
  const [desc, setDesc] = useState("");
  const [instruction, setInstruction] = useState("");

  console.log(recipe);

  const postRecipe = () => {
    const obj = {
      name: name,
      description: desc,
      category: result,
      image: imageId,
      ingredients: ingredList,
      cooking_description: instruction,
      cooking_url: url,
      cooking_time: `${String(time.hour).padStart(2, "0")}:${String(
        time.minute
      ).padStart(2, "0")}`,
    };

    if (id !== "0") {
      fetchPutRecipe({
        id: id,
        data: obj,
      });
      navigate("/my_profile");
    } else {
      fetchPostRecipe(obj);
      navigate("/my_profile");
    }
  };

  useEffect(() => {
    if (id !== "0") {
      setName(recipe.name);
      setUrl(recipe.cooking_url === null ? "" : recipe.cooking_url);
      setDesc(recipe.description);
      setInstruction(recipe.cooking_description);
    }
  }, [id, recipe]);

  return (
    <div className={styles.wrap}>
      <div className={styles.main}>
        <div className={styles.nameDiv}>
          <span>Ваш новый рецепт</span>
          <input
            className={styles.nameInp}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Название рецепта"
          />
        </div>
        <div className={styles.timeDiv}>
          <div>
            <img src={timeIcon} alt="" />
            <p className={styles.textStyle}>Время приготовления:</p>
          </div>

          <div className={styles.timeInp}>
            <input
              value={time.hour}
              onChange={(e) => setTime({ ...time, hour: e.target.value })}
              placeholder="0"
              type="text"
            />
            <p className={styles.timeText}>часов</p>
          </div>
          <div className={styles.timeInp}>
            <input
              value={time.minute}
              onChange={(e) => setTime({ ...time, minute: e.target.value })}
              placeholder="0"
              type="text"
            />
            <p className={styles.timeText}>минут</p>
          </div>
        </div>
        <div className={styles.videoDiv}>
          <div>
            <img src={videoIcon} alt="" />
            <p className={styles.textStyle}>
              Видео с приготовлением блюда (необязательно):
            </p>
          </div>
          <input
            className={styles.videoInp}
            type="text"
            value={url}
            placeholder="Ссылка на видео"
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className={styles.dragDiv}>
          <div>
            <img src={imageIcon} alt="" />
            <p className={styles.textStyle}>Фото готового блюда:</p>
          </div>
          <EditDragInp
            url={id !== "0" ? (recipe.image ? recipe.image.file : null) : null}
            imageId={imageId}
            setImageId={setImageId}
          />
        </div>
        <EditCategoryInp
          value={id !== "0" ? recipe?.category : ""}
          result={result}
          setResult={setResult}
        />
        <EditLargeInp text={"Описание:"} value={desc} setValue={setDesc} />
        <EditIngredInp ingredList={ingredList} setIngredList={setIngredList} />
        <EditLargeInp
          text={"Приготовление:"}
          big={true}
          value={instruction}
          setValue={setInstruction}
        />
        <div className={styles.btnDiv}>
          <div>
            <Button
              onClick={postRecipe}
              text={"Добавить рецепт"}
              isValid={
                name !== "" &&
                (time.hour !== "" || time.minute !== "") &&
                imageId &&
                result &&
                desc !== "" &&
                instruction !== "" &&
                ingredList.length > 0 &&
                ingredList[0].name !== "" &&
                ingredList[0].amount !== ""
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPageForm;
