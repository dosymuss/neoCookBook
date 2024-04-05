import { useState } from "react";
import ReactPaginate from "react-paginate";
import { setPage } from "../../store/recipeSlice";
import { useDispatch } from "react-redux";
import { useActions } from "../../hooks/useActions";

import "./Paginate.scss";

const Paginate = ({ pageCount }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const dispatch = useDispatch();
  const { fetchRecipesByAll } = useActions();

  const onPageChange = (selectedPage) => {
    console.log("Выбрана страница:", selectedPage);
    // Ваша логика для обновления данных на странице, основанная на выбранной странице
    dispatch(setPage(selectedPage + 1));
    fetchRecipesByAll();
  };

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
    onPageChange(selectedPage);
  };

  return (
    <ReactPaginate
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={handlePageClick}
      containerClassName={"pagination"}
      activeClassName={"active"}
      pageClassName={"page-item"}
      pageLinkClassName={"page-link"}
      breakClassName={"page-item"}
      breakLinkClassName={"page-link"}
      disableInitialCallback={true} // Отключаем инициализацию callback
      previousLabel={null} // Устанавливаем null для кнопки "Previous"
      nextLabel={null} // Устанавливаем null для кнопки "Next"
    />
  );
};

export default Paginate;
