import {
  createVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
} from "../controllers/vehiclesController.js";

export const createVehicleHandler = async (req, res) => {
  const { model, state, car_insurance, plate, brand } = req.body;

  const stateLowerCase = state.toLowerCase();
  const brandLowerCase = brand.toLowerCase();
  const plateLowerCase = plate.toUpperCase();

  const validateModel = /^[A-HJ-NPR-Z0-9]{17}$/i.test(model);

  try {
    if (!validateModel) throw Error("Vehicle model is incorrect");

    if (car_insurance.length < 7 || car_insurance.length > 10)
      throw Error(
        "Number of characters in the car insurance must be between 7 and 10"
      );

    if (plateLowerCase.length < 5 || plateLowerCase.length > 8)
      throw Error(
        "Number of characters in the car plate must be between 5 and 8"
      );

    if (brandLowerCase.length < 3 || brandLowerCase.length > 20)
      throw Error("Characters of vehicle brand must be between 3 and 20");

    await createVehicle(
      model.trim(),
      stateLowerCase.trim(),
      car_insurance.trim(),
      plateLowerCase.trim(),
      brandLowerCase.trim()
    );

    res.status(201).json({
      "Vehicle created": {
        model: model.trim(),
        state: stateLowerCase.trim(),
        car_insurance: car_insurance.trim(),
        plate: plateLowerCase.trim(),
        brand: brandLowerCase.trim(),
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getVehiclesHandler = async (req, res) => {
  try {
    const { state, plate, car_insurance, brand } = req.query;
    const querys = {};
    let vehicles;

    if (state) querys.state = state;
    if (plate) querys.plate = plate;
    if (car_insurance) querys.car_insurance = car_insurance;
    if (brand) querys.brand = brand;

    querys
      ? (vehicles = await getVehicles(querys))
      : (vehicles = await getVehicles());

    const vehiclesMaped = vehicles.map((elem) => {
      return {
        id: elem.id,
        model: elem.model,
        state: elem.state,
        car_insurance: elem.car_insurance,
        plate: elem.plate,
        brand: elem.brand,
        enlistments: elem.Enlistments.map((elem) => elem.id),
      };
    });

    res.status(200).json(vehiclesMaped);
  } catch (error) {
    res.status(404).json({ error: error.message });
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
  const { model, state, car_insurance, plate, brand } = req.body;

  const stateLowerCase = state.toLowerCase();
  const brandLowerCase = brand.toLowerCase();
  const plateLowerCase = plate.toUpperCase();

  const validateModel = /^[A-HJ-NPR-Z0-9]{17}$/i.test(model);

  try {
    if (!id) throw Error("ID not found");

    if (!validateModel) throw Error("Car model is incorrect");

    if (car_insurance.length < 7 || car_insurance.length > 10)
      throw Error(
        "Number of characters in the car insurance must be between 7 and 10"
      );

    if (plateLowerCase.length < 5 || plateLowerCase.length > 8)
      throw Error(
        "Number of characters in the car plate must be between 5 and 8"
      );

    if (brandLowerCase.length < 3 || brandLowerCase.length > 20)
      throw Error("Characters of vehicle brand must be between 3 and 20");

    await updateVehicle(
      id,
      model.trim(),
      stateLowerCase.trim(),
      car_insurance.trim(),
      plateLowerCase.trim(),
      brandLowerCase.trim()
    );

    res.status(200).json({
      "Vehicle UPDATED": {
        model: model.trim(),
        state: stateLowerCase.trim(),
        car_insurance: car_insurance.trim(),
        plate: plateLowerCase.trim(),
        brand: brandLowerCase.trim(),
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
