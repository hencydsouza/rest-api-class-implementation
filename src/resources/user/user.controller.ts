import { Router, Request, Response, NextFunction } from 'express'
import HttpException from '../../utils/exceptions/http.exception'
import validationMiddleware from '../../middleware/validation.middleware'
import validate from './user.validation'
import UserService from './user.service'
import authenticated from '../../middleware/authenticated.middleware'
import token from '../../utils/token'
import userModel from './user.model'

class UserController {
    private UserModel = userModel

    // constructor() {
    // this.initializeRoutes()
    // }

    // private initializeRoutes(): void {
    //     this.router.post(
    //         `${this.path}/register`,
    //         validationMiddleware(validate.register),
    //         this.register
    //     )
    //     this.router.post(
    //         `${this.path}/login`,
    //         validationMiddleware(validate.login),
    //         this.login
    //     )
    //     this.router.get(
    //         `${this.path}`,
    //         authenticated,
    //         this.getUser
    //     )
    // } 

    public register = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { name, email, password } = req.body

            const user = await this.UserModel.create({ name, email, password, role: 'user' })

            const accessToken = token.createToken(user)

            res.status(201).json({ accessToken });
        } catch (error: any) {
            next(new HttpException(400, 'Unable to create user'))
        }
    }

    public login = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void | Response> => {
        try {
            const { email, password } = req.body

            const user = await this.UserModel.findOne({ email })
            let accessToken = ''

            if (!user) {
                throw new Error('Unable to find user with that Email Address')
            }

            if (await user.isValidPassword(password)) {
                accessToken = token.createToken(user);
            } else {
                throw new Error('Wrong credentials given')
            }

            res.status(200).json({ accessToken })
        } catch (error: any) {
            next(new HttpException(400, error.message))
        }
    }

    public getUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        if (!req.user) {
            return next(new HttpException(404, "Not logged in user"))
        }

        res.status(200).json({ user: req.user })
    }
}

export default UserController