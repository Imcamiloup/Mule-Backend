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
  freigth_description,
  freigth_weigth,
  freigth_measures,
  freigth_type,
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
    freigth_description,
    freigth_weigth:
      freigth_weigth == 1 ? `${freigth_weigth} kg` : `${freigth_weigth} kgs`,
    freigth_measures,
    freigth_type,
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

export const updateEnlistment = async (
  id,
  destiny,
  state,
  distance,
  delivery_time,
  // order_time,
  // price_order,
  // qualify_user,
  // qualify_order,
  freigth_description,
  freigth_weigth,
  freigth_measures,
  freigth_type
) => {
  const enlistmentById = await Enlistment.findByPk(id);

  if (!enlistmentById) throw Error("Enlistment not found");

  await enlistmentById.update({
    destiny,
    state,
    distance,
    delivery_time,
    // order_time,
    // price_order,
    // qualify_user,
    // qualify_order,
    freigth_description,
    freigth_weigth:
      freigth_weigth == 1 ? `${freigth_weigth} kg` : `${freigth_weigth} kgs`,
    freigth_measures,
    freigth_type,
  });
};

export const deleteEnlistment = async (id) => {
  const enlistmentById = await Enlistment.findByPk(id);

  if (!enlistmentById) throw Error("Enlistmen not found");

  await enlistmentById.destroy({
    where: {
      id: id,
    },
  });
};
