const axios = require("axios");
// const url = "https://registration-mongo-react.herokuapp.com/req";
const url = "http://localhost:5000/req";

const signUp = (name, email, phone, password) => {
  return axios.post(`${url}/signup`, {
    name,
    email,
    phone,
    password,
  });
};

const signIn = (email, password) => {
  return axios.post(`${url}/signin`, {
    email: email,
    password: password,
  });
};

const tokencheck = () => {
  const token = localStorage.getItem("token");
  return axios.post(`${url}/tokencheck`, null, {
    headers: { "x-access-token": token },
  });
};

export default {
  signUp,
  signIn,
  tokencheck,
};
