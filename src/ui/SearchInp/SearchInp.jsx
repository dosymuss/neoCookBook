import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Input from "../input/Input";

const SearchInp = ({ onInput }) => {
  const [inputValue, setInputValue] = useState("");
  const category = useSelector((state) => state.recipe.category);

  useEffect(() => {
    if (category.id !== 0) {
      setInputValue("");
    }
  }, [category]);

  // Функция дебаунса
  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  // Функция для обработки изменений ввода с использованием функции дебаунса
  const handleInputDebounced = debounce((value) => {
    onInput(value); // Здесь вызываем функцию обработчика с новым значением
  }, 800); // Задержка в 500 миллисекунд

  const handleChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
    handleInputDebounced(value); // Вызываем функцию дебаунса при каждом изменении ввода
  };

  return (
    <Input
      type="text"
      value={inputValue}
      onChange={handleChange}
      placeholder="Поиск"
    />
  );
};

export default SearchInp;
