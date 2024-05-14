import {
  getAllUsersController,
  getUserByIdController,
  createUserController,
  updateUserController,
  deleteUserController,
} from "../controllers/usersController.js";

const getAllUsersHandler = async (req, res) => {
  try {
    const users = await getAllUsersController();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getUserByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    // Obtener el rol del usuario autenticado desde la solicitud
    //const userRole = req.user.role;
    const user = await getUserByIdController(id /*,userRole*/);
    if (!user) throw new Error("User not found");
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const createUserHandler = async (req, res) => {
  try {
    const {
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
 
    } = req.body;

    // Verificar si todos los campos requeridos están presentes
    const requiredFields = [
      name,
      email,
      emailVerified,
      password,
      cedula,
      cel_Phone_Number,
      fee_Category_Percentage,
      age,
    ];

    if (requiredFields.some(field => !field)) {
      throw new Error("Missing fields");
    }

    // Validar cada campo individualmente según las reglas definidas en el modelo
    // Estas validaciones se realizan automáticamente gracias a las restricciones del modelo en Sequelize

    // Crear el nuevo usuario
    const newUser = await createUserController(
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
    );

    res.status(201).json(newUser);
  } catch (error) {
    // Manejar errores de validación
    if (error.name === "SequelizeValidationError") {

      res.status(400).send({ message: error.errors.map(err => err.message).join(", ") });
    } else {
      res.status(500).send({ message: error.message });
    }
  }
};

const updateUserHandler = async (req, res) => {
  try {
    const { id } = req.params;
    // const { user } = req; // Obtener el usuario autenticado desde la solicitud

    // // Verificar si el usuario autenticado tiene permiso para actualizar
    // if (user.role !== "admin") {
    //     return res.status(403).send({ message: "Unauthorized operation: User is not an admin" });
    // }

    // Obtener los campos actualizados del cuerpo de la solicitud
    const updatedFields = req.body;

    // Actualizar el usuario con los campos proporcionados
    const updatedUser = await updateUserController(id, updatedFields);

    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const deleteUserHandler = async (req, res) => {
  try {
    const { id } = req.params;
    // Obtener el rol del usuario autenticado desde la solicitud
    //  const userRole = req.user.role;

    //  // Verificar si el usuario autenticado tiene permiso para actualizar
    //  if (userRole !== "admin") {
    //      return res.status(403).send({ message: "Unauthorized operation: User is not an admin" });
    //  }
    const deletedUser = await deleteUserController(id);
    res.status(200).send(deletedUser);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export {
  getAllUsersHandler,
  getUserByIdHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
};
