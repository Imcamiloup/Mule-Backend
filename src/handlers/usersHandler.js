import { getAllUsersController } from '../controllers/usersController.js';


const  getAllUsersHandler = async (req, res) => {
    try {
        console.log('users');
        const users = await getAllUsersController();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}


export { getAllUsersHandler };