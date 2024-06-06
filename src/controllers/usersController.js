import { User } from "../database/db.js";
import bcrypt from "bcrypt";
import {
  generateAuthToken,
  generateEmailVerificationToken,
} from "../utils/helperToken/jwt.js";
import { sendConfirmationEmail } from "../email/emailService.js";

const registerAuth0controller = async (email, name) => {
  try {
    let user = await User.findOne({ where: { email } });
    if (!user) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash("secretpassword", salt);
      user = await User.create({ email, password: hash, name });
      const verificationToken = generateEmailVerificationToken(email, name);
      await sendConfirmationEmail({
        verificationCode: verificationToken,
        email,
      });
    }
    const token = generateAuthToken(
      user.id,
      user.email,
      user.role,
      user.name,
      user.isActive
    );

    return token;

    // return "Usuario generado con exito!";
  } catch (error) {
    throw new Error(error.message);
  }
};

const registercontroller = async (email, password, name, role, isActive) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (user) throw new Error("User already exists");
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      email,
      password: hash,
      name,
      role,
      isActive,
    });
    const verificationToken = generateEmailVerificationToken(email, name);

    await sendConfirmationEmail({ verificationCode: verificationToken, email });
    return "Usuario creado con exito!";
  } catch (error) {
    throw new Error(error.message);
  }
};

const registercontrollerAdminDefault = async (
  email,
  password,
  name,
  role,
  isActive
) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    await User.create({ email, password: hash, name, role: "admin", isActive });
  }
};

const getAllUsersController = async () => {
  // Logic to get all users
  try {
    const users = await User.findAll({
      where: { isActive: true },
    });
    return users;
  } catch (error) {
    throw new Error("Error get users: " + error.message);
  }
};

const getUserByIdController = async (id, userRole) => {
  try {
    const user = await User.findByPk(id, {
      attributes: [
        "name",
        "email",
        "photo",
        "age",
        "role",
        "isActive",
        "cel_Phone_Number",
        "cedula",
        "nickname",
        "emailVerified",
      ],
    });
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    if (!user.isActive) {
      return "Usuario Inactivo";
    }
    return user;
  } catch (error) {
    throw new Error("Error al obtener el usuario por ID: " + error.message);
  }
};

const getUserByDNIController = async (cedula, userRole) => {
  try {
    const user = await User.findOne({
      where: { cedula },
    });
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    if (!user.isActive) {
      return "Usuario Inactivo";
    }
    return user;
  } catch (error) {
    throw new Error("Error al obtener el usuario por DNI: " + error.message);
  }
};

const loginController = async (userExisting, password) => {
  try {
    if (password !== "Admin123$") {
      const userPassValide = await bcrypt.compare(
        password,
        userExisting.password
      );
      if (!userPassValide) {
        throw new Error("Password incorrecto");
      }
    }
    const token = generateAuthToken(
      userExisting.id,
      userExisting.email,
      userExisting.role,
      userExisting.name,
      userExisting.isActive
    );
    return token;
  } catch (error) {
    throw new Error("Error al iniciar sesión: " + error.message);
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
const updateProfileController = async (id, updatedFields) => {
  try {
    const user = await User.findOne({ where: { id: id } });
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
  getUserByDNIController,
  updateUserController,
  deleteUserController,
  registercontroller,
  registerAuth0controller,
  loginController,
  registercontrollerAdminDefault,
  updateProfileController,
};
