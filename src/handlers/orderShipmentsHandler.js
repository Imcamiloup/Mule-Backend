import {
  getAllOrderShipmentsController,
  getOrderShipmentByIdController,
  createOrderShipmentController,
  updateOrderShipmentController,
  deleteOrderShipmentController,
} from "../controllers/orderShipmentsController.js";

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

    const onlyLettersRgex = /^[a-zA-Z\s]+$/;
    const noSpecialCharactersRgex = /^[a-zA-Z0-9\s,.]+$/;
    const directionRegex = /^[a-zA-Z0-9,.\-#\s]+$/;
    const onlyNumbersRgex = /^\d+$/;

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

    if (name_claimant.length < 3 || name_claimant.length > 30)
      throw Error(
        "The length of the name calimant must be between 3 and 30 characters"
      );

    if (name_receiver.length < 3 || name_receiver.length > 30)
      throw Error(
        "The length of the name receiver must be between 3 and 30 characters"
      );

    if (name_transmiter.length < 3 || name_transmiter.length > 30)
      throw Error(
        "The length of the name transmiter must be between 3 and 30 characters"
      );
    const nameClaimantSplit = name_claimant.split(" ");

    for (let i = 0; i < nameClaimantSplit.length; i++) {
      nameClaimantSplit[i] =
        nameClaimantSplit[i].charAt(0).toUpperCase() +
        nameClaimantSplit[i].slice(1).toLowerCase();

      name_claimant = nameClaimantSplit.join(" ");
    }

    const nameTransmiterSplit = name_transmiter.split(" ");

    for (let i = 0; i < nameTransmiterSplit.length; i++) {
      nameTransmiterSplit[i] =
        nameTransmiterSplit[i].charAt(0).toUpperCase() +
        nameTransmiterSplit[i].slice(1).toLowerCase();

      name_transmiter = nameTransmiterSplit.join(" ");
    }

    const nameReceiverSplit = name_receiver.split(" ");

    for (let i = 0; i < nameReceiverSplit.length; i++) {
      nameReceiverSplit[i] =
        nameReceiverSplit[i].charAt(0).toUpperCase() +
        nameReceiverSplit[i].slice(1).toLowerCase();

      name_receiver = nameReceiverSplit.join(" ");
    }

    const paramsOnlyNumbers = {
      cedula_claimant,
      cellphone_claimant,
      celphone_transmiter,
      celphone_receiver,
      weight,
      declared_value,
    };

    for (const key in paramsOnlyNumbers) {
      if (!onlyNumbersRgex.test(paramsOnlyNumbers[key]))
        throw Error("Only numbers allowed, no special characters");
    }

    if (String(cedula_claimant).length !== 8)
      throw Error("Digits of DNI must be 8");

    if (String(cellphone_claimant).length !== 10)
      throw Error("Digits of cellphone claimant must be 10");

    if (String(celphone_receiver).length !== 10)
      throw Error("Digits of cellphone receiver must be 10");

    if (String(celphone_transmiter).length !== 10)
      throw Error("Digits of cellphone transmiter must be 10");

    if (city_transmiter.length < 4 || city_transmiter.length > 20)
      throw Error(
        "The length of the city transmiter must be between 4 and 20 characters"
      );

    if (city_receiver.length < 4 || city_receiver.length > 20)
      throw Error(
        "The length of the city receiver must be between 4 and 20 characters"
      );

    if (
      pay_method.toLowerCase() !== "cash" &&
      pay_method.toLowerCase() !== "credit-card" &&
      pay_method.toLowerCase() !== "debit"
    )
      throw Error("Pay method must be 'cash', 'credit-card' or 'debit'");

    if (String(weight).length < 1 || String(weight).length > 3)
      throw Error("Digits of weigth must be between 1 and 3");

    const paramsDirections = { address_transmiter, address_receiver };

    for (const key in paramsDirections) {
      if (!directionRegex.test(paramsDirections[key]))
        throw Error("Only these special characters are allowed: ,.-#");
    }

    const paramsNames = {
      name_claimant,
      name_transmiter,
      name_receiver,
    };

    for (const key in paramsNames) {
      if (!onlyLettersRgex.test(paramsNames[key]))
        throw Error("Only letters are allowed");
    }

    const paramsNoSpecialCharacters = {
      cedula_claimant,
      cellphone_claimant,
      celphone_transmiter,
      city_transmiter,
      celphone_receiver,
      city_receiver,
      weight,
      declared_value,
    };

    for (const key in paramsNoSpecialCharacters) {
      if (!noSpecialCharactersRgex.test(paramsNoSpecialCharacters[key]))
        throw Error("No special characters allowed");
    }

    const newShipment = await createOrderShipmentController(
      name_claimant,
      cedula_claimant,
      cellphone_claimant,
      name_transmiter,
      celphone_transmiter,
      city_transmiter.toLowerCase(),
      address_transmiter.toLowerCase(),
      name_receiver,
      celphone_receiver,
      city_receiver.toLowerCase(),
      address_receiver.toLowerCase(),
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

    const noSpecialCharactersRgex = /^[a-zA-Z0-9\s,.]+$/;
    const directionRegex = /^[a-zA-Z0-9,.\-#\s]+$/;
    const onlyNumbersRgex = /^\d+$/;

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

    if (name_claimant.length < 3 || name_claimant.length > 30)
      throw Error(
        "The length of the name calimant must be between 3 and 30 characters"
      );

    if (name_receiver.length < 3 || name_receiver.length > 30)
      throw Error(
        "The length of the name receiver must be between 3 and 30 characters"
      );

    if (name_transmiter.length < 3 || name_transmiter.length > 30)
      throw Error(
        "The length of the name transmiter must be between 3 and 30 characters"
      );
    const nameClaimantSplit = name_claimant.split(" ");

    for (let i = 0; i < nameClaimantSplit.length; i++) {
      nameClaimantSplit[i] =
        nameClaimantSplit[i].charAt(0).toUpperCase() +
        nameClaimantSplit[i].slice(1).toLowerCase();

      name_claimant = nameClaimantSplit.join(" ");
    }

    const nameTransmiterSplit = name_transmiter.split(" ");

    for (let i = 0; i < nameTransmiterSplit.length; i++) {
      nameTransmiterSplit[i] =
        nameTransmiterSplit[i].charAt(0).toUpperCase() +
        nameTransmiterSplit[i].slice(1).toLowerCase();

      name_transmiter = nameTransmiterSplit.join(" ");
    }

    const nameReceiverSplit = name_receiver.split(" ");

    for (let i = 0; i < nameReceiverSplit.length; i++) {
      nameReceiverSplit[i] =
        nameReceiverSplit[i].charAt(0).toUpperCase() +
        nameReceiverSplit[i].slice(1).toLowerCase();

      name_receiver = nameReceiverSplit.join(" ");
    }

    const paramsOnlyNumbers = {
      cedula_claimant,
      cellphone_claimant,
      celphone_transmiter,
      celphone_receiver,
      weight,
      declared_value,
    };

    for (const key in paramsOnlyNumbers) {
      if (!onlyNumbersRgex.test(paramsOnlyNumbers[key]))
        throw Error("Only numbers allowed, no special characters");
    }

    if (String(cedula_claimant).length !== 8)
      throw Error("Digits of DNI must be 8");

    if (String(cellphone_claimant).length !== 10)
      throw Error("Digits of cellphone claimant must be 10");

    if (String(celphone_receiver).length !== 10)
      throw Error("Digits of cellphone receiver must be 10");

    if (String(celphone_transmiter).length !== 10)
      throw Error("Digits of cellphone transmiter must be 10");

    if (city_transmiter.length < 4 || city_transmiter.length > 20)
      throw Error(
        "The length of the city transmiter must be between 4 and 20 characters"
      );

    if (city_receiver.length < 4 || city_receiver.length > 20)
      throw Error(
        "The length of the city receiver must be between 4 and 20 characters"
      );

    if (
      pay_method.toLowerCase() !== "cash" &&
      pay_method.toLowerCase() !== "credit-card" &&
      pay_method.toLowerCase() !== "debit"
    )
      throw Error("Pay method must be 'cash', 'credit-card' or 'debit'");

    if (String(weight).length < 1 || String(weight).length > 3)
      throw Error("Digits of weigth must be between 1 and 3");

    const paramsDirections = { address_transmiter, address_receiver };

    for (const key in paramsDirections) {
      if (!directionRegex.test(paramsDirections[key]))
        throw Error("Only these special characters are allowed: ,.-#");
    }

    const paramsNames = {
      name_claimant,
      name_transmiter,
      name_receiver,
    };

    for (const key in paramsNames) {
      if (!onlyLettersRgex.test(paramsNames[key]))
        throw Error("Only letters are allowed");
    }

    const paramsNoSpecialCharacters = {
      name_claimant,
      cedula_claimant,
      cellphone_claimant,
      name_transmiter,
      celphone_transmiter,
      city_transmiter,
      name_receiver,
      celphone_receiver,
      city_receiver,
      weight,
      declared_value,
    };

    for (const key in paramsNoSpecialCharacters) {
      if (!noSpecialCharactersRgex.test(paramsNoSpecialCharacters[key]))
        throw Error("No special characters allowed");
    }

    await updateOrderShipmentController(
      id,
      name_claimant,
      cedula_claimant,
      cellphone_claimant,
      name_transmiter,
      celphone_transmiter,
      city_transmiter.toLowerCase(),
      address_transmiter.toLowerCase(),
      name_receiver,
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
        name_claimant,
        cedula_claimant,
        cellphone_claimant,
        name_transmiter,
        celphone_transmiter,
        city_transmiter: city_transmiter.toLowerCase(),
        address_transmiter: address_transmiter.toLowerCase(),
        name_receiver,
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
