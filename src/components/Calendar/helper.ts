export function monthNameToNumber(monthName: string): string {
  const date = new Date(`1 ${monthName} 2000`);
  const monthNumber = date.getMonth() + 1;

  const formattedMonth = monthNumber.toString().padStart(2, '0');

  return formattedMonth;
}

export function dayNumberWithZero(clickedDay: number | string): string {
  const dayNumber =
    typeof clickedDay === 'string' ? parseInt(clickedDay, 10) : clickedDay;
  return dayNumber <= 9 ? `0${dayNumber}` : dayNumber.toString();
}
