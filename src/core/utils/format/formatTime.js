export const formatPickUpDate = (pickUpStart, pickUpEnd) => {
  const pickUpStartDate = new Date(pickUpStart);
  const pickUpEndDate = new Date(pickUpEnd);

  const startMonth = pickUpStartDate.getMonth() + 1;
  const startDay = pickUpEndDate.getDate();

  const endMonth = pickUpEndDate.getMonth() + 1;
  const endDay = pickUpEndDate.getDate();

  return `${startMonth}/${startDay} - ${endMonth}/${endDay}`;
};

export const formatRangeDate = (dateString) => {
  let date = new Date(dateString);

  let monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const month = monthNames[date.getMonth()];
  const day = date.getDate();

  return `${month} ${day}`;
};
