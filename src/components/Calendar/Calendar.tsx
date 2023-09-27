import React, { useState, useEffect } from 'react';

import leftArrowIcon from '../../assets/icons/left-arrow.png';
import rigthArrowIcon from '../../assets/icons/right-arrow.png';

export const Calendar = () => {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [days, setDays] = useState<(string | number)[]>([]);

  useEffect(() => {
    generateCalendar(year, month);
  }, [year, month]);

  function generateCalendar(year, month) {
    const firstDayOfMonth = new Date(year, month - 1, 1);
    const lastDayOfMonth = new Date(year, month, 0);
    const numberOfDays = lastDayOfMonth.getDate();
    const startingDay = firstDayOfMonth.getDay();

    const calendarDays = [];

    for (let i = 1; i <= startingDay; i++) {
      calendarDays.push('');
    }

    for (let i = 1; i <= numberOfDays; i++) {
      calendarDays.push(i);
    }

    setDays(calendarDays);
  }

  function handlePrevMonth() {
    if (month === 1) {
      setYear(year - 1);
      setMonth(12);
    } else {
      setMonth(month - 1);
    }
  }

  function handleNextMonth() {
    if (month === 12) {
      setYear(year + 1);
      setMonth(1);
    } else {
      setMonth(month + 1);
    }
  }

  const monthName = new Date(year, month - 1, 1)
    .toLocaleDateString('en-US', { month: 'long' })
    .replace(/^\w/, (c) => c.toUpperCase());

  const handlerGetDate = (e: number) => {
    console.log(e, monthName);
  };

  return (
    <div className='calendar p-4 border border-inputDefault rounded-lg  max-w-[325px] bg-inputBG'>
      <div className='flex justify-between items-center mb-4 pl-4 pr-4'>
        <button onClick={handlePrevMonth} className='text-xl'>
          <img src={leftArrowIcon} alt='arrow icon' />
        </button>
        <h2 className='text-md font-semibold text-textPrimary flex gap-x-2'>
          <span>{`${monthName}`}</span> <span>{` ${year}`}</span>
        </h2>
        <button onClick={handleNextMonth} className='text-xl'>
          <img src={rigthArrowIcon} alt='arrow icon' />
        </button>
      </div>
      <div className='grid grid-cols-7  text-textPrimary'>
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day, index) => (
          <div key={index} className='text-center font-semibold text-gray-700'>
            {day}
          </div>
        ))}
        {days.map((day, index) => (
          <div
            key={index}
            onClick={() => handlerGetDate(day)}
            className='p-2 rounded-full hover:cursor-pointer'
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};
