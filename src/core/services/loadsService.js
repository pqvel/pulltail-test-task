import { loads, truckTypes } from "../data";

export const loadsService = () => {
  const getLoads = () => {
    return loads;
  };

  const getTruckTypes = () => {
    return truckTypes;
  };

  return {
    getLoads,
    getTruckTypes,
  };
};
