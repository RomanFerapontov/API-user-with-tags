import { signJWT } from '../services/auth_service.js'
import db from '../services/db_query_service.js'
import dotenv from 'dotenv'
dotenv.config()

export class AuthController {
  async signin(req, res) {
    try {
      const { uid, email, password, nickname } = req.body
      await db.create('user', ['uid', 'email', 'password', 'nickname'], [uid, email, password, nickname])

      const token = signJWT(email, uid, process.env.SECRET)

      res.status(200).json({ token: token, expire: '1800' })
    } catch ({ message }) {
      res.status(400).json({ error: message })
    }
  }

  async login(req, res) {
    try {
      const { uid, email } = req.body
      const token = signJWT(email, uid, process.env.SECRET)

      res.status(200).json({ token: token, expire: '1800' })
    } catch ({ message }) {
      res.status(400).json({ error: message })
    }
  }
  async logout(req, res) {
    try {
      res.status(200).json({ message: `User ${req.user.nickname} logout.` })
    } catch ({ message }) {
      res.status(400).json({ error: message })
    }
  }
}
