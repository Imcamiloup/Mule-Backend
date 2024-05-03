import getVehicles from "../controllers/getVehicles.js";

const getVehiclesHandler = async (req, res) => {
  try {
    const vehicles = await getVehicles();

    res.status(200).json({ vehicles: vehicles });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default getVehiclesHandler;
