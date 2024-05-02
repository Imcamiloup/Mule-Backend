import { Vehicle } from "../database/db.js";

const getVehicles = async () => {
  const vehicles = await Vehicle.findAll();

  return vehicles;
};

export default getVehicles;
