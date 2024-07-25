import { loadTypes } from "../constants";
import { truckTypes } from "../data";

const filterByEquipments = (load, equipments) => {
  if (equipments.length === 0) return true;

  const loadEquipmentCode = truckTypes[load.equipment].code;

  return equipments.some((item) => item.code === loadEquipmentCode);
};

const filterByLoadType = (load, loadType) => {
  loadType;
  switch (loadType) {
    case loadTypes.full:
      return load.fullPartial === 1;
    case loadTypes.partial:
      return load.fullPartial === 2;
    case loadTypes.fullAndPartial:
      return true;
    default:
      return false;
  }
};

const filterByWeight = (load, weight) => {
  return weight === null || load.weight >= weight;
};

const filterByLength = (load, length) => {
  return length === null || load.length >= length;
};

const filterByLocation = (load, { origin, destination }) => {
  if (origin && load.addressPickUp.city !== origin) return false;
  if (destination && load.addressDropOff.city !== destination) return false;

  return true;
};

const filterByDate = (load, { pickUp, dropOff }) => {
  if (!pickUp && !pickUp) return true;
  const loadPickUpDate = load.datePickUpStart
    ? new Date(load.datePickUpStart)
    : null;
  const loadDropOffDate = load.dateDropOff ? new Date(load.dateDropOff) : null;
  const rangePickUpDate = pickUp ? new Date(pickUp) : null;
  const rangeDropOffDate = dropOff ? new Date(dropOff) : null;

  const isWithinRange = (date, rangeStart, rangeEnd) => {
    return date >= rangeStart && date <= rangeEnd;
  };

  if (rangePickUpDate && rangeDropOffDate) {
    return (
      (loadPickUpDate &&
        isWithinRange(loadPickUpDate, rangePickUpDate, rangeDropOffDate)) ||
      (loadDropOffDate &&
        isWithinRange(loadDropOffDate, rangePickUpDate, rangeDropOffDate)) ||
      (loadPickUpDate &&
        loadDropOffDate &&
        (isWithinRange(loadPickUpDate, rangePickUpDate, rangeDropOffDate) ||
          isWithinRange(loadDropOffDate, rangePickUpDate, rangeDropOffDate) ||
          (loadPickUpDate <= rangePickUpDate &&
            loadDropOffDate >= rangeDropOffDate)))
    );
  }

  if (rangePickUpDate && !rangeDropOffDate) {
    return (
      (loadPickUpDate &&
        isWithinRange(
          loadPickUpDate,
          rangePickUpDate,
          loadDropOffDate || loadPickUpDate
        )) ||
      (loadDropOffDate &&
        isWithinRange(
          loadDropOffDate,
          rangePickUpDate,
          loadDropOffDate || loadPickUpDate
        ))
    );
  }

  if (!rangePickUpDate && rangeDropOffDate) {
    return (
      (loadPickUpDate &&
        isWithinRange(
          loadPickUpDate,
          loadPickUpDate || loadDropOffDate,
          rangeDropOffDate
        )) ||
      (loadDropOffDate &&
        isWithinRange(
          loadDropOffDate,
          loadPickUpDate || loadDropOffDate,
          rangeDropOffDate
        ))
    );
  }

  return false;
};
export const loadsFilterReducer = (loads, filters) => {
  return loads.filter((load) => {
    return (
      filterByLocation(load, filters.location) &&
      filterByEquipments(load, filters.equipments) &&
      filterByLoadType(load, filters.loadType) &&
      filterByWeight(load, filters.weight) &&
      filterByLength(load, filters.length) &&
      filterByDate(load, filters.date)
    );
  });
};
