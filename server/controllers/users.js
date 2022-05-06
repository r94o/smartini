const User = require('../models/user');

const UsersController = {
  Create: (req, res) => {
    const user = new User(req.body.user);
    user.save()
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      if (err.code === 11000) {
        console.log('duplicate')
      };
      if (err.name === 'ValidationError') {
        console.log('all fields required')
      };
      res.status(500).send(err);
    })
  }
}

module.exports = UsersController
