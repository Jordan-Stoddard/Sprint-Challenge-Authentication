
const axios = require('axios');
const bcrypt = require('bcryptjs')
const db = require('../database/dbConfig')


const { authenticate } = require('./middlewares');
const { generateToken } = require('./generateToken.js')


module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
  server.get('/api/logout', logOut)
};

function register(req, res) {
  // implement user registration
  const creds = req.body
  const hash = bcrypt.hashSync(creds.password, 14)
  creds.password = hash

  db('users')
  .insert(creds)
  .then(ids => {
    const token = generateToken(creds.username)
    req.session.token = token
    res.status(200).json({message: `Success! New user added with id of ${ids}`, token})
   
  })
  .catch(err => res.status(500).json(`There was an error: ${err}`))

}

function login(req, res) {
  // implement user login
  creds = req.body
  db('users')
  .where({username: creds.username})
  .first()
  .then(user => {
    if (user && bcrypt.compareSync(creds.password, user.password)) {
      const token = generateToken(user)
      req.session.token = token
      res.status(200).json({message: `Welcome ${user.username}`, token})
    }
  })
  .catch(err => res.status(500).json({message: `Error: ${err}`}))
}

function getJokes(req, res) {
  axios
    .get(
      'https://safe-falls-22549.herokuapp.com/random_ten'
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}

function logOut(req, res) {
req.session = null
res.json({message: 'cookie destroyed.'})
}
