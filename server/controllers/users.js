const User = require('../models/user');

const UsersController = {
  Create: (req, res) => {
    const user = new User(req.body.user);
    user.save()
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
  }
}

module.exports = UsersController
