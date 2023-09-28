import React, { useState, useEffect } from 'react';

import leftArrowIcon from '../../assets/icons/left-arrow.png';
import rigthArrowIcon from '../../assets/icons/right-arrow.png';
import { monthNameToNumber, dayNumberWithZero } from './helper';
import infoIcon from '../../assets/icons/info.png';

interface Props {
  appointmentDate: (calendarData: { hour: string; date: string }) => void;
}

export const Calendar: React.FC<Props> = ({ appointmentDate }) => {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [days, setDays] = useState<(string | number)[]>([]);
  const [calendarDays, setCalendarDays] = useState([]);
  const [clickedDay, setClickedDay] = useState<number>(null);

  const [holidayName, setHolidayName] = useState<string>('');
  const [timeSlot, setTimeSlot] = useState<string>('');

  const timeSlots = ['12:00', '14:00', '15:30', '16:00', '17:00'];

  useEffect(() => {
    generateCalendar(year, month);
  }, [year, month]);

  function generateCalendar(year, month) {
    const firstDayOfMonth = new Date(year, month - 1, 1);
    const lastDayOfMonth = new Date(year, month, 0);
    const numberOfDays = lastDayOfMonth.getDate();

    let startingDay = firstDayOfMonth.getDay();
    if (startingDay === 0) {
      startingDay = 7;
    }

    const calendarDays = [];

    for (let i = 1; i < startingDay; i++) {
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

  const handlerGetDate = (dayNumber: number) => {
    const day = dayNumberWithZero(dayNumber);
    let isHolidayFound = false;

    setClickedDay(dayNumber);

    for (const checkday of calendarDays) {
      const targetDate = `${year}-${monthNameToNumber(monthName)}-${day}`;

      if (checkday.date === targetDate) {
        setHolidayName(checkday.name);
        isHolidayFound = true;
        break;
      }
    }

    if (!isHolidayFound) {
      setHolidayName('');
    }
  };

  const URL = `https://api.api-ninjas.com/v1/holidays?country=PL&year=${year}`;

  const apiKey = '8DX8eEe67njS1lbThFsdSw==rQQNpQ8PYbPZBjrx';

  useEffect(() => {
    fetch(URL, {
      method: 'GET',
      headers: {
        'X-Api-Key': apiKey,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setCalendarDays(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [URL]);

  const holidayClassName = (day, index) => {
    const formattedDate = `${year}-${monthNameToNumber(monthName).padStart(
      2,
      '0',
    )}-${day.toString().padStart(2, '0')}`;

    const nationalHolidays = calendarDays.filter(
      (checkday) =>
        checkday.type === 'NATIONAL_HOLIDAY' && checkday.date === formattedDate,
    );

    if (day === clickedDay) {
      return 'p-2  hover:cursor-pointer text-center w-8 h-8 bg-inputFocus rounded-full text-inputBG flex justify-center items-center mt-1 ml-1 ';
    } else if (nationalHolidays.length > 0 || (index + 1) % 7 === 0) {
      return 'p-2 text-textSecond   text-center pointer-events-none ';
    } else {
      return 'p-2  hover:cursor-pointer text-textPrimary   text-center  ';
    }
  };

  useEffect(() => {
    const day = dayNumberWithZero(clickedDay);
    if (timeSlot.length > 0) {
      appointmentDate({
        hour: timeSlot,
        data: `${day}-${monthNameToNumber(monthName)}-${year}`,
      });
    }
  }, [clickedDay, month, year, timeSlot, appointmentDate, monthName]);

  return (
    <div>
      <div className='block md:flex justify-between text-textPrimary'>
        <div>
          <p className=''>Date</p>
          <div className=' block md:flex justify-between pt-2'>
            <div className='calendar p-4 border border-inputDefault rounded-lg  max-w-[325px] w-full bg-inputBG'>
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
              <ul className='grid grid-cols-7  text-textPrimary'>
                {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(
                  (day, index) => (
                    <li
                      key={index}
                      className='text-center font-semibold text-gray-700'
                    >
                      {day}
                    </li>
                  ),
                )}
                {days.map((day, index) => (
                  <ul
                    key={index}
                    onClick={() => handlerGetDate(day)}
                    className={holidayClassName(day, index)}
                  >
                    <li className='flex justify-center items-center'>{day}</li>
                  </ul>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {clickedDay && (
          <div className='pt-6 md:pt-0'>
            <p className=''>Time</p>

            <ul className='flex flex-wrap md:flex-col gap-2 pt-2'>
              {timeSlots.map((time, index) => (
                <li
                  key={index}
                  onClick={() => setTimeSlot(time)}
                  className={`${
                    time === timeSlot
                      ? 'border-2 border-inputFocus rounded-lg inline-block p-2 w-[76px] text-center text-textPrimary hover:cursor-pointer'
                      : 'border-2  border-inputDefault  rounded-lg inline-block p-2 w-[76px] text-center text-textPrimary hover:cursor-pointer'
                  }`}
                >
                  {time}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {holidayName.length > 0 && (
        <div className='flex items-center gap-2 pt-2'>
          <img src={infoIcon} alt='icon' className='h-4 w-4 ' />
          <p className='text-inputDefault text-sm'>{`It is Polish ${holidayName}`}</p>
        </div>
      )}
    </div>
  );
};
