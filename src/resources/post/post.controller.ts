import { Router, Request, Response, NextFunction } from 'express'
import HttpException from '../../utils/exceptions/http.exception'
import PostModel from "./post.model";
import Controller from '../../utils/interfaces/controller.interface';

class PostController {
    private postModel = PostModel

    public create = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { title, body } = req.body

            const post = await this.postModel.create({ title, body })

            res.status(201).json({ post });
        } catch (error: any) {
            next(new HttpException(400, error.message))
        }
    }

    public getAllPosts = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const posts = await this.postModel.find()

            res.status(200).json({ posts })
        } catch (error: any) {
            next(new HttpException(400, error.message))
        }
    }
}

export default PostController