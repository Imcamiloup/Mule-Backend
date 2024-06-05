import {
  getVehicles,
  getVehicleById,
  updateVehicle,
  getVehiclesByQuery,
} from "../controllers/vehiclesController.js";

export const getVehiclesHandler = async (req, res) => {
  if (req.query) {
    const {
      model,
      state,
      car_insurance,
      plate,
      tecnical_review,
      driving_licence,
      cargo_manifest,
      orderBy,
      orderDirection,
    } = req.query;

    try {
      const vehicles = await getVehiclesByQuery(
        model,
        state,
        car_insurance,
        plate,
        tecnical_review,
        driving_licence,
        cargo_manifest,
        orderBy,
        orderDirection
      );

      res.status(200).json(vehicles);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  } else {
    try {
      const vehicles = await getVehicles();
      res.status(200).json(vehicles);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

export const getVehicleByIdHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const vehicleById = await getVehicleById(id);

    if (!vehicleById) throw Error(`Vehicle with ID: ${id} not found`);

    res.status(200).json(vehicleById);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const updateVehicleHandler = async (req, res) => {
  const { id } = req.params;
  const { state, tecnical_review, cargo_manifest, news } = req.body;

  const tecnicalReviewRgex = /^[A-Z0-9]{2,4}-[A-Z]{2}-\d{4}-\d+$/i;
  const noSpecialCharactersRgex = /^[a-zA-Z0-9,.\s]+$/;
  try {
    if (state !== "active" && state !== "inactive" && state !== "maintenance")
      throw Error("State must be 'active', 'inactive' or in 'maintenance'");

    if (!tecnicalReviewRgex.test(tecnical_review))
      throw Error(
        "Tecnical review is incorrect. Must be in this format: RTV-AR-2024-12345, first digits before the first middle dash could be 2 or 4 max"
      );

    if (!noSpecialCharactersRgex.test(news))
      throw Error("Special characters are not allowed (#$%^&*_-) in news");

    await updateVehicle(
      id,
      state.toLowerCase(),
      tecnical_review.toUpperCase(),
      cargo_manifest,
      news.trim()
    );

    res.sendStatus(200);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
