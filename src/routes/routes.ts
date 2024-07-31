import { Router } from "express";
import PostController from "../resources/post/post.controller";

const router = Router()

const post = new PostController()

// User post routes
router.route('/posts').post(post.create).get(post.getAllPosts)

export default router