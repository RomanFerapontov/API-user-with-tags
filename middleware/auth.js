import db from '../db/index.js'

export default async function authorize(req, res, next) {
  try {
    const { email } = req.body

    const userMail = await db.query('SELECT $1 FROM "user"', [email])

    if (!userMail.rows.find((el) => el.email === email)) {
      throw new Error(`User not sign.`)
    }
    next()
  } catch ({ message }) {
    res.status(400).json({ error: message })
  }
}
