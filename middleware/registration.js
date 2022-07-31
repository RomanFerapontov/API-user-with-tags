import db from '../db/index.js'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'

export default async function register(req, res, next) {
  try {
    const { password, email, nickname } = req.body
    const passwordHash = await bcrypt.hash(password, 3).then((hash) => {
      return hash
    })

    const userMail = await db.query('SELECT $1 FROM "user"', email)

    if (userMail.rows.find((el) => el.email === email)) {
      throw new Error(`User with email ${email} already exists.`)
    }

    req.body = {
      uid: uuidv4(),
      email: email,
      password: passwordHash,
      nickname: nickname,
    }
    next()
  } catch ({ message }) {
    res.status(400).json({ message: message })
  }
}
