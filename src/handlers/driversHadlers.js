import {
  getAllDriversController,
  getDriverByIdController,
  getDriverbyNameController,
  getOrderByDriversController,
  getFilteredByDriversController,
  createDriverController,
  updateDriverController,
  deleteDriverController,
} from "../controllers/driversControler.js";

//Funciona
const getAllDriversHandler = async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const drivers = await getDriverbyNameController(name);
      res.status(200).send(drivers);
    } else {
      const drivers = await getAllDriversController();
      res.status(200).send(drivers);
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

//Funciona
const getDriverByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const driverByID = await getDriverByIdController(id); // Esperar a que se resuelva la promesa
    res.status(200).send(driverByID);
  } catch (error) {
    res.status(500).send({ error: error.message }); // Usar error.message en lugar de error.error
  }
};

//Funciona
const postDriverHandler = async (req, res) => {
  try {
    const { name, email, password, debit, antiquity, user_type } = req.body;

    if (!name || !email || !password || !debit || !antiquity || !user_type) {
      throw new Error("Faltan datos");
    }

    const newDriver = await createDriverController({
      name,
      email,
      password,
      debit,
      antiquity,
      user_type,
    }); // Pasar un objeto con todas las propiedades

    res.status(200).send(newDriver);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getOrderByDriversHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await getOrderByDriversController(id);
    res.status(200).send(order);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getFilteredByDriversHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const filters = req.query;
    const order = await getFilteredByDriversController(id, filters);
    res.status(200).send(order);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

//Funciona
const updateDriverHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, debit, antiquity, user_type } = req.body;
    const driverModif = await updateDriverController(id, {
      name,
      email,
      password,
      debit,
      antiquity,
      user_type,
    }); // Pasar un objeto con todas las propiedades
    res.status(200).send(driverModif);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

//
const deleteDriverHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const driverDelete = deleteDriverController(id);

    res.status(200).send(driverDelete);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export {
  getAllDriversHandler,
  getDriverByIdHandler,
  getOrderByDriversHandler,
  getFilteredByDriversHandler,
  postDriverHandler,
  updateDriverHandler,
  deleteDriverHandler,
};
