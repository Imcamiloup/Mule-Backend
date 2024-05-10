import { Enlistment, Driver } from "../database/db.js";

export const createEnlistment = async (
  state,
  distance,
  delivery_time,
  order_time,
  price_order,
  qualify_user,
  qualify,
  comment,
  ordershipment_id,
  driver_id
) => {
  const numRandom = Math.floor(Math.random() * 10000000000);

  const newEnlistment = await Enlistment.create({
    guide_number: numRandom,
    state,
    distance,
    delivery_time,
    order_time,
    price_order,
    qualify_user,
    qualify,
    comment,
    ordershipment_id,
  });

  newEnlistment.addDrivers(driver_id);

  return newEnlistment;
};

export const getEnlistments = async (
  guide_number,
  state,
  distance,
  delivery_time,
  order_time,
  price_order,
  qualify_user,
  qualify,
  comment,
  ordershipment_id,
  orderBy,
  orderDirection
) => {
  let where = {};
  if (guide_number) where = { ...where, guide_number };
  if (state) where = { ...where, state };
  if (distance) where = { ...where, distance };
  if (delivery_time) where = { ...where, delivery_time };
  if (order_time) where = { ...where, order_time };
  if (price_order) where = { ...where, price_order };
  if (qualify_user) where = { ...where, qualify_user };
  if (qualify) where = { ...where, qualify };
  if (comment) where = { ...where, comment };
  if (ordershipment_id) where = { ...where, ordershipment_id };
  let order = [];
  if (orderBy && orderDirection) order = [[orderBy, orderDirection]];

  const enlistments = await Enlistment.findAll({
    where,
    order,
    include: {
      model: Driver,
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
  state,
  distance,
  delivery_time,
  order_time,
  price_order,
  qualify_user,
  qualify,
  comment,
  ordershipment_id
) => {
  const enlistmentById = await Enlistment.findByPk(id);

  if (!enlistmentById) throw Error("Enlistment not found");

  await enlistmentById.update({
    state,
    distance,
    delivery_time,
    order_time,
    price_order,
    qualify_user,
    qualify,
    comment,
    ordershipment_id,
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
