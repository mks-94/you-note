const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

//Create a User
router.post("/", async (req, res) => {
  const { username, password } = req.body;
  if (password.length < 6) {
    res
      .status(500)
      .json({ msg: "Password is must be greater than 6 characters." });
    return;
  }

  let newUser = new User({
    username,
    passwordHashed: bcrypt.hashSync(password, 10),
    numNotes: 0,
  });

  newUser
    .save()
    .then((user) => {
      jwt.sign(
        {
          username: User.username,
        },
        "secret",
        (err, token) => {
          if (err) throw err;
          res.send({ token, user: { username: user.username } });
        }
      );
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        msg: `User ${err.keyValue["username"]} already exists. Try Logging In.`,
      });
    });
});

//Create Login
router
  .post("/login", (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username }).then((user) => {
      if (!user) {
        res.status(500).json({ msg: "No user with that username" + username });
        return;
      } else if (!bcrypt.compareSync(password, user.password)) {
        res.status(500).json({ msg: "Password is incorrect." });
      }

      jwt.sign(
        {
          username: User.username,
        },
        "secret",
        (err, token) => {
          if (err) throw err;
          res.send({ token, user: { username: user.username } });
        }
      );
    });
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send(err);
  });
