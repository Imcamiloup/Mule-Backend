import {
  createVehicle,
  getVehicles,
  getVehiclesByState,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
} from "../controllers/vehiclesController.js";

export const createVehicleHandler = async (req, res) => {
  const { model, state, car_insurance, plate } = req.body;

  const stateLowerCase = state.toLowerCase();
  const validateModel = /^[A-HJ-NPR-Z0-9]{17}$/i.test(model);

  try {
    if (!validateModel) throw Error("Vehicle model is incorrect");

    if (car_insurance.length < 7 || car_insurance.length > 10)
      throw Error(
        "Number of characters in the car insurance must be between 7 and 10"
      );

    if (plate.length < 5 || plate.length > 8)
      throw Error(
        "Number of characters in the car plate must be between 5 and 8"
      );

    await createVehicle(
      model.trim(),
      stateLowerCase.trim(),
      car_insurance.trim(),
      plate.trim()
    );

    res.status(201).json({
      "Vehicle created": {
        model,
        stateLowerCase,
        car_insurance,
        plate,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getVehiclesHandler = async (req, res) => {
  try {
    const { state, plate } = req.query;
    const querys = {};
    let vehicles;

    if (state) querys.state = state;
    if (plate) querys.plate = plate;

    querys
      ? (vehicles = await getVehiclesByState(querys))
      : (vehicles = await getVehicles());

    const vehiclesMaped = vehicles.map((elem) => {
      return {
        id: elem.id,
        model: elem.model,
        state: elem.state,
        car_insurance: elem.car_insurance,
        plate: elem.plate,
        enlistments: elem.Enlistments.map((elem) => elem.id),
      };
    });

    res.status(200).json({ vehicles: vehiclesMaped });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getVehicleByIdHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const vehicleById = await getVehicleById(id);

    if (!vehicleById) throw Error(`Vehicle with ID: ${id} not found`);

    res.status(200).json({ vehicle: vehicleById });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateVehicleHandler = async (req, res) => {
  const { id } = req.params;
  const { model, state, car_insurance, plate } = req.body;

  const stateLowerCase = state.toLowerCase();
  const validateModel = /^[A-HJ-NPR-Z0-9]{17}$/i.test(model);

  try {
    if (!id) throw Error("ID not found");

    if (!validateModel) throw Error("Car model is incorrect");

    if (car_insurance.length < 7 || car_insurance.length > 10)
      throw Error(
        "Number of characters in the car insurance must be between 7 and 10"
      );

    if (plate.length < 5 || plate.length > 8)
      throw Error(
        "Number of characters in the car plate must be between 5 and 8"
      );

    await updateVehicle(
      id,
      model.trim(),
      stateLowerCase.trim(),
      car_insurance.trim(),
      plate.trim()
    );

    res.status(200).json({
      "Vehicle updated": {
        id,
        model,
        stateLowerCase,
        car_insurance,
        plate,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteVehicleHandler = async (req, res) => {
  const { id } = req.params;

  try {
    await deleteVehicle(id);

    res
      .status(200)
      .json({ "Vehicle deleted": `Vehicle with ID: ${id} was deleted` });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
