import { query } from "express";
import { Vehicle } from "../database/db.js";

export const createVehicle = async (
  model,
  state,
  car_insurance,
  plate,
  tecnical_review,
  driving_licence,
  cargo_manifest,
  news
) => {
  const newVehicle = await Vehicle.create({
    model,
    state,
    car_insurance,
    plate,
    tecnical_review,
    driving_licence,
    cargo_manifest,
    news,
  });

  return newVehicle;
};

export const getVehicles = async () => {
  const vehicles = await Vehicle.findAll({});

  if (vehicles.length === 0) throw Error("Vehicles not found");

  return vehicles;
};

export const getVehiclesByQuery = async (
  model,
  state,
  car_insurance,
  plate,
  tecnical_review,
  driving_licence,
  cargo_manifest
) => {
  let where = {};
  if (model) where = { ...where, model };
  if (state) where = { ...where, state };
  if (car_insurance) where = { ...where, car_insurance };
  if (plate) where = { ...where, plate };
  if (tecnical_review) where = { ...where, tecnical_review };
  if (driving_licence) where = { ...where, driving_licence };
  if (cargo_manifest) where = { ...where, cargo_manifest };

  console.log(where);

  const vehicles = await Vehicle.findAll({
    where,
  });

  if (vehicles.length === 0) throw Error("Vehicles not found");

  return vehicles;
};

export const getVehicleById = async (id) => {
  const vehicleById = await Vehicle.findByPk(id);

  return vehicleById;
};

export const updateVehicle = async (
  id,
  model,
  state,
  car_insurance,
  plate,
  tecnical_review,
  driving_licence,
  cargo_manifest,
  news
) => {
  const vehicleById = await Vehicle.findByPk(id);

  if (!vehicleById) throw Error("Vehicle not found");

  await vehicleById.update({
    model,
    state,
    car_insurance,
    plate,
    tecnical_review,
    driving_licence,
    cargo_manifest,
    news,
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
