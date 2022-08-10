import { TagController } from '../controllers/tag_controller.js'
import { ApiMiddleware } from '../middleware/validaton_middleware.js'

export class TagRoutes {
  constructor() {
    this.tagController = new TagController()
    this.authorize = new ApiMiddleware().authorize
  }
  route(app) {
    app.get('/tag', [this.authorize], this.tagController.getTags)
    app.post('/tag', [this.authorize], this.tagController.createTag)
    app.get('/tag/:id', [this.authorize], this.tagController.getTagById)
    app.put('/tag/:id', [this.authorize], this.tagController.updateTagById)
    app.delete('/tag/:id', [this.authorize], this.tagController.deleteTagById)
  }
}
