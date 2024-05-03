import { Vehicle } from "../database/db.js";

export const createVehicle = async (
  model,
  state,
  car_insurance,
  plate,
  fee,
  antiquity
) => {
  await Vehicle.create({ model, state, car_insurance, plate, fee, antiquity });
};

export const getVehicles = async () => {
  const vehicles = await Vehicle.findAll();

  return vehicles;
};

export const getVehicleById = () =>{
  
}