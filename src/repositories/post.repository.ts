import knex from "../database/knex";
import { IAddress } from "../models/address";
import { IPost } from "../models/post";

export class PostRepository {
  async createPost(postData: IPost) {
    const { userId, title, body } = postData;
    return knex("posts").insert({
      user_id: userId,
      title,
      body,
    });
  }

  async findPostsByUserId(userId: number): Promise<IPost[]> {
    return knex("posts").where({ user_id: userId });
  }

  async findPostByTitle(title: string): Promise<IPost | undefined> {
    return knex("posts").where({ title }).first();
  }

  async deletePost(id: number): Promise<number> {
    return knex("posts").where({ id }).delete();
  }

  async findPostById(id: number): Promise<IPost> {
    return knex("posts").where({ id }).first();
  }
}
