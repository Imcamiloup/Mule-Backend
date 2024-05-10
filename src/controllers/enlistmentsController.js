import { Enlistment, OrderShipment } from "../database/db.js";

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
  numRandom = Math.floor(Math.random() * 10000000000);

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

export const getEnlistments = async () => {
  const enlistments = await Enlistment.findAll({});

  if (enlistments.length === 0) throw Error("Enlistments not found");

  return enlistments;
};

export const getEnlistmentsByQuery = async (query) => {};

export const getEnlistmentById = async (id) => {
  const enlistmentById = Enlistment.findByPk(id);

  return enlistmentById;
};

export const updateEnlistment = async (
  id,
  shipping_date,
  sender,
  origin,
  destiny,
  status,
  service_type
) => {
  const enlistmentById = await Enlistment.findByPk(id);

  if (!enlistmentById) throw Error("Enlistment not found");

  await enlistmentById.update({
    shipping_date,
    sender,
    origin,
    destiny,
    status,
    service_type,
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
