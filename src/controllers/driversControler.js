import { Driver } from "../database/db.js";

const getAllDriversController = async () => {
  try {
    const drivers = await Driver.findAll();
    return drivers;
  } catch (error) {
    throw new Error("Error get users: " + error.message);
  }
};

const getDriverByIdController = async (id) => {
  try {
    const driver = await Driver.findByPk(id);
    return driver;
  } catch (error) {
    throw new Error("Error get user: " + error.message);
  }
};

const getDriverbyNameController = async (name) => {
  try {
    const driver = await Driver.findOne({ where: { name: name } });
    return driver;
  } catch (error) {
    throw new Error("Error get user: " + error.message);
  }
};

const createDriverController = async ({
  name,
  email,
  password,
  debit,
  antiquity,
  User_Type,
}) => {
  return await Driver.create({
    name: name,
    email: email,
    password: password,
    debit: debit,
    antiquity: antiquity,
    User_Type: User_Type,
  });
};

const updateDriverController = async (
  id,
  { name, email, password, debit, antiquity, User_Type }
) => {
  const driver = await getDriverByIdController(id);
  driver.name = name;
  driver.email = email;
  driver.password = password;
  driver.debit = debit;
  driver.antiquity = antiquity;
  driver.User_Type = User_Type;
  await driver.save();
  return driver;
};

const deleteDriverController = async (id) => {
  const driver = await getDriverByIdController(id);
  await driver.destroy();
};

export {
  getAllDriversController,
  getDriverByIdController,
  getDriverbyNameController,
  createDriverController,
  updateDriverController,
  deleteDriverController,
};
