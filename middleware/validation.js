import { validationResult } from 'express-validator'
import filterArray from './helpers/array-with-objects-filter.js'

export default function validate(req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const allErrors = filterArray(errors.array(), 'msg')
    return res.status(400).json({ message: 'Registration error', errors: allErrors })
  }
  next()
}
