import {
  getAllTypeShipmentsController,
  getTypeShipmentByIdController,
  createTypeShipmentController,
  updateTypeShipmentController,
  deleteTypeShipmentController,
} from "../controllers/typeShipmentsController.js";

const getAllTypeShipmentsHandler = async (req, res) => {
  try {
    const shipments = await getAllTypeShipmentsController();
    res.status(200).send(shipments);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getTypeShipmentByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const shipment = await getTypeShipmentByIdController(id);
    if (!shipment) throw new Error("Shipment not found");
    res.status(200).send(shipment);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const createTypeShipmentHandler = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      throw new Error("Missing fields");
    }
    const shipment = await createTypeShipmentController(name, description);
    res.status(201).send(shipment);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const updateTypeShipmentHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    if (!name || !description) {
      throw new Error("Missing fields");
    }
    const shipment = await updateTypeShipmentController(id, name, description);
    res.status(200).send(shipment);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const deleteTypeShipmentHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const shipment = await deleteTypeShipmentController(id);
    res.status(200).send(shipment);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export {
  getAllTypeShipmentsHandler,
  getTypeShipmentByIdHandler,
  createTypeShipmentHandler,
  updateTypeShipmentHandler,
  deleteTypeShipmentHandler,
};
