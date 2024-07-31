import express from "express";
import PostController from "../resources/post/post.controller";
import UserController from "../resources/user/user.controller";
import authenticated from '../middleware/authenticated.middleware'

class Routes {
    public router = express.Router()

    private post = new PostController()
    private user = new UserController()

    constructor() {
        this.createPostRoutes()
        this.createUserRoutes()
    }

    private createPostRoutes() {
        this.router.post('/posts', this.post.create)
        this.router.get('/posts', this.post.getAllPosts)
    }

    private createUserRoutes() {
        this.router.post('/users/register', this.user.register)
        this.router.post('/users/login', this.user.login)
        this.router.get('/users', authenticated, this.user.getUser)
    }
}

export default Routes