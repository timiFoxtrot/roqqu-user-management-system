import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { IUser } from "../models/user";
import { UserRepository } from "../repositories/user.repository";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(userData: IUser) {
    const existingId = await this.userRepository.findById(userData.id!);
    if (existingId) {
      throw new BadRequestError("id already exists");
    }

    const existingEmail = await this.userRepository.findByEmail(userData.email);
    if (existingEmail) {
      throw new BadRequestError("Email already exists");
    }
    return this.userRepository.createUser(userData);
  }

  async getUsers(pageNumber: string, pageSize: string) {
    const intPageNumber = parseInt(pageNumber) || 1;
    const intPageSize = parseInt(pageSize) || 10;
    return this.userRepository.getUsers(intPageNumber, intPageSize);
  }

  async getUsersCount() {
    return this.userRepository.countUsers();
  }

  async getUserById(id: string) {
    const intId = parseInt(id);
    const user = await this.userRepository.findById(intId);

    if (!user) {
      throw new NotFoundError(`User with id ${id} not found`);
    }
    return this.userRepository.findById(intId);
  }
}
