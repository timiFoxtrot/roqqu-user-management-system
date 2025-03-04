import knex from "../database/knex";
import { IAddress } from "../models/address";

export class AddressRepository {
  async createUserAdress(addressData: IAddress) {
    const { userId, street, city, state, postal_code } = addressData;
    return knex("addresses").insert({
      user_id: userId,
      street,
      city,
      state,
      postal_code,
    });
  }

  async findByUserId(userId: number): Promise<IAddress | undefined> {
    return knex("addresses").where({ user_id: userId }).first();
  }

  async updateAddress(
    userId: number,
    addressUpdates: Partial<IAddress>
  ): Promise<number> {
    return knex("addresses")
      .where({ user_id: userId })
      .update({
        ...addressUpdates,
        updated_at: knex.fn.now(),
      });
  }
}
