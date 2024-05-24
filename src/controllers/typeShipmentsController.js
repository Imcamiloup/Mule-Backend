import { TypeShipment } from "../database/db.js";

const getTypeShipmentsController = async () => {
  const shipments = await TypeShipment.findAll();

  if (shipments.length === 0) throw Error("No Typeshipments found");

  return shipments;
};

const bulkCreateTypeShipments = async () => {
  const typeShipments = [
    {
      name: "branch to door",
      description: "description of branch to door",
    },
    {
      name: "branch to branch",
      description: "description of branch to branch",
    },
    {
      name: "door to branch",
      description: "description of door to branch",
    },
    {
      name: "pickup",
      description: "description of branch to door",
    },
  ];

  const shipments = await TypeShipment.findAll();

  if (shipments.length === 0) {
    await TypeShipment.bulkCreate(typeShipments);
  }
};

const getTypeShipmentByIdController = async (id) => {
  try {
    const shipment = await TypeShipment.findByPk(id);

    return shipment;
  } catch (error) {
    throw new Error("Error get shipment by id: " + error.message);
  }
};

export {
  getTypeShipmentsController,
  getTypeShipmentByIdController,
  bulkCreateTypeShipments,
};
