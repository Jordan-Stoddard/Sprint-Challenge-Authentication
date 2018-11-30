require('dotenv').config()

const jwt = require('jsonwebtoken')

module.exports = {
    generateToken,
};

function generateToken(user) {
    const payload = {
      user
    }
    const jwtKey = 'Why can’t banks keep secrets? There are too many tellers!'
    const options = {
      expiresIn: '1h'
    }
  return jwt.sign(payload, jwtKey, options)
  }