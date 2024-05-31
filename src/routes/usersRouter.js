import { Router } from "express";
import {
  getAllUsersHandler,
  getUserByIdHandler,
  updateUserHandler,
  deleteUserHandler,
  registerHandler,
  loginHandler,
  updateProfileHandler,
  genereteAuth0User
} from "../handlers/usersHandler.js";
import { confirmEmail } from "../email/sendgridController.js";
import { authenticateToken } from "../utils/helperToken/authenticateToken.js";

const usersRouter = Router();

usersRouter.get("/", authenticateToken, getAllUsersHandler);
usersRouter.get("/:id", getUserByIdHandler);
usersRouter.get("/email-confirmation/:verificationCode", confirmEmail);
usersRouter.post("/register", registerHandler);
usersRouter.post("/register-auth0", genereteAuth0User);
usersRouter.post("/login", loginHandler);
usersRouter.patch("/:id", authenticateToken, updateUserHandler);
usersRouter.patch("/profile/:id", updateProfileHandler)
usersRouter.delete("/:id", authenticateToken, deleteUserHandler);

export default usersRouter;
