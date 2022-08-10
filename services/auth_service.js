import jwt from 'jsonwebtoken'

export function signJWT(email, uid, secret) {
  return jwt.sign({ email: email, uid: uid, iat: Math.floor(Date.now() / 1000) }, secret, {
    /**expiresIn: 30 * 60,*/
  })
}

export function verifyJWT(token, secret) {
  return jwt.verify(token, secret)
}

export function decodeJWT(token, secret) {
  return jwt.decode(token, secret)
}
