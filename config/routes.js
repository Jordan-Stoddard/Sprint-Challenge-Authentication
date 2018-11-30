
const axios = require('axios');
const bcrypt = require('bcryptjs')
const db = require('../database/dbConfig')


const { authenticate } = require('./middlewares');
const { generateToken } = require('./generateToken.js')


module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  // implement user registration
  const creds = req.body
  const hash = bcrypt.hashSync(creds.password, 14)
  creds.password = hash

  db('users')
  .insert(creds)
  .then(ids => {
    res.status(200).json({message: `Success! New user added with id of ${ids}`})
    console.log('Success')
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
      res.status(200).json({message: `Welcome ${user.username}`, token})
    }
  })
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
