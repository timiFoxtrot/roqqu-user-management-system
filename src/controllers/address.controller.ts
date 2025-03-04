import { Request, Response, NextFunction } from "express";
import { AddressService } from "../services/address.service";

export class AddressController {
  constructor(private addressService: AddressService) {}

  createAddress = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { userId, street, city, state, postal_code } = req.body;
      await this.addressService.createUserAddresss({
        userId,
        street,
        city,
        state,
        postal_code,
      });
      res.status(201).json({
        status: "success",
        message: "Address inserted successfully.",
      });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        status: "error",
        error: error.message || error,
      });
    }
  };

  getUserAddress = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const userId = req.params.userId;
      const result = await this.addressService.getUserAddress(userId);
      res.status(200).json({
        status: "success",
        message: result
          ? "User address fetched successfully."
          : "User does not have an address.",
        data: result,
      });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        status: "error",
        error: error.message || error,
      });
    }
  };

  updateAddress = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const userId = req.params.userId;
      const result = await this.addressService.updateUserAddress(
        userId,
        req.body
      );
      res.status(200).json({
        status: "success",
        message: "Address updated successfully.",
        data: result,
      });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        status: "error",
        error: error.message || error,
      });
    }
  };
}
