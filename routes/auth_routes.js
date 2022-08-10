import { checkSchema } from 'express-validator'
import loginSchema from '../models/login_schema.js'
import signinSchema from '../models/signin_schema.js'
import { AuthController } from '../controllers/auth_controller.js'
import { ApiMiddleware } from '../middleware/validaton_middleware.js'

export class AuthRoutes {
  constructor() {
    this.authController = new AuthController()
    this.validate = new ApiMiddleware().validate
    this.authorize = new ApiMiddleware().authorize
    this.registrate = new ApiMiddleware().registrate
    this.authenticate = new ApiMiddleware().authenticate
  }
  route(app) {
    app.post(
      '/signin',
      [checkSchema(signinSchema), this.validate, this.registrate],
      this.authController.signin,
    )
    app.post(
      '/login',
      [checkSchema(loginSchema), this.validate, this.authenticate],
      this.authController.login,
    )
    app.post('/logout', this.authorize, this.authController.logout)
  }
}
