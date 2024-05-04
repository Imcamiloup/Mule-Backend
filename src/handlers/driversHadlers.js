import {
  getAllDriversController, 
  getDriverByIdController,
  getDriverbyNameController,
  createDriverController ,
  updateDriverController,
  deleteDriverController,
 } from "../controllers/driversControler.js";

 //Funciona
const getAllDriversHandler = async (req, res) => {
  const { name } = req.query;
  console.log(name);
  try {
    if (name) {
      const drivers = await getDriverbyNameController(name);
      console.log(drivers)
      res.status(200).send(drivers);
    } else {
      const drivers = await getAllDriversController();
      res.status(200).send(drivers);
    }
  } catch (error) {
    res.status(500).send({ error: error.error });
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
    const { name, email, password, debit, antiquity, User_Type } = req.body;

    const newDriver = await createDriverController({ name, email, password, debit, antiquity, User_Type }); // Pasar un objeto con todas las propiedades

    if (!name || !email || !password || !debit || !antiquity || !User_Type) {
      throw new Error("Faltan datos");
    }

    res.status(200).send(newDriver);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

//Funciona
const updateDriverHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, debit, antiquity, User_Type } = req.body;
    const driverModif = await updateDriverController(id, { name, email, password, debit, antiquity, User_Type }); // Pasar un objeto con todas las propiedades
    res.status(200).send(driverModif);
  } catch (error) {
    res.status(500).send({ error: error.error });
  }
};

//
const deleteDriverHandler = (req, res) => {
  try {

    const { id } = req.params;
    
    const driverDelete = deleteDriverController(id);

    res.status(200).send(driverDelete);
  } catch (error) {
    res.status(500).send({ error: error.error });
  }
};

export {
  getAllDriversHandler,
  getDriverByIdHandler,
  postDriverHandler,
  updateDriverHandler,
  deleteDriverHandler
};