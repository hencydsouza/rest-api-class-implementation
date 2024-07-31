import express from "express";
import PostController from "../resources/post/post.controller";

const post = new PostController()

class Routes {
    public router = express.Router()

    constructor() {
        this.createPostRoutes()
    }

    private createPostRoutes() {
        this.router.post('/posts', post.create)
        this.router.get('/posts', post.getAllPosts)
    }
}

export default Routes