import { useActions } from "../../hooks/useActions";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import Categories from "../../components/Categories/Categories/Categories";
import Header from "../../components/Header/Header";
import ResultAndFilter from "../../components/ResultAndFilter/ResultAndFilter";
import Card from "../../ui/Card/Card";
import SearchNoneText from "../../ui/SearchNoneText/SearchNoneText";
import Paginate from "../../ui/Paginate/Paginate";

import styles from "./MainPage.module.scss";
import Container from "../../ui/Container/Container";

const MainPage = () => {
  const { fetchGetRecipes } = useActions();

  useEffect(() => {
    fetchGetRecipes();
  }, []);

  const recipe = useSelector((state) => state.recipe);

  useEffect(() => {
    console.log(recipe);
  }, [recipe]);

  return (
    <div>
      <Header />
      <Categories />
      <ResultAndFilter count={recipe.totalCount} title={recipe.titleText} />
      {Object.keys(recipe.recipes).length > 0 ? (
        recipe.recipes.map((item) => <Card key={item.id} recipe={item} />)
      ) : (
        <SearchNoneText />
      )}
      <Container>
        <div className={styles.paginateDiv}>
          {recipe.totalPages > 1 && <Paginate pageCount={recipe.totalPages} />}
        </div>
      </Container>
    </div>
  );
};

export default MainPage;
