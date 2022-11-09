const authJwt = require("../middleware/authJwt.js");
const verifySignUp = require("../middleware/verifySignUp");
const controller = require("../controllers/users.controller");

module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // http://localhost:5000/req/signup
  app.post(
    "/req/signup",
    [verifySignUp.checkDuplicateUsernameOrEmail],
    controller.createNewUser
  );

  // http://localhost:5000/req/signin
  app.post("/req/signin", controller.signin);

  // http://localhost:5000/req/tokencheck
  app.post("/req/tokencheck", [authJwt.verifyToken], controller.tokencheck);
};
