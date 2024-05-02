import createVehicle from "../controllers/createVehicle.js";

const createVehicleHandler = (req, res) => {
  const { model, state, car_insurance, plate, fee, antiquity } = req.body;

  const stateLowerCase = state.toLowerCase();

  try {
    createVehicle(model, stateLowerCase, car_insurance, plate, fee, antiquity);

    res.status(201).json({
      "Vehicle created": {
        model,
        stateLowerCase,
        car_insurance,
        plate,
        fee,
        antiquity,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default createVehicleHandler;
