import { Vehicle } from "../database/db.js";

export const createVehicle = async (
  model,
  state,
  car_insurance,
  plate,
  fee,
  antiquity
) => {
  if (fee < 1 || fee > 10) throw Error("Fee range is between 1 and 10.");

  try {
    await Vehicle.create({
      model,
      state,
      car_insurance,
      plate,
      fee,
      antiquity,
    });
  } catch (error) {
    throw new Error("Error creating new vehicle: ", error.message);
  }
};

export const getVehicles = async () => {
  try {
    const vehicles = await Vehicle.findAll();

    return vehicles;
  } catch (error) {
    throw new Error("Error finding vehicles: ", error.message);
  }
};

export const getVehicleById = async (id) => {
  try {
    const vehicleById = Vehicle.findByPk(id);

    return vehicleById;
  } catch (error) {
    throw new Error("Error finding vehicle by ID: ", error.message);
  }
};

export const updateVehicle = async () => {};

export const deleteVehicle = async () => {};
