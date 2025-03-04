import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";

export class UserController {
  constructor(private userService: UserService) {}

  createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const id = req.params.id;
      await this.userService.createUser({ id, ...req.body });
      res.status(201).json({
        status: "success",
        message: "User inserted successfully.",
      });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        status: "error",
        error: error.message || error,
      });
    }
  };

  getUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { pageNumber, pageSize } = req.query as {
        pageNumber: string;
        pageSize: string;
      };
      const result = await this.userService.getUsers(pageNumber, pageSize);
      res.status(200).json({
        status: "success",
        message: "Users fetched successfully.",
        data: result,
      });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        status: "error",
        error: error.message || error,
      });
    }
  };

  getUsersCount = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const result = await this.userService.getUsersCount();
      res.status(200).json({
        status: "success",
        message: "Users count fetched successfully.",
        data: result,
      });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        status: "error",
        error: error.message || error,
      });
    }
  };

  getUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
        const id = req.params.id
      const result = await this.userService.getUserById(id);
      res.status(200).json({
        status: "success",
        message: "User fetched successfully.",
        data: result,
      });
    } catch (error: any) {
        console.log({error})
      res.status(error.statusCode || 500).json({
        status: "error",
        error: error.message || error,
      });
    }
  }; 
}
