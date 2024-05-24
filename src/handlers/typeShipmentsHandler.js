import {
  // getOrCreateShipmentsController,
  getTypeShipmentByIdController,
  bulkCreateTypeShipments,
} from "../controllers/typeShipmentsController.js";

import { TypeShipment } from "../database/db.js";

bulkCreateTypeShipments();

const getOrCreateTypeShipmentsHandler = async (req, res) => {
  try {
    // const shipments = await getOrCreateShipmentsController();

    const shipments = await TypeShipment.findAll();

    res.status(200).send(shipments);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const getTypeShipmentByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const shipment = await getTypeShipmentByIdController(id);
    if (!shipment) throw new Error("Shipment not found");
    res.status(200).send(shipment);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

export { getOrCreateTypeShipmentsHandler, getTypeShipmentByIdHandler };

