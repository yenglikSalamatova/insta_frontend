import React from "react";

const DaySelector = ({ value, onChange }) => {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <select value={value} onChange={onChange}>
      {days.map((day) => (
        <option key={day} value={day}>
          {day}
        </option>
      ))}
    </select>
  );
};

const MonthSelector = ({ value, onChange }) => {
  const months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  return (
    <select value={value} onChange={onChange}>
      {months.map((month, index) => (
        <option key={month} value={index + 1}>
          {month}
        </option>
      ))}
    </select>
  );
};

const YearSelector = ({ value, onChange }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  return (
    <select value={value} onChange={onChange}>
      {years.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  );
};

export { DaySelector, MonthSelector, YearSelector };
