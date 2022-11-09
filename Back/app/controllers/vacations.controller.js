const _Vacation = require("../models/Vacation.model"); //class
const config = require("../config/auth.config.js");

exports.createNewVacation = (req, res) => {
  //   return res.status(200).send("create vacation succeeded.");
  const socket = req.app.get("socket");
  console.log(socket);
  const { destination, description, image, startDate, endDate, price } =
    req.body;

  if (
    !destination &&
    !description &&
    !image &&
    !startDate &&
    !endDate &&
    !price
  ) {
    return res.status(400).send({
      message: "Vacation's details can not be empty",
    });
  }
  if (destination === "") {
    return res.status(400).send({
      message: "Destination can not be empty",
    });
  }
  if (description === "") {
    return res.status(400).send({
      message: "Description can not be empty",
    });
  }
  if (image === "") {
    return res.status(400).send({
      message: "Image can not be empty",
    });
  }
  if (startDate === "") {
    return res.status(400).send({
      message: "Start Date can not be empty",
    });
  }
  if (endDate === "") {
    return res.status(400).send({
      message: "End Date can not be empty",
    });
  }
  if (price === "") {
    return res.status(400).send({
      message: "Price can not be empty",
    });
  }

  // check if there is vacation in this destination already - if false > create, if false > not
  _Vacation
    .findOne({ destination })
    .then((result) => {
      if (!result) {
        const vacation = new _Vacation({
          destination,
          description,
          image,
          startDate,
          endDate,
          price,
          followersList: [],
        });
        // console.log("vacation", vacation);
        // Save the new _Vacation in the database
        vacation
          .save()
          .then((data) => {
            // console.log("new vacation socket");
            socket.emit("updateVacations");
            res.send(data);
          })
          .catch((err) => {
            console.log(err);
            return res.status(501).send({
              message:
                err.message ||
                "Some error occurred while creating the product.",
            });
          });
      } else {
        return res.status(404).send({
          message: "There is already vacation in " + destination,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving vacation in" + destination,
      });
    });
};

exports.findAllVacations = (req, res) => {
  _Vacation
    .find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving vacations.",
      });
    });
};

exports.findOneById = (req, res) => {
  const { _id } = req.params;
  _Vacation
    .findOne({ _id })
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "vacation not found with id " + _id,
        });
      }
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving vacations.",
      });
    });
};

exports.findOneByDestination = (req, res) => {
  const { destination } = req.params;
  _Vacation
    .findOne({ destination })
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "vacation not found with destination " + destination,
        });
      }
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving vacation in" + destination,
      });
    });
};

exports.delete = (req, res) => {
  const socket = req.app.get("socket");
  const { _id } = req.params;
  _Vacation
    .findByIdAndRemove({ _id })
    .then((vacation) => {
      if (!vacation) {
        return res.status(404).send({
          message: "Vacation hasn't found with id " + _id,
        });
      }
      // console.log(" vacation deleted socket");
      socket.emit("updateVacations");
      res.send({ message: "Vacation has deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Vacation hasn't found with id " + _id,
        });
      }
      return res.status(500).send({
        message: "Could not delete vacation with id " + _id,
      });
    });
};

exports.updateAll = (req, res) => {
  const {
    destination,
    description,
    image,
    startDate,
    endDate,
    price,
    _id,
    followersList,
  } = req.body;
  // Find vacation and update it with the request body
  _Vacation
    .findByIdAndUpdate(
      _id,
      {
        destination,
        description,
        image,
        startDate,
        endDate,
        price,
        followersList,
      },
      { new: true }
    )
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "vacation not found with id " + _id,
        });
      }
      // console.log(result);
      res.send(result);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "vacation not found with id " + _id,
        });
      }
      return res.status(500).send({
        message: "Error updating vacation with id " + _id,
      });
    });
};

// v3 - update removed or added followed vacation
exports.updateFollowersList = (req, res) => {
  const { likeStatus, _id, newFollower, followersList } = req.body;
  console.log(likeStatus, _id, newFollower, followersList);

  if (!likeStatus) {
    _Vacation
      .findOne({ _id })
      .then((result) => {
        // console.log(result);
        // console.log(result.followersList.includes(newFollower));
        if (result.followersList.includes(newFollower)) {
          return res.status(404).send({
            message:
              "vacation " + _id + " is already followed by " + newFollower,
          });
        } else {
          _Vacation
            .findByIdAndUpdate(
              _id,
              {
                followersList: [...followersList, newFollower],
              },
              { new: true }
            )
            .then((vacation) => {
              if (!vacation) {
                return res.status(404).send({
                  message: "vacation not found with id " + _id,
                });
              }
              // console.log("after like update " + vacation);
              res.send(vacation);
            })
            .catch((err) => {
              return res.status(500).send({
                message: "Error updating vacation with id " + _id,
              });
            });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving vacations.",
        });
      });
  } else {
    // console.log("before " + followersList);
    const index = followersList.indexOf(newFollower);
    if (index > -1) {
      followersList.splice(index, 1);
    }
    // console.log("after " + followersList);

    _Vacation
      .findByIdAndUpdate(
        _id,
        {
          followersList: followersList,
        },
        { new: true }
      )
      .then((vacation) => {
        if (!vacation) {
          return res.status(404).send({
            message: "vacation not found with id " + _id,
          });
        }
        console.log("after unlike update " + vacation);
        res.send(vacation);
      })
      .catch((err) => {
        return res.status(500).send({
          message: "Error updating vacation with id " + _id,
        });
      });
  }
};

exports.updateAnyParam = (req, res) => {
  const socket = req.app.get("socket");
  const { _id, field, value } = req.body;
  console.log(_id, field, value);

  // if value - null, then - error
  if (!value) {
    return res.status(400).send({
      message: field + " field can't be empty",
    });
  }

  // if the key is destination - check that this destination isnt been already, because in the vacations view there is request by destination
  field == "destination"
    ? _Vacation
        .findOne({ destination: value })
        .then((result) => {
          if (!result) {
            _Vacation
              .findByIdAndUpdate(
                _id,
                {
                  [field]: value,
                },
                { new: true }
              )
              .then((vacation) => {
                // console.log("update des");
                socket.emit("updateVacations");
                return res.send(vacation);
              })
              .catch((err) => {
                return res.status(500).send({
                  message: "Error updating vacation with id " + _id,
                });
              });
          } else {
            return res.status(400).send({
              message: "There is already vacation in " + value,
            });
          }
        })
        .catch((err) => {
          return res.status(404).send({
            message: "Server error ",
          });
        })
    : _Vacation
        .findByIdAndUpdate(
          _id,
          {
            [field]: value,
          },
          { new: true }
        )
        .then((vacation) => {
          if (!vacation) {
            return res.status(404).send({
              message: "Vacation hasn't founded with id " + _id,
            });
          }
          // console.log("update no des");
          socket.emit("updateVacations");
          return res.send(vacation);
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).send({
            message: "Error updating vacation with id " + _id,
          });
        });
};

exports.findUserFolloweVacations = (req, res) => {
  const { userId } = req.params;
  // console.log(userId);
  const userFolloweVacations = [];

  _Vacation
    .find()
    .then((result) => {
      // console.log(result);
      for (let i = 0; i < result.length; i++) {
        // console.log(userId, i, result[i]);
        result[i].followersList.includes(userId) &&
          userFolloweVacations.push(result[i]);
      }
      res.send(userFolloweVacations);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving followed vacations.",
      });
    });
};
