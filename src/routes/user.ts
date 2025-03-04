import { Router } from "express";
import { UserRepository } from "../repositories/user.repository";
import { UserService } from "../services/user.service";
import { UserController } from "../controllers/user.controller";
import { createUserSchema } from "../validations";

export const userRouter = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRouter.post("/:id", createUserSchema, userController.createUser);
userRouter.get("/", userController.getUsers);
userRouter.get("/count", userController.getUsersCount);
userRouter.get("/:id", userController.getUser);
