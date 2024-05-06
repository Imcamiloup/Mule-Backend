import { Vehicle, Enlistment } from "../database/db.js";

export const createVehicle = async (model, state, car_insurance, plate) => {
  const newVehicle = await Vehicle.create({
    model,
    state,
    car_insurance,
    plate,
  });

  return newVehicle;
};

export const getVehicles = async () => {
  const vehicles = await Vehicle.findAll({
    include: {
      model: Enlistment,
      attributes: ["id"],
      through: { attributes: [] },
    },
  });

  if (vehicles.length === 0) throw Error("Vehicles not found");

  return vehicles;
};

export const getVehiclesByState = async (query) => {
  const vehiclesByState = await Vehicle.findAll({
    where: {
      state: query,
    },
    include: {
      model: Enlistment,
      attributes: ["id"],
      through: { attributes: [] },
    },
  });

  if (vehiclesByState.length === 0) throw Error("Vehicles not found");

  return vehiclesByState;
};

export const getVehicleById = async (id) => {
  const vehicleById = await Vehicle.findByPk(id);

  return vehicleById;
};

export const updateVehicle = async (id, model, state, car_insurance, plate) => {
  const vehicleById = await Vehicle.findByPk(id);

  if (!vehicleById) throw Error("Vehicle not found");

  await vehicleById.update({
    model,
    state,
    car_insurance,
    plate,
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
