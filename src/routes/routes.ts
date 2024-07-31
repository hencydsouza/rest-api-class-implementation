import express from "express";
import PostController from "../resources/post/post.controller";

class Routes {
    public router = express.Router()
    private post = new PostController()

    constructor() {
        this.createPostRoutes()
    }

    private createPostRoutes() {
        this.router.post('/posts', this.post.create)
        this.router.get('/posts', this.post.getAllPosts)
    }
}

export default Routes