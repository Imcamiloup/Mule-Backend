import { OrderShipment, User, Enlistment } from "../database/db.js";
import DISTANCES from "../utils/EnlistmentHelpers/distancesApi.js";

import {
  calculateCost,
  calculateWeightByInput,
  TIMES,
  selectDriver,
} from "../utils/EnlistmentHelpers/distancesApi.js";

const getAllOrderShipmentsController = async (
  name_claimant,
  cedula_claimant,
  cellphone_claimant,
  name_transmiter,
  surname_transmiter,
  celphone_transmiter,
  city_transmiter,
  pay_method,
  typeShipmentId,
  measureId,
  city_receiver,
  declared_value,
  name_receiver,
  weight,
  orderBy,
  orderDirection
) => {
  let where = {};

  if (name_claimant) where = { ...where, name_claimant };
  if (cedula_claimant) where = { ...where, cedula_claimant };
  if (cellphone_claimant) where = { ...where, cellphone_claimant };
  if (name_transmiter) where = { ...where, name_transmiter };
  if (surname_transmiter) where = { ...where, surname_transmiter };
  if (city_transmiter) where = { ...where, city_transmiter };
  if (celphone_transmiter) where = { ...where, celphone_transmiter };
  if (pay_method) where = { ...where, pay_method };
  if (typeShipmentId) where = { ...where, typeShipmentId };
  if (measureId) where = { ...where, measureId };
  if (city_receiver) where = { ...where, city_receiver };
  if (declared_value) where = { ...where, declared_value };
  if (name_receiver) where = { ...where, name_receiver };
  if (weight) where = { ...where, weight };

  let order = [];
  if (orderBy && orderDirection) order = [[orderBy, orderDirection]];

  try {
    const shipments = await OrderShipment.findAll({
      where,
      order,
    });

    if (shipments.length === 0) throw Error("Shipments not found");

    return shipments;
  } catch (error) {
    throw new Error("Error get shipments: " + error.message);
  }
};

const createOrderShipmentController = async (
  name_claimant,
  cedula_claimant,
  cellphone_claimant,
  name_transmiter,
  surname_transmiter,
  celphone_transmiter,
  city_transmiter,
  address_transmiter,
  name_receiver,
  celphone_receiver,
  city_receiver,
  address_receiver,
  weight,
  declared_value,
  product_image,
  pay_method,
  typeShipmentId,
  measureId,
  user_id
) => {
  try {
    const userId = await User.findByPk(user_id);

    if (!userId) throw Error(`User with ID: ${user_id} was not found`);

    const newOrderShipment = await OrderShipment.create({
      name_claimant,
      cedula_claimant,
      cellphone_claimant,
      name_transmiter,
      surname_transmiter,
      celphone_transmiter,
      city_transmiter,
      address_transmiter,
      name_receiver,
      celphone_receiver,
      city_receiver,
      address_receiver,
      weight,
      declared_value,
      product_image,
      pay_method,
      typeShipmentId,
      measureId,
      user_id,
    });

    if (newOrderShipment) {
      function generarNumeroAleatorio() {
        const min = 1000000000;
        const max = 9999999999;
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      const distanceCalculated = DISTANCES[city_transmiter][city_receiver];
      const timeCalculated = TIMES[city_transmiter][city_receiver];

      const newEnlistment = await Enlistment.create({
        guide_number: generarNumeroAleatorio(),
        distance: distanceCalculated,
        price_order: calculateCost(
          calculateWeightByInput(measureId),
          distanceCalculated
        ),
        delivery_time: timeCalculated,
        state: "Paquete Asignado",
        ordershipment_id: newOrderShipment.id,
      });

      newEnlistment.addDrivers(await selectDriver(city_transmiter));

      if (!newEnlistment) throw Error("Error create enlistment");
    }

    return newOrderShipment;
  } catch (error) {
    throw new Error("Error create shipment: " + error.message);
  }
};

const getOrderShipmentByIdController = async (id) => {
  try {
    const shipment = await OrderShipment.findByPk(id);
    return shipment;
  } catch (error) {
    throw new Error("Error get shipment by id: " + error.message);
  }
};

const deleteOrderShipmentController = async (id) => {
  try {
    if (!id) throw new Error("Missing id field");
    const shipment = await OrderShipment.findByPk(id);
    if (!shipment) throw new Error("Shipment not found");
    await shipment.destroy();
  } catch (error) {
    throw new Error("Error delete shipment: " + error.message);
  }
};

export {
  getAllOrderShipmentsController,
  createOrderShipmentController,
  getOrderShipmentByIdController,
  deleteOrderShipmentController,
};
