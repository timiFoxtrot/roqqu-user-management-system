import knex from "../database/knex";
import { IUser } from "../models/user";

export class UserRepository {
  async createUser(userData: IUser) {
    return knex("users").insert(userData);
  }

  async findById(id: number): Promise<IUser | undefined> {
    const result = await knex("users")
      .leftJoin("addresses", "users.id", "addresses.user_id")
      .select(
        "users.id",
        "users.name",
        "users.email",
        "users.created_at",
        "users.updated_at",
        "addresses.id as address_id",
        "addresses.street",
        "addresses.city",
        "addresses.state",
        "addresses.postal_code",
        "addresses.created_at as address_created_at",
        "addresses.updated_at as address_updated_at"
      )
      .where("users.id", id)
      .first();

    if (!result) return undefined;

    const user: IUser = {
      id: result.id,
      name: result.name,
      email: result.email,
      created_at: result.created_at,
      updated_at: result.updated_at,
      address: result.address_id
        ? {
            id: result.address_id,
            street: result.street,
            city: result.city,
            state: result.state,
            postal_code: result.postal_code,
            created_at: result.address_created_at,
            updated_at: result.address_updated_at,
          }
        : undefined,
    };

    return user;
  }

  async findByEmail(email: string): Promise<IUser | undefined> {
    return knex("users").where({ email }).first();
  }

  async getUsers(
    pageNumber: number = 1,
    pageSize: number = 10
  ): Promise<IUser[]> {
    return knex("users")
      .limit(pageSize)
      .offset((pageNumber - 1) * pageSize);
  }

  async countUsers(): Promise<number | string> {
    const result = await knex("users").count("* as count");
    return result[0].count;
  }
}
