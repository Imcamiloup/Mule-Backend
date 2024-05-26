import {
  getTypeShipmentsController,
  getTypeShipmentByIdController,
} from "../controllers/typeShipmentsController.js";

const getOrCreateTypeShipmentsHandler = async (req, res) => {
  try {
    const shipments = await getTypeShipmentsController();

    res.status(200).send(shipments);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const getTypeShipmentByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const shipment = await getTypeShipmentByIdController(id);
    if (!shipment) throw new Error(`Shipment with ID ${id} not found`);
    res.status(200).send(shipment);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

export { getOrCreateTypeShipmentsHandler, getTypeShipmentByIdHandler };
