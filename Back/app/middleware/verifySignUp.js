const User = require("../models/User.model.js");

checkDuplicateUsernameOrEmail = (req, res, next) => {
  const { name, email, phone, password } = req.body;

  //   Validate if all paremters in the request are existing and OK

  if (!name && !email && !phone && !password) {
    return res.status(400).send({
      message: "User content can not be empty",
    });
  }
  if (name === "") {
    return res.status(400).send({
      message: "Name can not be empty",
    });
  }
  if (email === "") {
    return res.status(400).send({
      message: "Email can not be empty",
    });
  }
  if (email) {
    // console.log(email);
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const valid = regex.test(email);
    if (!valid) {
      return res.status(400).send({ message: "Email isn't valid" });
    }
  }
  if (phone === "") {
    // console.log("28", phone);
    return res.status(400).send({
      message: "Phone can not be empty",
    });
  }
  if (phone) {
    // console.log("33", phone);
    const regex =
      /^(?:(?:(\+?972|\(\+?972\)|\+?\(972\))(?:\s|\.|-)?([1-9]\d?))|(0[23489]{1})|(0[57]{1}[0-9]))(?:\s|\.|-)?([^0\D]{1}\d{2}(?:\s|\.|-)?\d{4})$/gm;
    const valid = regex.test(phone);
    if (!valid) {
      return res.status(400).send({ message: "Phone isn't valid" });
    }
  }
  if (password === "") {
    return res.status(400).send({
      message: "Password can not be empty",
    });
  }
  if (password) {
    // console.log(password);
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    const valid = regex.test(password);
    if (!valid) {
      return res.status(400).send({ message: "Password isn't valid" });
    }
  }

  //  Validate if the parmters EMAIL & PHONE arn't at the database yet
  // email
  User.findOne({ email }).then((user) => {
    if (user) {
      return res.status(400).send({
        message: "Failed! Email is already in use!",
      });
    }

    // Phone
    User.findOne({ phone }).then((user) => {
      if (user) {
        return res.status(400).send({
          message: "Failed! Phone is already in use!",
        });
      }
      next();
    });
  });
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
};

module.exports = verifySignUp;
