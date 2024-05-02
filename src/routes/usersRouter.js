import { Router } from 'express';
import {
        getAllUsersHandler, 
        getUserByIdHandler,
        createUserHandler,
        updateUserHandler,
        deleteUserHandler
} from '../handlers/usersHandler.js';

const usersRouter = Router();

usersRouter.get('/', getAllUsersHandler);
usersRouter.get('/:id', getUserByIdHandler);
usersRouter.post('/', createUserHandler);
usersRouter.put('/:id', updateUserHandler);
usersRouter.delete('/:id', deleteUserHandler);

export default usersRouter;