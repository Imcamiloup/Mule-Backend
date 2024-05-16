import { Router } from 'express';
import {
        getAllUsersHandler, 
        getUserByIdHandler,
        updateUserHandler,
        deleteUserHandler,
        registerHandler,
        loginHandler
} from '../handlers/usersHandler.js';
import { authenticateToken } from '../utils/helperToken/authenticateToken.js';

const usersRouter = Router();

usersRouter.get('/', getAllUsersHandler);
usersRouter.get('/:id', authenticateToken, getUserByIdHandler);
usersRouter.post('/register', registerHandler);
usersRouter.post('/login', loginHandler);
usersRouter.put('/:id', authenticateToken, updateUserHandler);
usersRouter.delete('/:id', authenticateToken, deleteUserHandler);

export default usersRouter;