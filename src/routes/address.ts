import { Router } from "express";
import { createAddressSchema, updateAddressSchema } from "../validations";
import { AddressRepository } from "../repositories/address.repository";
import { AddressService } from "../services/address.service";
import { AddressController } from "../controllers/address.controller";
import { UserRepository } from "../repositories/user.repository";

export const addressRouter = Router();

const addressRepository = new AddressRepository();
const userRepository = new UserRepository();
const addressService = new AddressService(addressRepository, userRepository);
const addressController = new AddressController(addressService);

addressRouter.post("/", createAddressSchema, addressController.createAddress);
addressRouter.get("/:userId", addressController.getUserAddress);
addressRouter.patch(
  "/:userId",
  updateAddressSchema,
  addressController.updateAddress
);
