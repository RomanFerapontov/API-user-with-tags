import { UserController } from '../controllers/user_controller.js'
import { ApiMiddleware } from '../middleware/validaton_middleware.js'
import { checkSchema } from 'express-validator'
import updateSchema from '../models/update_user_schema.js'

export class UserRoutes {
  constructor() {
    this.userController = new UserController()
    this.validate = new ApiMiddleware().validate
    this.authorize = new ApiMiddleware().authorize
    this.registrate = new ApiMiddleware().registrate
    this.checkFields = new ApiMiddleware().checkFieldsBeforeUpdate
  }

  route(app) {
    app.get('/user', this.authorize, this.userController.getUser)
    app.put('/user', [this.checkFields, checkSchema(updateSchema), this.validate, this.authorize], this.userController.updateUser)
    app.delete('/user', [this.authorize], this.userController.deleteUser)
    app.get('/user/tag/my', [this.authorize], this.userController.getUserTag)
    app.delete('/user/tag/:id', [this.authorize], this.userController.deleteUserTagById)
  }
}
