import { Vehicle } from "../database/db.js";

export const createVehicle = async (
  model,
  state,
  car_insurance,
  plate,
  fee,
  antiquity
) => {
  await Vehicle.create({
    model,
    state,
    car_insurance,
    plate,
    fee,
    antiquity,
  });
};

export const getVehicles = async () => {
  const vehicles = await Vehicle.findAll();

  if (vehicles.length === 0) throw Error("Vehicles not found");

  return vehicles;
};

export const getVehicleById = async (id) => {
  const vehicleById = Vehicle.findByPk(id);

  return vehicleById;
};

export const updateVehicle = async (
  id,
  model,
  state,
  car_insurance,
  plate,
  fee,
  antiquity
) => {
  const vehicleById = await Vehicle.findByPk(id);

  if (!vehicleById) throw Error("Vehicle not found");

  await vehicleById.update({
    model,
    state,
    car_insurance,
    plate,
    fee,
    antiquity,
  });
};

export const deleteVehicle = async (id) => {
  const vehicleById = await Vehicle.findByPk(id);

  if (!vehicleById) throw Error("Vehicle not found");

  await vehicleById.destroy({
    where: {
      id: id,
    },
  });
};
