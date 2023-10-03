export function timestampConvert(timestamp) {
  const currentTime = new Date();
  const timeDifference = currentTime - new Date(timestamp);

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;

  if (timeDifference < minute) {
    return "меньше минуты назад";
  } else if (timeDifference < hour) {
    const minutesAgo = Math.floor(timeDifference / minute);
    return `${minutesAgo} мин.`;
  } else if (timeDifference < day) {
    const hoursAgo = Math.floor(timeDifference / hour);
    return `${hoursAgo} ч.`;
  } else if (timeDifference < week) {
    const daysAgo = Math.floor(timeDifference / day);
    return `${daysAgo} дн.`;
  } else {
    const date = new Date(timestamp);
    const dayOfMonth = date.getDate();
    const month = date.toLocaleString("ru-RU", { month: "long" });
    const year = date.getFullYear();
    return `${dayOfMonth} ${month} ${year}`;
  }
}
