import { Enlistment } from "../database/db.js";

export const getEnlistments = async (
  guide_number,
  state,
  distance,
  delivery_time,
  order_time,
  price_order,
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
  let order = [];
  if (orderBy && orderDirection) order = [[orderBy, orderDirection]];

  const enlistments = await Enlistment.findAll({
    where,
    order,
  });
  if (enlistments.length === 0) throw Error("Enlistments not found");

  return enlistments;
};

export const getEnlistmentById = async (id) => {
  const enlistmentById = Enlistment.findByPk(id);

  return enlistmentById;
};

export const patchEnlistment = async (id, state, delivery_time) => {
  const enlistment = await Enlistment.findByPk(id);

  if (!enlistment) throw Error("No enlistment found");

  enlistment.state = state;
  enlistment.delivery_time = delivery_time;

  await enlistment.save();
};
