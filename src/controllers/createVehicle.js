import { Vehicle } from "../database/db.js";

const createVehicle = async (
  model,
  state,
  car_insurance,
  plate,
  fee,
  antiquity
) => {
  await Vehicle.create({ model, state, car_insurance, plate, fee, antiquity });
};

export default createVehicle;
