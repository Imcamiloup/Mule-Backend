import {
  getAllOrderShipmentsController,
  getOrderShipmentByIdController,
  createOrderShipmentController,
  updateOrderShipmentController,
  deleteOrderShipmentController,
} from "../controllers/orderShipmentsController.js";

const getAllOrderShipmentsHandler = async (req, res) => {
  const {
    city_transmiter,
    pay_method,
    typeShipmentId,
    city_receiver,
    declared_value,
    orderBy,
    orderDirection,
  } = req.query;

  try {
    const shipments = await getAllOrderShipmentsController(
      city_transmiter,
      pay_method,
      typeShipmentId,
      city_receiver,
      declared_value,
      orderBy,
      orderDirection
    );
    res.status(200).json(shipments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrderShipmentByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const shipment = await getOrderShipmentByIdController(id);
    if (!shipment) throw new Error("Shipment not found");
    res.status(200).send(shipment);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const createOrderShipmentHandler = async (req, res) => {
  const noSpecialCharactersRgex = /^[a-zA-Z0-9\s,.]+$/;

  try {
    const {
      name_claimant,
      cedula_claimant,
      cellphone_claimant,
      name_transmiter,
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
      // typeShipmentId,
      // measureId,
      // user_id,
    } = req.body;

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
      pay_method,
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
      city_transmiter,
      address_transmiter,
      name_receiver,
      celphone_receiver,
      city_receiver,
      address_receiver,
      weight,
      declared_value,
      product_image,
      pay_method
      // typeShipmentId,
      // measureId,
      // user_id
    );
    res.status(201).json(newShipment);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const updateOrderShipmentHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, status } = req.body;
    const shipment = await updateOrderShipmentController(
      id,
      name,
      description,
      price,
      status
    );
    res.status(200).send(shipment);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const deleteOrderShipmentHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedShipment = await deleteOrderShipmentController(id);
    res.status(200).send(deletedShipment);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export {
  getAllOrderShipmentsHandler,
  getOrderShipmentByIdHandler,
  createOrderShipmentHandler,
  updateOrderShipmentHandler,
  deleteOrderShipmentHandler,
};
