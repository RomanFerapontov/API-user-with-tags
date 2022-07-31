import { validate, register, authorize } from '../middleware/index.js'
import { AuthController } from '../controllers/auth_controller.js'
import { checkSchema } from 'express-validator'
import validationSchema from '../models/validation-schema.js'
import authSchema from '../models/auth-schema.js'

export class AuthRoutes {
  constructor() {
    this.authController = new AuthController()
  }
  route(app) {
    app.post(
      '/signin',
      [checkSchema(validationSchema), validate, register],
      this.authController.signin,
    )
    app.post('/login', [checkSchema(authSchema), validate, authorize], this.authController.login)
    app.post('/logout', this.authController.logout)
  }
}
