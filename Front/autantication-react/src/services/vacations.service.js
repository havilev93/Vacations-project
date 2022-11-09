const axios = require("axios");
// const url = "https://registration-mongo-react.herokuapp.com/vacations";
const url = "http://localhost:5000/vacations";

exports.getAllVacations = () => {
  return axios
    .get(url)
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      return error;
    });
};

exports.getSingleVacations = (destination) => {
  return axios
    .get(`${url}/destination/${destination}`)
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      return error;
    });
};

exports.getFollowedVacationsOfUser = (userId) => {
  return axios
    .get(`${url}/user/${userId}`)
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      return error;
    });
};

exports.addFollowToVacation = (
  likeStatus,
  vacationId,
  userId,
  vacationFollowersList
) => {
  return axios
    .patch(url, {
      likeStatus,
      _id: vacationId,
      newFollower: userId,
      followersList: vacationFollowersList,
    })
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      return error;
    });
};

//Admin DashBoard
exports.updataAnyParamOfVacation = (_id, field, value) => {
  return axios.patch(`${url}/updateAnyParam`, {
    _id,
    field,
    value,
  });
};

exports.deleteVacation = (_id) => {
  return axios
    .delete(`${url}/${_id}`)
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      return error;
    });
};

exports.addNewVacation = (
  destination,
  description,
  image,
  startDate,
  endDate,
  price
) => {
  return axios.post(`${url}/add`, {
    destination: destination,
    description: description,
    image: image,
    startDate: startDate,
    endDate: endDate,
    price: price,
  });
};
