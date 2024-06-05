import {
  getVehicles,
  getVehicleById,
  updateVehicle,
  getVehiclesByQuery,
  createVehicle
} from "../controllers/vehiclesController.js";


export const createVehicleHandler = async (req, res) => {
  const {
    model,
    state,
    car_insurance,
    plate,
    tecnical_review,
    driving_licence,
    cargo_manifest,
    news,
  } = req.body;

  const VINCarRgex = /^[A-HJ-NPR-Z0-9]{17}$/i;
  const onlyNumbersRgex = /^\d+$/;
  const carPlates = /^[A-Za-z]{2}-\d{3}-[A-Za-z]{2}$/;
  const tecnicalReviewRgex = /^[A-Z0-9]{2,4}-[A-Z]{2}-\d{4}-\d+$/i;
  const noSpecialCharactersRgex = /^[a-zA-Z0-9\s,.]+$/;
  try {
    if (!VINCarRgex.test(model))
      throw Error(
        "Vehicle model is incorrect, it must be a VIN format, cannot have special characters or whitespace, must be 17 characters long, illegal characters: I, O and Q"
      );

    if (
      state.toLowerCase() !== "active" &&
      state.toLowerCase() !== "inactive" &&
      state.toLowerCase() !== "maintenance"
    )
      throw Error("State must be 'active', 'inactive' or in 'maintenance'");

    if (!onlyNumbersRgex.test(car_insurance))
      throw Error(
        "Car insurance input only accepts numbers. No whitespaces or special characters"
      );

    if (car_insurance.length < 8 || car_insurance.length > 12)
      throw Error(
        "Number of digits in the car insurance must be between 8 and 12"
      );

    if (!carPlates.test(plate))
      throw Error("Car plate must be in this format: AA-123-BB");

    if (!tecnicalReviewRgex.test(tecnical_review))
      throw Error(
        "Tecnical review is incorrect. Must be in this format: RTV-AR-2024-12345, first digits before the first middle dash could be 2 or 4 max"
      );

    if (!onlyNumbersRgex.test(driving_licence))
      throw Error(
        "Driving licence input only accepts numbers. No whitespaces or special characters"
      );

    if (String(driving_licence).length !== 8)
      throw Error("Driving licence digits must be 8");

    if (!noSpecialCharactersRgex.test(news))
      throw Error("Special characters are not supported (#$%^&*_-)");

    const newVehicle = await createVehicle(
      model.toUpperCase(),
      state.toLowerCase(),
      car_insurance,
      plate.toUpperCase(),
      tecnical_review.toUpperCase(),
      driving_licence,
      cargo_manifest,
      news.trim()
    );

    if (newVehicle) res.sendStatus(201);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


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
