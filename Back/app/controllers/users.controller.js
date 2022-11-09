const _User = require("../models/User.model.js"); //class
const config = require("../config/auth.config.js");

const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

exports.createNewUser = (req, res) => {
  // return res.status(200).send("signup page.");

  const { name, email, phone, password } = req.body;

  // Create new _User with bcrypt
  const user = new _User({
    name,
    email,
    phone,
    password: bcrypt.hashSync(password, 8),
    role: "user",
  });

  // Save the new _User in the database
  user
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      return res.status(500).send({
        message:
          err.message || "Some error occurred while creating the product.",
      });
    });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  !email &&
    !password &&
    res.status(405).send({ message: "Email and password are required." });
  !email && res.status(405).send({ message: "Email is empty." });
  !password && res.status(406).send({ message: "Password is empty." });

  _User
    .findOne({ email })
    .then((user) => {
      // console.log(user);
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      // checking password - boolean
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      console.log(`passwordIsValid: ${passwordIsValid}`);

      //   if password is false - error 401
      if (!passwordIsValid) {
        return res.status(401).send({ message: "Invalid Password!" });
      }

      //   if password is true - create a token
      const token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });
      console.log(token);

      return res.status(200).send({
        message: "user found with email " + req.body.email + " token: " + token,
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        accessToken: token,
      });
    })
    .catch((err) => {
      return res.status(500).send({ message: err.message });
    });
};

exports.tokencheck = (req, res) => {
  // console.log("req userId", req.userId);
  _User
    .findOne({ _id: req.userId })
    .then((user) => {
      // console.log(user);
      if (!user) {
        return res.status(404).send({ message: "server -Token Not found." });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      return res.status(500).send({ message: "error!" });
    });
};
