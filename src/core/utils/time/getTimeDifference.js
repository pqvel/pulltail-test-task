export const getTimeDifference = (firstDate, secondDate) => {
  const time1 = new Date(firstDate).getTime();
  const time2 = new Date(secondDate).getTime();

  return time1 - time2;
};
