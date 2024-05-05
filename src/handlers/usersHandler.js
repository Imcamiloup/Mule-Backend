import { 
    getAllUsersController,  
    getUserByIdController,
    createUserController,
    updateUserController,
    deleteUserController
 } from '../controllers/usersController.js';


const  getAllUsersHandler = async (req, res) => {
    try {
        console.log('users');
        const users = await getAllUsersController();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

const getUserByIdHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await getUserByIdController(id);
        if (!user) throw new Error('User not found');
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

const createUserHandler = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) throw new Error('Missing fields');
        const newUser = await createUserController(name, email, password);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

const updateUserHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;
        const user = await updateUserController(id, name, email, password);
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

const deleteUserHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await deleteUserController(id);
        res.status(200).send(deletedUser);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

export {
        getAllUsersHandler, 
        getUserByIdHandler,
        createUserHandler,
        updateUserHandler,
        deleteUserHandler
};