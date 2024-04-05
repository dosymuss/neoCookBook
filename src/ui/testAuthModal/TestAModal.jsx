// import { useState } from "react";
// import styles from "./TestAModal.module.scss";

// const TestAModal = () => {
//   const [click, setClick] = useState(false);

//   const handleClick = () => {
//     setClick(!click);
//   };

//   return (
//     <div className={styles.container}>
//       <div className={`${styles.box} ${click ? styles.moveRight : styles.moveLeft}`}>
//         <h1>Auth</h1>
//       </div>
//       <div className={styles.buttonContainer}>
//         <button onClick={handleClick}>Click</button>
//       </div>
//     </div>
//   );
// };

// export default TestAModal;

// import PinInput from "react-pin-input";
// import styles from "./TestAModal.module.scss";
// import { useSelector } from "react-redux";

// const TestAModal = () => {
//   const user = useSelector(state=>state.user)
//   console.log(user);
//   return (
//     <PinInput
//       length={4}
//       initialValue=""
//       type="numeric"
//       inputMode="number"
//       style={{ padding: "10px" }}
//       inputStyle={{
//         borderRadius: "16px",
//         padding: "12px 16px",
//         width: "55px",
//         height: "60px",
//         backgroundColor: "#f1f1f1",
//         fontWeight: "500",
//         fontSize: "32px",
//         textAlign: "center",
//         color: "#4b4242",
//         border:"none"
//       }}
//       onComplete={(value, index) => {
//         console.log(value, index);
//       }}
//       autoSelect={true}
//       regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
//     />
//   );
// };

// export default TestAModal;

// length={4}: Устанавливает длину пин-кода, то есть количество символов, которые пользователь должен ввести.
// initialValue="": Задает начальное значение пин-кода. В данном случае, пустая строка означает, что изначально поле для ввода будет пустым.
// secret: Определяет, будут ли введенные символы отображаться как маски (например, звездочки) или как обычный текст.
// secretDelay={100}: Задает задержку (в миллисекундах) перед тем, как введенные символы станут маской. В данном случае, задержка составляет 100 миллисекунд.
// onChange={(value, index) => {}}: Функция обратного вызова, которая вызывается при изменении значения пин-кода. Параметр value представляет текущее значение пин-кода, а index - индекс измененного символа.
// type="numeric": Определяет тип ввода для поля пин-кода. Здесь используется числовой тип, что означает, что пользователь может вводить только цифры.
// inputMode="number": Устанавливает режим ввода для поля пин-кода. В данном случае, режим ввода - числовой, что подходит для ввода только цифр.
// style={{padding: '10px'}}: Стилизует основной контейнер компонента PinInput, добавляя отступы по 10 пикселей.
// inputStyle={{borderColor: 'red'}}: Устанавливает стили для поля ввода пин-кода. В данном случае, устанавливается цвет границы поля - красный.
// inputFocusStyle={{borderColor: 'blue'}}: Устанавливает стили для поля ввода пин-кода в фокусе. В данном случае, устанавливается цвет границы поля при фокусе - синий.
// onComplete={(value, index) => {}}: Функция обратного вызова, которая вызывается при завершении ввода всех символов пин-кода. Параметр value представляет полное значение пин-кода, а index - последний измененный символ.
// autoSelect={true}: Указывает, нужно ли автоматически выделять текст в поле ввода пин-кода при фокусе на нем. В данном случае, установлено значение true, что означает автоматический выбор текста.
// regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}: Определяет регулярное выражение, которое описывает допустимые символы для ввода. В данном случае, разрешены символы латинского алфавита (в верхнем и нижнем регистрах), цифры, а также некоторые специальные символы (пробел, @, . и т. д.).

import "./style.css"

import React, { useState } from "react";
import ReactPaginate from "react-paginate";

function TestAModal() {
  const [currentPage, setCurrentPage] = useState(0);

  const onPageChange = (selectedPage) => {
    console.log('Выбрана страница:', selectedPage);
    // Ваша логика для обновления данных на странице, основанная на выбранной странице
  };
  
  // Пример значения количества страниц
  const pageCount = 10; // В этом примере у нас 10 страниц
  
  // Пример использования компонента пагинации

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
}



export default TestAModal;
