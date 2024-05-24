import { TypeShipment } from "../database/db.js";

const getOrCreateShipmentsController = async () => {
  const branchToDoor = await TypeShipment.findOrCreate({
    where: {
      name: "branch to door",
      description: "description of branch to door",
    },
  });

  const branchToBranch = await TypeShipment.findOrCreate({
    where: {
      name: "branch to branch",
      description: "description of branch to branch",
    },
  });

  const doorToBranch = await TypeShipment.findOrCreate({
    where: {
      name: "door to branch",
      description: "description of door to branch",
    },
  });

  const pickUp = await TypeShipment.findOrCreate({
    where: {
      name: "pickup",
      description: "description of branch to door",
    },
  });

  function mapResults(result) {
    return {
      id: result[0].id,
      name: result[0].name,
      description: result[0].description,
    };
  }

  const results = [
    mapResults(branchToDoor),
    mapResults(branchToBranch),
    mapResults(doorToBranch),
    mapResults(pickUp),
  ];

  return results;
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

  await TypeShipment.bulkCreate(typeShipments);
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
  getOrCreateShipmentsController,
  getTypeShipmentByIdController,
  bulkCreateTypeShipments,
};
