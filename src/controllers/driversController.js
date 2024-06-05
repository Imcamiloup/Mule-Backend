// Importa los modelos y las funciones de validación necesarias
import { Driver, Enlistment, Branch, Vehicle } from "../database/db.js";

import {
  isValidEmail,
  isValidPassword,
  isValidDebit,
  isValidAntiquity,
  isValidStatus,
  isValidVehicleId,
} from "../utils/Validate/ValidateDriver/ValidateDriver.js";

// // Función para validar un UUID
const isValidUUID = (id) => {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
};

// // Función para validar un correo electrónico
// const isValidEmail = (email) => {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return emailRegex.test(email);
// };

// Controlador para obtener todos los conductores
const getAllDriversController = async (
  name,
  email,
  debit,
  antiquity,
  status,
  vehicle_id,
  branch_id,
  orderBy,
  orderDirection
) => {
  let where = {};

  if (name) where = { ...where, name };
  if (email) where = { ...where, email };
  if (debit) where = { ...where, debit };
  if (antiquity) where = { ...where, antiquity };
  if (status) where = { ...where, status };
  if (vehicle_id) where = { ...where, vehicle_id };
  if (branch_id) where = { ...where, branch_id };

  let order = [];
  if (orderBy && orderDirection) order = [[orderBy, orderDirection]];

  try {
    const drivers = await Driver.findAll({
      include: {
        model: Enlistment,
        attributes: ["id"],
        through: { attributes: [] },
      },
      where,
      order,
    });

    const driversMaped = drivers.map((elem) => {
      return {
        id: elem.id,
        name: elem.name,
        email: elem.email,
        password: elem.password,
        debit: elem.debit,
        antiquity: elem.antiquity,
        status: elem.status,
        vehicle_id: elem.vehicle_id,
        branch_id: elem.branch_id,
        enlistments: elem.Enlistments.map((elem) => elem.id),
      };
    });

    if (driversMaped.length === 0) throw Error("No drivers found");

    return driversMaped;
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
  status,
  vehicle_id,
  branch_id,
}) => {
  if (
    !name ||
    !email ||
    !password ||
    !debit ||
    !antiquity ||
    !status ||
    !vehicle_id ||
    !branch_id
  ) {
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

  if (!isValidPassword(password)) {
    throw new Error("Invalid password format");
  }

  if (!isValidDebit(debit)) {
    throw new Error("Invalid debit format");
  }

  if (!isValidAntiquity(antiquity)) {
    throw new Error("Invalid antiquity format");
  }

  if (!isValidStatus(status)) {
    throw new Error("Invalid status format");
  }

  if (!isValidVehicleId(vehicle_id)) {
    throw new Error("Invalid vehicle ID format");
  }

  // Crear el conductor
  return await Driver.create({
    name: name,
    email: email,
    password: password,
    debit: debit,
    antiquity: antiquity,
    status: status,
    vehicle_id: vehicle_id,
    branch_id: branch_id,
  });
};

// Controlador para actualizar un conductor
const updateDriverController = async (
  id,
  { name, email, password, debit, antiquity, status }
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
  if (!name && !email && !password && !debit && !antiquity && !status) {
    throw new Error("At least one field must be provided for update");
  }

  if (email && !isValidEmail(email)) {
    throw new Error("Invalid email format");
  }

  // Si el password está siendo actualizado, validar su formato
  if (password && !isValidPassword(password)) {
    throw new Error("Invalid password format");
  }

  if (debit && !isValidDebit(debit)) {
    throw new Error("Invalid debit format");
  }

  if (antiquity && !isValidAntiquity(antiquity)) {
    throw new Error("Invalid antiquity format");
  }

  if (status && !isValidStatus(status)) {
    throw new Error("Invalid status format");
  }

  // Actualizar los campos proporcionados
  if (name) driver.name = name;
  if (email) driver.email = email;
  if (password) driver.password = password;
  if (debit) driver.debit = debit;
  if (antiquity) driver.antiquity = antiquity;
  if (status) driver.status = status;

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

export const bulkCreateDrivers = async () => {
  setTimeout(async () => {
    const branches = await Branch.findAll();
    const vehicles = await Vehicle.findAll();

    const driversData = [
      {
        name: "Javier Gonzalez",
        email: "javier.gonzalez@gmail.com",
        password: "Clave123@",
        debit: "8917239928374289211036",
        antiquity: "1",
        status: "disponible",
        vehicle_id: vehicles[0].id,
        branch_id: branches[0].id,
      },
      {
        name: "Maria Fernandez",
        email: "maria.fernandez@yahoo.com",
        password: "Contraseña2021#",
        debit: "7921683798273612842219",
        antiquity: "2",
        status: "disponible",
        vehicle_id: vehicles[1].id,
        branch_id: branches[0].id,
      },
      {
        name: "Carlos Lopez",
        email: "carlos.lopez@outlook.com",
        password: "Seguro123$",
        debit: "6918273645091827219671",
        antiquity: "3",
        status: "disponible",
        vehicle_id: vehicles[2].id,
        branch_id: branches[1].id,
      },
      {
        name: "Ana Martinez",
        email: "ana.martinez@gmail.com",
        password: "Password2022!",
        debit: "5162718937456382911213",
        antiquity: "4",
        status: "en asignacion",
        vehicle_id: vehicles[3].id,
        branch_id: branches[1].id,
      },
      {
        name: "Juan Perez",
        email: "juan.perez@hotmail.com",
        password: "ClaveSegura@",
        debit: "4983917264509182734721",
        antiquity: "1",
        status: "disponible",
        vehicle_id: vehicles[4].id,
        branch_id: branches[2].id,
      },
      {
        name: "Laura Rodriguez",
        email: "laura.rodriguez@yahoo.com",
        password: "Contra123$",
        debit: "3718293746527361213647",
        antiquity: "5",
        status: "en asignacion",
        vehicle_id: vehicles[5].id,
        branch_id: branches[2].id,
      },
      {
        name: "Pedro Sanchez",
        email: "pedro.sanchez@outlook.com",
        password: "Passw0rd@2023",
        debit: "2827364509182736217412",
        antiquity: "2",
        status: "en asignacion",
        vehicle_id: vehicles[6].id,
        branch_id: branches[3].id,
      },
      {
        name: "Sofia Garcia",
        email: "sofia.garcia@gmail.com",
        password: "C0ntraseña#",
        debit: "1736182937465238219641",
        antiquity: "3",
        status: "en ruta",
        vehicle_id: vehicles[7].id,
        branch_id: branches[3].id,
      },
      {
        name: "Miguel Torres",
        email: "miguel.torres@hotmail.com",
        password: "ClaveFuerte123!",
        debit: "9172645091827364211023",
        antiquity: "4",
        status: "en ruta",
        vehicle_id: vehicles[8].id,
        branch_id: branches[4].id,
      },
      {
        name: "Lucia Ramirez",
        email: "lucia.ramirez@outlook.com",
        password: "P4ssw0rd!",
        debit: "8827364509182736212589",
        antiquity: "5",
        status: "en ruta",
        vehicle_id: vehicles[9].id,
        branch_id: branches[4].id,
      },
    ];

    const drivers = await Driver.findAll();

    if (drivers.length === 0) {
      Driver.bulkCreate(driversData);
    }
  }, 3000);
};

export {
  getAllDriversController,
  getDriverByIdController,
  createDriverController,
  updateDriverController,
  deleteDriverController,
};
