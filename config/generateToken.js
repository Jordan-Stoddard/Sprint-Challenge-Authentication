require('dotenv').config()

const jwt = require('jsonwebtoken')

module.exports = {
    generateToken,
};

function generateToken(user) {
    const payload = {
      user
    }
    const secret = process.env.JWT_SECRET;
    const options = {
      expiresIn: '1h'
    }
  return jwt.sign(payload, secret, options)
  }