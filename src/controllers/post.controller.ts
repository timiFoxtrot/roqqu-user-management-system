import { Request, Response, NextFunction } from "express";
import { PostService } from "../services/post.service";

export class PostController {
  constructor(private postService: PostService) {}

  createPost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { userId, title, body } = req.body;
      const [result] = await this.postService.createPost({
        userId,
        title,
        body,
      });
      res.status(201).json({
        status: "success",
        message: "Post inserted successfully.",
        data: result,
      });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        status: "error",
        error: error.message || error,
      });
    }
  };

  getPostsByUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { userId } = req.query as { userId: string };
      const result = await this.postService.getPostsByUser(userId);
      res.status(200).json({
        status: "success",
        message: "Posts fetched successfully.",
        data: result,
      });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        status: "error",
        error: error.message || error,
      });
    }
  };

  deletePost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const id = req.params.id;
      const result = await this.postService.deletePost(id);
      res.status(204).json({
        status: "success",
        message: "Post deleted successfully.",
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
