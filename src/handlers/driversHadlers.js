import {
  getAllDriversController,
  getDriverByIdController,
  createDriverController,
  updateDriverController,
  deleteDriverController,
} from "../controllers/driversController.js";

//Funciona
const getAllDriversHandler = async (req, res) => {
  const {
    name,
    email,
    debit,
    antiquity,
    status,
    vehicle_id,
    branch_id,
    orderBy,
    orderDirection,
  } = req.query;

  try {
    const drivers = await getAllDriversController(
      name,
      email,
      debit,
      antiquity,
      status,
      vehicle_id,
      branch_id,
      orderBy,
      orderDirection
    );

    res.status(200).json(drivers);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

export default getAllDriversHandler;

//Funciona
const getDriverByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const driverByID = await getDriverByIdController(id); // Esperar a que se resuelva la promesa
    res.status(200).send(driverByID);
  } catch (error) {
    res.status(400).send({ error: error.message }); // Usar error.message en lugar de error.error
  }
};

//Funciona
// const postDriverHandler = async (req, res) => {
//   try {
//     const { name, email, password, debit, antiquity, status, vehicle_id } =
//       req.body;

//     if (!name || !email || !password || !debit || !antiquity || !status) {
//       throw new Error("Faltan datos");
//     }

//     const newDriver = await createDriverController({
//       name,
//       email,
//       password,
//       debit,
//       antiquity,
//       status,
//       vehicle_id,
//     }); // Pasar un objeto con todas las propiedades

//     res.status(200).send(newDriver);
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
// };

const postDriverHandler = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      debit,
      antiquity,
      status,
      vehicle_id,
      branch_id,
    } = req.body;

    if (!name || !email || !password || !debit || !antiquity || !status) {
      let missingField = "";
      if (!name) missingField = "name";
      else if (!email) missingField = "email";
      else if (!password) missingField = "password";
      else if (!debit) missingField = "debit";
      else if (!antiquity) missingField = "antiquity";
      else if (!status) missingField = "status";

      throw new Error(`El campo ${missingField} es obligatorio.`);
    }

    await createDriverController({
      name,
      email,
      password,
      debit,
      antiquity,
      status,
      vehicle_id,
      branch_id,
    });

    res.sendStatus(201);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

//Funciona
const updateDriverHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, debit, antiquity, status } = req.body;
    const driverModif = await updateDriverController(id, {
      name,
      email,
      password,
      debit,
      antiquity,
      status,
    }); // Pasar un objeto con todas las propiedades
    res.status(200).send(driverModif);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

//
const deleteDriverHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const driverDelete = deleteDriverController(id);

    res.status(200).send(driverDelete);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

export {
  getAllDriversHandler,
  getDriverByIdHandler,
  postDriverHandler,
  updateDriverHandler,
  deleteDriverHandler,
};
