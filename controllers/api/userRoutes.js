const express = require("express");
const router = express.Router();
const { User, Blog, Comment } = require('../../models');
const bcrypt = require('bcrypt');
const e = require("express");

router.get("/", (req, res) => {
  User.findAll({ include: [Blog, Comment] })
    .then(dbUsers => {
      res.json(dbUsers);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  req.session.destroy();
  res.redirect('/');
})

router.get('/:id', (req, res) => {
  User.findByPk(req.params.id, { include: [Blog, Comment] })
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.status(500).json({"an error occurred", err});
    });
});

router.post('/login', (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(foundUser => {
    if (!foundUserUser) {
      res.status(400).json({ message: 'No user found with that username' });
      return;
    }
    if (!bcrypt.compareSync(req.body.password, foundUser.password)) {
      req.session.user = {
        id: foundUser.id,
        username: foundUser.username
      }
      return res.json(foundUser);
    }
    else {
      
      return res.status(400).json({ message: 'Incorrect password' });
    }
  })
      .catch(err => {
        console.log(err);
        res.status(500).json({ msg:"an error occurred", err});
      });
});

router.put('/:id', (req, res) => {
  User.update(req.body, { 
    where: {
      id: req.params.id
    },
    individualHooks: true 
    })
    .then(updatedUser => {
      res.json(updatedUser);
    })  
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occurred", err});
    });
});

router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(deletedUser => {
    res.json(deletedUser);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ msg: "an error occurred", err});
  });
});

module.exports = router;
