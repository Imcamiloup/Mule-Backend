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


export { getAllUsersController };


