var express = require("express");
var router = express.Router();
const controller = require("../controllers/vacations.controller");

// add new
// http://localhost:5000/vacations/add
router.post("/add", controller.createNewVacation);

// get all vacations
// http://localhost:5000/vacations
router.get("/", controller.findAllVacations);

// get single vacation by id
// http://localhost:5000/vacations/11111
router.get("/:_id", controller.findOneById);

// get single vacation by destination
// http://localhost:5000/vacations/destination/Herzliya
router.get("/destination/:destination", controller.findOneByDestination);

// delete vacation by vacation id
// http://localhost:5000/vacations/_id
router.delete("/:_id", controller.delete);

// update all vacation's parmeters by id
// http://localhost:5000/vacations/_id
router.put("/:_id", controller.updateAll);

// update (add & remove) followersList parmeter by vacation id - return the update vacation
// http://localhost:5000/vacations/
router.patch("/", controller.updateFollowersList);

// update any parmeter by the request details
// http://localhost:5000/vacations/updateAnyParam
router.patch("/updateAnyParam", controller.updateAnyParam);

// get all user's followed vacations
// http://localhost:5000/vacations/user/11111
router.get("/user/:userId", controller.findUserFolloweVacations);

module.exports = router;
