import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { IPost } from "../models/post";
import { PostRepository } from "../repositories/post.repository";
import { UserRepository } from "../repositories/user.repository";

export class PostService {
  constructor(
    private postRepository: PostRepository,
    private userRepository: UserRepository
  ) {}

  async createPost(postData: IPost) {
    const isUserExist = await this.userRepository.findById(postData.userId);
    if (!isUserExist) {
      throw new NotFoundError(`User with id ${postData.userId} does not exist`);
    }

    const isTitleExist = await this.postRepository.findPostByTitle(
      postData.title
    );
    if (isTitleExist) {
      throw new BadRequestError("Title already taken");
    }

    const post = await this.postRepository.createPost(postData);
    return post;
  }

  async getPostsByUser(userId: string) {
    const isUserExist = await this.userRepository.findById(parseInt(userId));
    if (!isUserExist) {
      throw new NotFoundError(`User with id ${userId} does not exist`);
    }

    const posts = await this.postRepository.findPostsByUserId(parseInt(userId));

    return posts;
  }

  async deletePost(id: string) {
    const isPostExist = await this.postRepository.findPostById(parseInt(id));
    if (!isPostExist) {
      throw new NotFoundError(`Post with is ${id} does not exist`);
    }

    const deletedPost = await this.postRepository.deletePost(parseInt(id));

    return deletedPost;
  }
}
