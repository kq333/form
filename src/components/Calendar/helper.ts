export function monthNameToNumber(monthName: string): string {
  const date = new Date(`1 ${monthName} 2000`);
  const monthNumber = date.getMonth() + 1;

  const formattedMonth = monthNumber.toString().padStart(2, '0');

  return formattedMonth;
}

export function dayNumberWithZero(clickedDay: number): string {
  return clickedDay <= 9 ? `0${clickedDay}` : clickedDay;
}
