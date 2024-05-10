// Importa los modelos y las funciones de validación necesarias
import { Driver } from "../database/db.js";

// Función para validar un UUID
const isValidUUID = (id) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
};

// Función para validar un correo electrónico
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};


// Controlador para obtener todos los conductores
const getAllDriversController = async () => {
  try {
    const drivers = await Driver.findAll({
      include: {
        model: Enlistment,
        attributes: ["id"],
        through: { attributes: [] },
      },
    });
    return drivers;
  } catch (error) {
    throw new Error("Error getting drivers: " + error.message);
  }
};

// Controlador para obtener un conductor por su ID
const getDriverByIdController = async (id) => {
  if (!id) {
    throw new Error("Missing driver ID");
  }

  if (!isValidUUID(id)) {
    throw new Error("Invalid driver ID format");
  }

  try {
    const driver = await Driver.findByPk(id);
    if (!driver) {
      throw new Error("Driver not found");
    }
    return driver;
  } catch (error) {
    throw new Error("Error getting driver: " + error.message);
  }
};

// Controlador para crear un nuevo conductor
const createDriverController = async ({
  name,
  email,
  password,
  debit,
  antiquity,
  user_type,
}) => {
  if (!name || !email || !password || !debit || !antiquity || !user_type) {
    throw new Error("Missing required fields");
  }

  if (!isValidEmail(email)) {
    throw new Error("Invalid email format");
  }

  // Verificar si el correo electrónico ya está en uso
  const existingDriver = await Driver.findOne({ where: { email } });
  if (existingDriver) {
    throw new Error("Email is already in use");
  }

  // Crear el conductor
  return await Driver.create({
    name: name,
    email: email,
    password: password,
    debit: debit,
    antiquity: antiquity,
    user_type: user_type,
  });
};

// Controlador para actualizar un conductor
const updateDriverController = async (
  id,
  { name, email, password, debit, antiquity, User_Type }
) => {
  if (!id) {
    throw new Error("Missing driver ID");
  }

  if (!isValidUUID(id)) {
    throw new Error("Invalid driver ID format");
  }

  const driver = await getDriverByIdController(id);

  if (!driver) {
    throw new Error("Driver not found");
  }

  // Validar que al menos uno de los campos a actualizar sea proporcionado
  if (!name && !email && !password && !debit && !antiquity && !User_Type) {
    throw new Error("At least one field must be provided for update");
  }

  if (email && !isValidEmail(email)) {
    throw new Error("Invalid email format");
  }

  // Actualizar los campos proporcionados
  if (name) driver.name = name;
  if (email) driver.email = email;
  if (password) driver.password = password;
  if (debit) driver.debit = debit;
  if (antiquity) driver.antiquity = antiquity;
  if (User_Type) driver.User_Type = User_Type;

  // Guardar los cambios
  await driver.save();
  return driver;
};

// Controlador para eliminar un conductor
const deleteDriverController = async (id) => {
  if (!id) {
    throw new Error("Missing driver ID");
  }

  if (!isValidUUID(id)) {
    throw new Error("Invalid driver ID format");
  }

  const driver = await getDriverByIdController(id);

  if (!driver) {
    throw new Error("Driver not found");
  }

  // Eliminar el conductor
  await driver.destroy();
  return { message: "Driver deleted successfully" };
};

export {
  getAllDriversController,
  getDriverByIdController,
  createDriverController,
  updateDriverController,
  deleteDriverController,
};
