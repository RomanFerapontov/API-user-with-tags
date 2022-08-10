import bcrypt from 'bcrypt'

export async function hashPassword(password) {
  return await bcrypt.hash(password, 4).then((hash) => {
    return hash
  })
}

export async function compareHashes(passwordForCheck, comparedHash) {
  return await bcrypt.compare(passwordForCheck, comparedHash).then((result) => {
    return result
  })
}
