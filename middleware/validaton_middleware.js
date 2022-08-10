import { validationResult } from 'express-validator'
import { v4 as uuidv4 } from 'uuid'
import filterArray from './helpers/array-with-objects-filter.js'
import { hashPassword, compareHashes } from '../services/hash_password_service.js'
import db from '../services/db_query_service.js'
import { verifyJWT } from '../services/auth_service.js'

export class ApiMiddleware {
  async authenticate(req, res, next) {
    try {
      const { email, password } = req.body

      const user = await db.findByValue(['email', 'password'], 'user', 'email', email)
      if (!user) {
        throw new Error(`User not sign.`)
      }

      const correctPassword = await compareHashes(password, user[0].password)
      if (!correctPassword) {
        throw new Error('Incorrect password')
      }
      next()
    } catch ({ message }) {
      res.status(400).json({ message: 'Authenticate error', error: message })
    }
  }

  async registrate(req, res, next) {
    try {
      const { password, email, nickname } = req.body

      const userMail = await db.findAll(['email', 'nickname'], 'user')
      if (userMail.find((el) => el.email === email)) {
        throw new Error(`User with email ${email} already exists.`)
      }

      if (userMail.find((el) => el.nickname === nickname)) {
        throw new Error(`User with nickname ${nickname} already exists.`)
      }

      req.body = {
        uid: uuidv4(),
        email: email,
        password: await hashPassword(password),
        nickname: nickname,
      }

      next()
    } catch ({ message }) {
      res.status(400).json({ message: message })
    }
  }

  async validate(req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const allErrors = filterArray(errors.array(), 'msg')
      return res.status(400).json({ message: 'Registration error', errors: allErrors })
    }
    next()
  }

  async authorize(req, res, next) {
    try {
      if (!req.headers.authorization) {
        throw new Error('Missing authorization header.')
      }

      const payload = verifyJWT(req.headers.authorization.split(' ')[1], process.env.SECRET)
      const user = await db.findByValue(['*'], 'user', 'email', payload.email)
      req.user = user[0]
      next()
    } catch ({ message }) {
      res.status(400).json({ error: message })
    }
  }

  async checkFieldsBeforeUpdate(req, res, next) {
    try {
      const fields = Object.keys(req.body)

      if (fields.length == 0) {
        throw new Error("Missing fields 'nickname', 'password' and 'email'")
      }

      const correctFields = ['nickname', 'password', 'email']
      fields.forEach((key) => {
        if (!correctFields.includes(key)) {
          throw new Error(`Incorrect fields passed. You can update only 'nickname', 'password' and 'email'`)
        }
      })

      const userNickname = await db.findByValue(['*'], 'user', 'nickname', req.body.nickname)
      const userEmail = await db.findByValue(['*'], 'user', 'nickname', req.body.email)

      if (userNickname[0]) {
        throw new Error(`User with name ${req.body.nickname} is already exists`)
      }
      if (userEmail[0]) {
        throw new Error(`User with email ${req.body.email} is already exists`)
      }
      if (req.body.password) {
        req.body.password = await hashPassword(req.body.password)
      }

      next()
    } catch ({ message }) {
      res.status(400).json({ error: message })
    }
  }
}
