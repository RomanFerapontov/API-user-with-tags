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
      console.log(req.query)

      const tags = await db.findAll(['creator', 'name', 'sortorder'], 'tag')
      const creators = await db.findAll(['nickname', 'uid'], 'user')

      const tagsWithCreators = tags.map((tag) => {
        for (let key of creators) {
          if (key.uid == tag.creator) {
            tag.creator = key
            return tag
          }
        }
      })

      res.status(200).json({})
    } catch ({ message }) {
      res.status(400).json({ error: message })
    }
  }
  async getTagById(req, res) {
    try {
      const tag = await db.findByValue(['creator', 'name', 'sortorder'], 'tag', 'id', req.params.id)
      const user = await db.findByValue(['nickname', 'uid'], 'user', 'uid', tag[0].creator)
      tag[0].creator = user[0]

      res.status(200).json(tag[0])
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
