import {
  createVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
  getVehiclesByQuery,
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

  try {
    const validateModel = /^[A-HJ-NPR-Z0-9]{17}$/i.test(model);

    if (!validateModel) throw Error("Vehicle model is incorrect");

    if (car_insurance.length < 7 || car_insurance.length > 10)
      throw Error(
        "Number of characters in the car insurance must be between 7 and 10"
      );

    if (plate.length < 5 || plate.length > 8)
      throw Error(
        "Number of characters in the car plate must be between 5 and 8"
      );

    const newVehicle = await createVehicle(
      model.toUpperCase().trim(),
      state.toLowerCase().trim(),
      car_insurance.trim(),
      plate.toUpperCase().trim(),
      tecnical_review,
      driving_licence,
      cargo_manifest,
      news.trim()
    );

    res.status(201).json({ "Vehicle created": newVehicle });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    } = req.query;

    try {
      const vehicles = await getVehiclesByQuery(
        model,
        state,
        car_insurance,
        plate,
        tecnical_review,
        driving_licence,
        cargo_manifest
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

  try {
    const validateModel = /^[A-HJ-NPR-Z0-9]{17}$/i.test(model);

    if (!validateModel) throw Error("Vehicle model is incorrect");

    if (car_insurance.length < 7 || car_insurance.length > 10)
      throw Error(
        "Number of characters in the car insurance must be between 7 and 10"
      );

    if (plate.length < 5 || plate.length > 8)
      throw Error(
        "Number of characters in the car plate must be between 5 and 8"
      );

    const updatedVehicle = await updateVehicle(
      id,
      model.toUpperCase().trim(),
      state.toLowerCase().trim(),
      car_insurance.trim(),
      plate.toUpperCase().trim(),
      tecnical_review,
      driving_licence,
      cargo_manifest,
      news.trim()
    );

    res.status(200).json({
      "Updated vehicle": {
        id,
        model: model.toUpperCase().trim(),
        state: state.toLowerCase().trim(),
        car_insurance: car_insurance.trim(),
        plate: plate.toUpperCase().trim(),
        tecnical_review,
        driving_licence,
        cargo_manifest,
        news: news.trim(),
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteVehicleHandler = async (req, res) => {
  const { id } = req.params;

  try {
    await deleteVehicle(id);

    res
      .status(200)
      .json({ "Vehicle deleted": `Vehicle with ID: ${id} was DELETED` });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
