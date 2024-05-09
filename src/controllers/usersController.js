import { User } from "../database/db.js"; 

const getAllUsersController = async () => {
    // Logic to get all users
  try {
    const users = await User.findAll();
    return users;
 }catch (error) {
  throw new Error("Error get users: " + error.message);
  }
}

const getUserByIdController = async (id) => {

  try {
    const user = await User.findByPk(id);
    return user;
  } catch (error) {
    throw new Error("Error get user by id: " + error.message);
  }
}

const createUserController = async (name, email, password, cedula, cel_phone_number, fee_category_percentage, category, age, role, isActive) => {

  try {
    const newUser = await User.create({ name, email, password, cedula, cel_phone_number, fee_category_percentage, category, age, role, isActive });
    return newUser;
  } catch (error) {
    throw new Error("Error creating user: " + error.message);
  }
}


const updateUserController = async (id, name, email, password) => {
  try {
    const user = await User.findByPk(id);
    user.name = name;
    user.email = email;
    user.password = password;
    await user.save();
    return user;
  } catch (error) {
    throw new Error("Error update user: " + error.message);
  }
}

const deleteUserController = async (id) => {
  try {
    if (!id) throw new Error("Missing id field");
    const user = await User.findByPk(id);
    if (!user) throw new Error("User not found");
    await user.destroy();
    return "User deleted successfully"
  } catch (error) {
    throw new Error("Error delete user: " + error.message);
  }
}

export { 
  getAllUsersController, 
  getUserByIdController, 
  createUserController, 
  updateUserController,
  deleteUserController
};


