import Container from "../Container/Container";

import styles from "./SearchNoneText.module.scss";

const SearchNoneText = () => {
  return (
    <Container>
      <div className={styles.main}>
        <div>
          <h2 className={styles.title}>Рецепты не найдены</h2>
          <p className={styles.desc}>Попробуйте ввести другие ключевые слова</p>
        </div>
      </div>
    </Container>
  );
};

export default SearchNoneText;
