import { loads, truckTypes } from "../data";

export const useLoadsService = () => {
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
