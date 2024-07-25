import { sortingOrders, sortings } from "../constants";
import { getTimeDifference } from "../utils/time";

const sortByAge = (loads, order) => {
  return sortingOrders.desc === order
    ? loads.sort((a, b) => b.age - a.age)
    : loads.sort((a, b) => a.age - b.age);
};

const sortByRate = (loads, order) => {
  return sortingOrders.desc === order
    ? loads.sort((a, b) => b.amount - a.amount || !a.amount)
    : loads.sort((a, b) => a.amount - b.amount || a.amount);
};

const sortPickUp = (loads, order) => {
  const compare = (a, b) => {
    return getTimeDifference(b.datePickUpStart, a.datePickUpStart);
  };

  return loads.sort((a, b) => {
    return sortingOrders.desc === order ? compare(b, a) : compare(a, b);
  });
};

export const loadsSortingReducer = (loads, { sortingOrder, sortingName }) => {
  switch (sortingName) {
    case sortings.age:
      return sortByAge(loads, sortingOrder);
    case sortings.rate:
      return sortByRate(loads, sortingOrder);
    case sortings.pickUp:
      return sortPickUp(loads, sortingOrder);
    default:
      return loads;
  }
};
