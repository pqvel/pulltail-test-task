export const getTimeDifference = (firstDate, secondDate) => {
  const time1 = new Date(firstDate).getTime();
  const time2 = new Date(secondDate).getTime();
  console.log(`${time1} - ${time2}`);
  // console.log(time2);
  return time1 - time2;
};
