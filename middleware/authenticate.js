import { verify } from 'crypto'

function AuthMiddleware(req, res, next) {
  if (req.headers.authorization) {
    verify(req.headers.authorization.split(' ')[1], process.env.SECRET)
    req.headers.authorization.split(' ')[1]
  }
  next()
}
