import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { IAddress } from "../models/address";
import { AddressRepository } from "../repositories/address.repository";
import { UserRepository } from "../repositories/user.repository";

export class AddressService {
  constructor(
    private addressRepository: AddressRepository,
    private userRepository: UserRepository
  ) {}

  async createUserAddresss(addressData: IAddress) {
    const isUserExist = await this.userRepository.findById(addressData.userId);
    if (!isUserExist) {
      throw new NotFoundError(
        `User with id ${addressData.userId} does not exist`
      );
    }

    const userHasAdress = await this.addressRepository.findByUserId(
      addressData.userId
    );
    if (userHasAdress) {
      throw new BadRequestError("User already has an address");
    }

    const address = await this.addressRepository.createUserAdress(addressData);
    return address;
  }

  async getUserAddress(userId: string) {
    const isUserExist = await this.userRepository.findById(parseInt(userId));
    if (!isUserExist) {
      throw new NotFoundError(`User with id ${userId} does not exist`);
    }

    const address = await this.addressRepository.findByUserId(parseInt(userId));

    return address || null;
  }

  async updateUserAddress(userId: string, addressUpdates: Partial<IAddress>) {
    const isUserExist = await this.userRepository.findById(parseInt(userId));
    if (!isUserExist) {
      throw new NotFoundError(`User with id ${userId} does not exist`);
    }

    const address = await this.addressRepository.findByUserId(parseInt(userId));
    if (!address) {
      throw new NotFoundError("User does not have an address yet");
    }

    return this.addressRepository.updateAddress(
      parseInt(userId),
      addressUpdates
    );
  }
}
