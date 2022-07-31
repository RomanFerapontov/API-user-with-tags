import db from '../db/index.js'
import jwt from 'jsonwebtoken'

export class AuthController {
  async signJWT(email, secret) {
    try {
      const token = await jwt.sign(email, { iat: Math.floor(Date.now() / 1000) }, secret, {
        algorithm: 'HS256',
        expiresIn: 30 * 60,
      })
      return token
    } catch (error) {
      throw new Error('Sign error.')
    }
  }

  async signin(req, res) {
    try {
      const { uid, email, password, nickname } = req.body
      await db.query(
        'INSERT INTO "user" (uid, email, password, nickname) values ($1, $2, $3, $4)',
        [uid, email, password, nickname],
      )

      const token = this.signJWT(email, process.env.SECRET)

      res.status(200).json({ token: token, expire: '1800' })
    } catch ({ message }) {
      res.status(400).json({ error: message })
    }
  }

  async login(req, res) {
    try {
      const token = this.signJWT(email, process.env.SECRET)
      res.status(200).json({ token: token, expire: '1800' })
    } catch ({ message }) {
      res.status(400).json({ error: message })
    }
  }
  async logout(req, res) {
    try {
      res.status(200).json({})
    } catch ({ message }) {
      res.status(400).json({ error: message })
    }
  }
}
