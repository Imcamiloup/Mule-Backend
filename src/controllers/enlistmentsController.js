import { Enlistment, Vehicle } from "../database/db.js";

export const createEnlistment = async (
  destiny,
  state,
  distance,
  delivery_time,
  // order_time,
  // price_order,
  // qualify_user,
  // qualify_order,
  vehicle_id
) => {
  const newEnlistment = await Enlistment.create({
    destiny,
    state,
    distance,
    delivery_time,
    // order_time,
    // price_order,
    // qualify_user,
    // qualify_order,
  });

  newEnlistment.addVehicles(vehicle_id);
};

export const getEnlistsments = async () => {
  const enlistments = await Enlistment.findAll({
    include: {
      model: Vehicle,
      attributes: ["id"],
      through: { attributes: [] },
    },
  });

  if (enlistments.length === 0) throw Error("Enlistments not found");

  return enlistments;
};

export const getEnlistmentById = async (id) => {
  const enlistmentById = Enlistment.findByPk(id);

  return enlistmentById;
};

export const updateEnlistment = async () => {};

export const deleteEnlistment = async () => {};
