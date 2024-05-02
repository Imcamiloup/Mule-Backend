import { Router } from 'express';
import { getAllUsersHandler } from '../handlers/usersHandler.js';

const usersRouter = Router();

usersRouter.get('/', getAllUsersHandler);
// usersRouter.get('/users/:id', getUserByIdHandler);
// usersRouter.post('/users', createUserHandler);
// usersRouter.put('/users/:id', updateUserHandler);
// usersRouter.delete('/users/:id', deleteUserHandler);

export default usersRouter;