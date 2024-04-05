import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useActions } from "../../../hooks/useActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setCategoryAction,
  setTitleText,
  setPage,
  setSearch,
} from "../../../store/recipeSlice";

import Container from "../../../ui/Container/Container";
import CategoriesItem from "../CategoriesItem/CategoriesItem";

import styles from "./Categories.module.scss";
import CategoriesSelect from "../CategoriesSelect/CategoriesSelect";

const Categories = () => {
  const { getCategories, fetchRecipesByAll } = useActions();
  const [category, setCategory] = useState({
    id: 0,
    name: "Все рецепты",
  });

  useEffect(() => {
    getCategories();
  }, []);

  const categories = useSelector((state) => state.category.categories);

  const categoriesSlice = categories.slice(0, 9);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setCategoryAction({ category }));
    dispatch(setTitleText(category.name));
    dispatch(setPage(1));
    dispatch(setSearch(""));
    fetchRecipesByAll();
  }, [category]);

  const navigateFunc = () => {
    navigate("/");
  };

  return (
    <Container>
      <div className={styles.main}>
        <CategoriesItem
          item={{
            id: 0,
            name: "Все рецепты",
          }}
          category={category}
          setCategory={setCategory}
        />
        {categoriesSlice.map((item) => (
          <CategoriesItem
            navigateFunc={navigateFunc}
            setCategory={setCategory}
            category={category}
            item={item}
          />
        ))}
        <CategoriesSelect navigateFunc={navigateFunc} category={category} setCategory={setCategory} />
      </div>
    </Container>
  );
};

export default Categories;
