import db from '../services/db_query_service.js'

export class UserController {
  async getUser(req, res) {
    try {
      const user = await db.findByValue(['*'], 'user', 'email', req.user.email)
      const tags = await db.findByValue(['id', 'name', 'sortorder'], 'tag', 'creator', user[0].uid)
      console.log(tags)

      res.status(200).json({ email: user[0].email, nickname: user[0].nickname, tags: tags })
    } catch ({ message }) {
      res.status(400).json({ error: message })
    }
  }
  async updateUser(req, res) {
    try {
      const { uid } = req.user
      const columns = Object.keys(req.body)
      const values = Object.values(req.body)

      await db.updateByValue(columns, 'user', values, 'uid', uid)
      const newUser = await db.findByValue(['email', 'nickname'], 'user', 'uid', uid)

      res.status(200).json(newUser[0])
    } catch ({ message }) {
      res.status(400).json({ error: message })
    }
  }
  async deleteUser(req, res) {
    try {
      const { uid, nickname } = req.user
      await db.deleteByValue('user', 'uid', uid)
      res.status(200).json({ message: `User ${nickname} was successfully delited.` })
    } catch ({ message }) {
      res.status(400).json({ error: message })
    }
  }
  async createUserTag(req, res) {
    try {
      res.status(200).json({})
    } catch ({ message }) {
      res.status(400).json({ error: message })
    }
  }
  async deleteUserTagById(req, res) {
    try {
      res.status(200).json({})
    } catch ({ message }) {
      res.status(400).json({ error: message })
    }
  }
  async getUserTag(req, res) {
    try {
      res.status(200).json({})
    } catch ({ message }) {
      res.status(400).json({ error: message })
    }
  }
}
