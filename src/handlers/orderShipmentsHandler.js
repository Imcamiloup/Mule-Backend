import {
  getAllOrderShipmentsController,
  getOrderShipmentByIdController,
  createOrderShipmentController,
  updateOrderShipmentController,
  deleteOrderShipmentController,
} from "../controllers/orderShipmentsController.js";

import {
  validateDirectons,
  validateOnlyLettersRgex,
  //validateURLs,
  validateOnlyNumersRgex,
  validateLengthFromTo,
  splitAndFixNames,
  validateExactLength,
} from "../utils/Validate/validateOrderShipment/validateOrderShipments.js";

const getAllOrderShipmentsHandler = async (req, res) => {
  const {
    name_claimant,
    cedula_claimant,
    cellphone_claimant,
    name_transmiter,
    celphone_transmiter,
    city_transmiter,
    pay_method,
    typeShipmentId,
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
      celphone_transmiter,
      city_transmiter,
      pay_method,
      typeShipmentId,
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
      // typeShipmentId,
      // measureId,
      // user_id,
    } = req.body;

    let { name_claimant, name_transmiter, name_receiver } = req.body;

    const paramsOnlyLetters = {
      name_claimant,
      name_transmiter,
      name_receiver,
      city_transmiter,
      city_receiver,
    };

    const paramsOnlyNumbers = {
      cedula_claimant,
      cellphone_claimant,
      celphone_transmiter,
      celphone_receiver,
      weight,
      declared_value,
    };

    const paramsDirections = { address_transmiter, address_receiver };

    const paramsURLs = { product_image };

    const paramsLengthNames = {
      name_claimant,
      name_receiver,
      name_transmiter,
    };

    const paramsLengthCitys = {
      city_transmiter,
      city_receiver,
    };

    if (
      !name_claimant ||
      !cedula_claimant ||
      !cellphone_claimant ||
      !name_transmiter ||
      !celphone_transmiter ||
      !city_transmiter ||
      !address_transmiter ||
      !name_receiver ||
      !celphone_receiver ||
      !city_receiver ||
      !address_receiver ||
      !weight ||
      !declared_value ||
      !product_image ||
      !pay_method
      // !typeShipmentId ||
      // !measureId ||
      // !user_id
    )
      throw new Error("Missing required information");

    validateLengthFromTo(paramsLengthNames, 3, 30);
    validateLengthFromTo(paramsLengthCitys, 4, 20);

    validateOnlyNumersRgex(paramsOnlyNumbers);

    validateExactLength(cedula_claimant, 8, "cedula_claimant");
    validateExactLength(cellphone_claimant, 10, "cellphone_claimant");
    validateExactLength(celphone_receiver, 10, "celphone_receiver");
    validateExactLength(celphone_transmiter, 10, "celphone_transmiter");

    validateDirectons(paramsDirections);

    validateOnlyLettersRgex(paramsOnlyLetters);

    //validateURLs(paramsURLs);

    if (
      pay_method !== "cash" &&
      pay_method!== "credit-card" &&
      pay_method !== "debit"
    )
      throw Error("Pay method must be 'cash', 'credit-card' or 'debit'");

    if (String(weight).length < 1 || String(weight).length > 3)
      throw Error("Digits of weigth must be between 1 and 3");

    const newShipment = await createOrderShipmentController(
      splitAndFixNames(name_claimant),
      cedula_claimant,
      cellphone_claimant,
      splitAndFixNames(name_transmiter),
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
      pay_method.toLowerCase()
      // typeShipmentId,
      // measureId,
      // user_id
    );
    res.status(201).json(newShipment);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const updateOrderShipmentHandler = async (req, res) => {
  try {
    const { id } = req.params;
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
      // typeShipmentId,
      // measureId,
      // user_id,
    } = req.body;

    let { name_claimant, name_transmiter, name_receiver } = req.body;

    const paramsOnlyLetters = {
      name_claimant,
      name_transmiter,
      name_receiver,
      city_transmiter,
      city_receiver,
    };

    const paramsOnlyNumbers = {
      cedula_claimant,
      cellphone_claimant,
      celphone_transmiter,
      celphone_receiver,
      weight,
      declared_value,
    };

    const paramsDirections = { address_transmiter, address_receiver };

    const paramsURLs = { product_image };

    const paramsLengthNames = {
      name_claimant,
      name_receiver,
      name_transmiter,
    };

    const paramsLengthCitys = {
      city_transmiter,
      city_receiver,
    };

    if (
      !name_claimant ||
      !cedula_claimant ||
      !cellphone_claimant ||
      !name_transmiter ||
      !celphone_transmiter ||
      !city_transmiter ||
      !address_transmiter ||
      !name_receiver ||
      !celphone_receiver ||
      !city_receiver ||
      !address_receiver ||
      !weight ||
      !declared_value ||
      !product_image ||
      !pay_method
      // !typeShipmentId ||
      // !measureId ||
      // !user_id
    )
      throw new Error("Missing required information");

    validateLengthFromTo(paramsLengthNames, 3, 30);
    validateLengthFromTo(paramsLengthCitys, 4, 20);

    validateOnlyNumersRgex(paramsOnlyNumbers);

    validateExactLength(cedula_claimant, 8, "cedula_claimant");
    validateExactLength(cellphone_claimant, 10, "cellphone_claimant");
    validateExactLength(celphone_receiver, 10, "celphone_receiver");
    validateExactLength(celphone_transmiter, 10, "celphone_transmiter");

    validateDirectons(paramsDirections);

    validateOnlyLettersRgex(paramsOnlyLetters);

    validateURLs(paramsURLs);

    if (
      pay_method.toLowerCase() !== "cash" &&
      pay_method.toLowerCase() !== "credit-card" &&
      pay_method.toLowerCase() !== "debit"
    )
      throw Error("Pay method must be 'cash', 'credit-card' or 'debit'");

    if (String(weight).length < 1 || String(weight).length > 3)
      throw Error("Digits of weigth must be between 1 and 3");

    await updateOrderShipmentController(
      id,
      splitAndFixNames(name_claimant),
      cedula_claimant,
      cellphone_claimant,
      splitAndFixNames(name_transmiter),
      celphone_transmiter,
      city_transmiter.toLowerCase(),
      address_transmiter.toLowerCase(),
      splitAndFixNames(name_receiver),
      celphone_receiver,
      city_receiver.toLowerCase(),
      address_receiver.toLowerCase(),
      weight,
      declared_value,
      product_image,
      pay_method.toLowerCase()
    );

    res.status(200).json({
      "OrderShipment Updated: ": {
        name_claimant: splitAndFixNames(name_claimant),
        cedula_claimant,
        cellphone_claimant,
        name_transmiter: splitAndFixNames(name_transmiter),
        celphone_transmiter,
        city_transmiter: city_transmiter.toLowerCase(),
        address_transmiter: address_transmiter.toLowerCase(),
        name_receiver: splitAndFixNames(name_receiver),
        celphone_receiver,
        city_receiver: city_receiver.toLowerCase(),
        address_receiver: address_receiver.toLowerCase(),
        weight,
        declared_value,
        product_image,
        pay_method: pay_method.toLowerCase(),
      },
    });
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
  updateOrderShipmentHandler,
  deleteOrderShipmentHandler,
};
