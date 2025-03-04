import { Router } from "express";
import { createPostSchema } from "../validations";
import { UserRepository } from "../repositories/user.repository";
import { PostRepository } from "../repositories/post.repository";
import { PostService } from "../services/post.service";
import { PostController } from "../controllers/post.controller";

export const postRouter = Router();

const postRepository = new PostRepository();
const userRepository = new UserRepository();
const postService = new PostService(postRepository, userRepository);
const postController = new PostController(postService);

postRouter.post("/", createPostSchema, postController.createPost);
postRouter.get("/", postController.getPostsByUser);
postRouter.delete("/:id", postController.deletePost);
