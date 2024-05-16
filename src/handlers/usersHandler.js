import {
  getAllUsersController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
  registercontroller,
  loginController,
} from "../controllers/usersController.js";
import { User } from "../database/db.js";

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

const registerHandler = async (req,res) =>{
  const {email,password} =req.body;
  try {
    const user = await registercontroller(email,password);
    res.status(200).json(user);
  }catch(error){
    res.status(400).json({message:error.message})
  }
}

const loginHandler = async (req,res) =>{
  const {email,password} = req.body;
  try {
    const userExisting = await User.findOne({where: {email}});
    if(!userExisting){ 
      return res.status(400).json({error:"Email not found"});
    }
    if(!userExisting.isActive){ 
      return res.status(400).json({error:"User not Active"});
    }
    const token = await loginController(userExisting,password);
    res.cookie("token",token,{httpOnly:true});
    res.json({ message: "Inicio de sesión exitoso", token });
    // res.json(authenticatedUser);
    // console.log("Ingreso exitoso");
    
  } catch (error) {
    res.status(400).json({message:error.message});    

  }
}


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
  updateUserHandler,
  deleteUserHandler,
  registerHandler,
  loginHandler,
};
