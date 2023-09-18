export const getNextDay = (currentDate: Date) => {
  currentDate.setDate(currentDate.getDate() + 1);

  return currentDate;
};
