import db from '../services/db_query_service.js'

export class TagController {
  async createTag(req, res) {
    try {
      const { uid } = req.user
      const { name, sortOrder } = req.body

      await db.create('tag', ['creator', 'name', 'sortorder'], [uid, name, sortOrder])
      const newTag = await db.findByValue(['id', 'name', 'sortOrder'], 'tag', 'name', name)
      console.log(newTag)
      res.status(200).json(newTag)
    } catch ({ message }) {
      res.status(400).json({ error: message })
    }
  }
  async getTags(req, res) {
    try {
      res.status(200).json({})
    } catch ({ message }) {
      res.status(400).json({ error: message })
    }
  }
  async getTagById(req, res) {
    try {
      res.status(200).json({})
    } catch ({ message }) {
      res.status(400).json({ error: message })
    }
  }
  async updateTagById(req, res) {
    try {
      res.status(200).json({})
    } catch ({ message }) {
      res.status(400).json({ error: message })
    }
  }
  async deleteTagById(req, res) {
    try {
      res.status(200).json({})
    } catch ({ message }) {
      res.status(400).json({ error: message })
    }
  }
}
