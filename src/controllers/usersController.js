import { User } from "../database/db.js";

const getAllUsersController = async () => {
  // Logic to get all users
  try {
    const users = await User.findAll({ where: { isActive: true } });
    return users;
  } catch (error) {
    throw new Error("Error get users: " + error.message);
  }
};

const getUserByIdController = async (id, userRole) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    // // Si el rol del usuario es admin, devolver todos los campos del usuario
    // if (userRole === 'admin') {
    //   return user;
    // } else {
    //   // Si el rol del usuario no es admin, devolver solo ciertos campos
    //   const { id, name, email } = user;
    //   return { id, name, email };
    // }
    return user;
  } catch (error) {
    throw new Error("Error al obtener el usuario por ID: " + error.message);
  }
};

const createUserController = async (
  name,
  email,
  emailVerified,
  password,
  cedula,
  cel_Phone_Number,
  fee_Category_Percentage,
  category,
  age,
  role,
  isActive,
  photo
) => {
  try {
    const newUser = await User.create({
      name,
      email,
      emailVerified,
      password,
      cedula,
      cel_Phone_Number,
      fee_Category_Percentage,
      category,
      age,
      role,
      isActive,
      photo,
    });
    return newUser;
  } catch (error) {
    throw new Error("Error creating user: " + error.message);
  }
};

const updateUserController = async (id, updatedFields) => {
  try {
    // Buscar el usuario por su ID
    const user = await User.findByPk(id);

    // Verificar si el usuario existe
    if (!user) {
      throw new Error("User not found");
    }

    // Actualizar los datos del usuario
    for (const key in updatedFields) {
      if (updatedFields.hasOwnProperty(key)) {
        user[key] = updatedFields[key];
      }
    }

    // Guardar los cambios en la base de datos
    await user.save();

    // Devolver el usuario actualizado
    return user;
  } catch (error) {
    // Manejar errores
    throw new Error("Error updating user: " + error.message);
  }
};

const deleteUserController = async (id) => {
  try {
    if (!id) throw new Error("Missing id field");
    const user = await User.findByPk(id);
    if (!user) throw new Error("User not found");
    user.isActive = false;
    await user.save();
    return "User deleted successfully";
  } catch (error) {
    throw new Error("Error delete user: " + error.message);
  }
};

export {
  getAllUsersController,
  getUserByIdController,
  createUserController,
  updateUserController,
  deleteUserController,
};
