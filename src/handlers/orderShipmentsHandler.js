import {
  getAllOrderShipmentsController,
  getOrderShipmentByIdController,
  createOrderShipmentController,
  deleteOrderShipmentController,
} from "../controllers/orderShipmentsController.js";

import {
  validateDirections,
  validateOnlyLettersRgex,
  validateOnlyNumersRgex,
  validateLengthFromTo,
  splitAndFixNames,
  validateExactLength,
  validateMissingInformation,
} from "../utils/Validate/validateOrderShipments/validateOrderShipments.js";

const getAllOrderShipmentsHandler = async (req, res) => {
  const {
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
    orderDirection,
  } = req.query;

  try {
    const shipments = await getAllOrderShipmentsController(
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
    );
    res.status(200).json(shipments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getOrderShipmentByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const shipment = await getOrderShipmentByIdController(id);
    if (!shipment) throw new Error("Shipment not found");
    res.status(200).send(shipment);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const createOrderShipmentHandler = async (req, res) => {
  try {
    const {
      cedula_claimant,
      cellphone_claimant,
      celphone_transmiter,
      city_transmiter,
      address_transmiter,
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
    } = req.body;

    let { name_claimant, name_transmiter, name_receiver, surname_transmiter } =
      req.body;

    validateMissingInformation({
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

    validateLengthFromTo(
      { name_claimant, name_receiver, name_transmiter },
      3,
      30
    );

    validateLengthFromTo({ city_transmiter, city_receiver }, 4, 20);

    validateOnlyNumersRgex({
      cedula_claimant,
      cellphone_claimant,
      celphone_transmiter,
      celphone_receiver,
      weight,
      declared_value,
    });

    validateExactLength(cedula_claimant, 8, "cedula_claimant");
    validateExactLength(cellphone_claimant, 10, "cellphone_claimant");
    validateExactLength(celphone_receiver, 10, "celphone_receiver");
    validateExactLength(celphone_transmiter, 10, "celphone_transmiter");

    validateDirections({ address_transmiter, address_receiver });

    validateOnlyLettersRgex({
      name_claimant,
      name_transmiter,
      surname_transmiter,
      name_receiver,
      city_transmiter,
      city_receiver,
    });

    if (
      pay_method !== "Efectivo" &&
      pay_method !== "Credito" &&
      pay_method !== "Debito"
    )
      throw Error("Pay method must be 'Efectivo', 'Credito' or 'Debito'");

    if (String(weight).length < 1 || String(weight).length > 3)
      throw Error("Digits of weigth must be between 1 and 3");

    const newShipment = await createOrderShipmentController(
      splitAndFixNames(name_claimant),
      cedula_claimant,
      cellphone_claimant,
      splitAndFixNames(name_transmiter),
      splitAndFixNames(surname_transmiter),
      celphone_transmiter,
      city_transmiter,
      address_transmiter,
      splitAndFixNames(name_receiver),
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
    );

    if (newShipment) res.sendStatus(201);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const deleteOrderShipmentHandler = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteOrderShipmentController(id);
    res.status(200).json({
      "Ordershipment DELETED": `Ordershipment with ID: ${id} was deleted`,
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

export {
  getAllOrderShipmentsHandler,
  getOrderShipmentByIdHandler,
  createOrderShipmentHandler,
  deleteOrderShipmentHandler,
};
