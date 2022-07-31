import express from 'express'
import db from '../db/index.js'
import { UserRoutes } from '../routes/user_routes.js'
import { TagRoutes } from '../routes/tag_routes.js'
import { AuthRoutes } from '../routes/auth_routes.js'

class App {
  constructor() {
    this.app = express()
    this.config()
    this.router()
    this.postgresSetup()
  }

  config() {
    this.app.use(express.json())
  }

  router() {
    new UserRoutes().route(this.app)
    new TagRoutes().route(this.app)
    new AuthRoutes().route(this.app)
  }

  async postgresSetup() {
    try {
      db.connect(() => {
        console.log('Database is connected.')
      })
    } catch ({ message }) {
      console.log(message)
    }
  }
}

export default new App().app
