export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};


export function convertTimeToReadable(timeStr) {
  // Разбиваем время на часы, минуты и секунды
  if(timeStr===null){return "0 минут"}
  const [days, hours, minutes] = timeStr.split(':').map(Number);

  // Проверяем, есть ли часы
  if (days > 1) {
    return `${days} дней ${hours} час ${minutes} минут`;
  }
  if (hours > 0) {
    return `${hours} час ${minutes} минут`;
  } else {
    return `${minutes} минут`;
  }
}

export const convertTextFunc = (text)=>{
  return `${text.slice(0, 93)}...`
}

export function formatDateTime(dateTimeString, timeZoneOffset) {
  const date = new Date(dateTimeString);

  // Применяем смещение часового пояса
  date.setTime(date.getTime() + (timeZoneOffset * 60 * 60 * 1000));

  // Форматируем дату и время
  const formattedDate = `${('0' + date.getDate()).slice(-2)}.${('0' + (date.getMonth() + 1)).slice(-2)}.${date.getFullYear()} в ${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`;

  return formattedDate;
}