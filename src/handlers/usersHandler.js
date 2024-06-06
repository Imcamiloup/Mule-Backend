import {
  getAllUsersController,
  getUserByIdController,
  getUserByDNIController,
  updateUserController,
  deleteUserController,
  registercontroller,
  registerAuth0controller,
  loginController,
  updateProfileController,
} from "../controllers/usersController.js";
import { User } from "../database/db.js";

const getAllUsersHandler = async (req, res) => {
  // Obtener el rol del usuario autenticado desde la solicitud
  const userRole = req.user.role;
  console.log(userRole);
  // // Verificar si el usuario autenticado tiene permiso para actualizar
  if (userRole !== "admin") {
    return res
      .status(403)
      .send({ message: "Unauthorized operation: User is not an admin" });
  }

  try {
    const users = await getAllUsersController();
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const getUserByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserByIdController(id);
    if (!user) throw new Error("User not found");
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const getUserByDNIHandler = async (req, res) => {
  try {
    const { dni } = req.params;
    const user = await getUserByDNIController(dni);
    if (!user) throw new Error("User not found");
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const genereteAuth0User = async (req, res) => {
  const { email, name } = req.body;
  try {
    const token = await registerAuth0controller(email, name);

    res.status(200).json(token);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const registerHandler = async (req, res) => {
  const { email, password, name } = req.body;
  const userExisting = await User.findOne({ where: { email } });
  if (userExisting)
    return res.status(400).json({ message: "User already exists" });
  try {
    const user = await registercontroller(email, password, name);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginHandler = async (req, res) => {
  const { email, password, name } = req.body;
  let userExisting = null;
  try {
    if (email != undefined) {
      userExisting = await User.findOne({
        where: { email: email },
      });
    } else {
      userExisting = await User.findOne({
        where: { name: name },
      });
    }
    if (!userExisting) {
      return res.status(400).json({ error: "Email not found" });
    }
    if (!userExisting.isActive) {
      return res.status(400).json({ error: "User not Active" });
    }
    const token = await loginController(userExisting, password);
    res.cookie("token", token, { httpOnly: true });
    res.json({ message: "Inicio de sesión exitoso", token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateUserHandler = async (req, res) => {
  try {
    const { id } = req.params;
    // Obtener el rol del usuario autenticado desde la solicitud
    const userRole = req.user.role;
    // // Verificar si el usuario autenticado tiene permiso para actualizar
    if (userRole !== "admin") {
      return res
        .status(403)
        .send({ message: "Unauthorized operation: User is not an admin" });
    }

    // Obtener los campos actualizados del cuerpo de la solicitud
    const updatedFields = req.body;

    // Actualizar el usuario con los campos proporcionados
    const updatedUser = await updateUserController(id, updatedFields);
    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const updateProfileHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFields = req.body;

    const updatedUser = await updateProfileController(id, updatedFields);
    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const deleteUserHandler = async (req, res) => {
  try {
    const { id } = req.params;
    // Obtener el rol del usuario autenticado desde la solicitud
    const userRole = req.user.role;
    // // Verificar si el usuario autenticado tiene permiso para actualizar
    if (userRole !== "admin") {
      return res
        .status(403)
        .send({ message: "Unauthorized operation: User is not an admin" });
    }

    const deletedUser = await deleteUserController(id);
    res.status(200).send(deletedUser);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

export {
  getAllUsersHandler,
  getUserByIdHandler,
  getUserByDNIHandler,
  updateUserHandler,
  deleteUserHandler,
  registerHandler,
  genereteAuth0User,
  loginHandler,
  updateProfileHandler,
};
