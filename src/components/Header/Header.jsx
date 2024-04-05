import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearch, setTitleText } from "../../store/recipeSlice";
import { useActions } from "../../hooks/useActions";

import Button from "../../ui/Button/Button";
import Container from "../../ui/Container/Container";
import ProfileSelect from "../../ui/profileSelect/ProfileSelect";
import styles from "./Header.module.scss";
import SearchInp from "../../ui/SearchInp/SearchInp";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { fetchRecipesByAll } = useActions();
  const tokenIsEmpty = localStorage.getItem("token");

  const handleInput = (value) => {
    console.log("Input value:", value);
    dispatch(setSearch(value));
    if (value) {
      dispatch(setTitleText(value));
    } else {
      dispatch(setTitleText("Все рецепты"));
    }
    fetchRecipesByAll();
    // Здесь можно выполнить какие-либо действия с новым значением ввода
  };

  return (
    <Container>
      <div className={styles.main}>
        <div>
          <h1 onClick={() => navigate("/")} className={styles.title}>
            Мои рецепты
          </h1>
          <SearchInp onInput={handleInput} />
        </div>
        <div>
          <div className={styles.addRecipeBtnDiv}>
            <Button
              onClick={() => navigate("/edit_page/0")}
              isValid={tokenIsEmpty}
              text={"Добавить рецепт"}
            />
          </div>
          <ProfileSelect />
        </div>
      </div>
    </Container>
  );
};

export default Header;
