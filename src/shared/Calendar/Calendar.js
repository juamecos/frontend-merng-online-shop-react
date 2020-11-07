import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { getYear, getMonth } from "date-fns";
import { useField, useFormikContext } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import "./Calendar.scss";
const Calendar = (
  { minDate, maxDate, value, onChange, name },
  { ...props }
) => {
  const [startDate, setStartDate] = useState(null);
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
  const range = (start, stop, step) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (_, i) => start + i * step
    );
  const years = range(1920, maxDate.getFullYear(), 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <DatePicker
      minDate={minDate}
      maxDate={maxDate}
      openToDate={maxDate}
      placeholderText="Enter birthday"
      name="birthdate"
      value={value}
      //   selected={(field.value && new Date(field.value)) || null}
      onChange={val => {
        setFieldValue(field.name, val);
      }}
      required
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div
          style={{
            margin: 10,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
            {"<"}
          </button>
          <select
            value={getYear(date)}
            onChange={({ target: { value } }) => changeYear(value)}
          >
            {years.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            value={months[getMonth(date)]}
            onChange={({ target: { value } }) =>
              changeMonth(months.indexOf(value))
            }
          >
            {months.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
            {">"}
          </button>
        </div>
      )}
      selected={startDate}
      onChange={date => setStartDate(date)}
    />
  );
};

export default Calendar;
