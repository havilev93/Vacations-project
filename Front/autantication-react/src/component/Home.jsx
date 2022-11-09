import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

// components
import MyNav from "./MyNav.jsx";

//Services
import connectionSer from "../services/connect.service.js";
import vacationsSer from "../services/vacations.service.js";

// bootstrap
import Container from "react-bootstrap/Container";

//Context
import { UserContext } from "./UserContext";

// socket
import socketIOClient from "socket.io-client";
import Footer from "./Footer.jsx";

const Home = () => {
  // console.log("test");
  const [isToken, setIsToken] = useState([false]); //check if the verify created and if it send token
  const [token, setToken] = useState(); //save the value of token
  const [userId, setUserId] = useState();
  const [userDetails, setUserDetails] = useState();

  const [vacations, setVacations] = useState([]);
  const [followedVacationsOfUser, setFollowedVacationsOfUser] = useState([]);

  const saveToken = () => {
    connectionSer
      .tokencheck()
      .then((res) => {
        // console.log(res);
        // console.log(res.data);
        // console.log(res.data._id);
        setUserId(res.data._id);
        setUserDetails(res.data);
        setToken(localStorage.getItem("token"));
        setIsToken(true);
      })
      .catch((err) => console.log(err));
  };

  const getAllVacations = () => {
    vacationsSer
      .getAllVacations()
      .then((res) => {
        // console.log("res", res.data);
        setVacations(res.data);
      })
      .catch((err) => console.log(err));
  };

  const getFollowedVacationsOfUser = (userId) => {
    // console.log("test get follow");
    vacationsSer
      .getFollowedVacationsOfUser(userId)
      .then((res) => {
        // console.log("res", res);
        setFollowedVacationsOfUser(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    saveToken();
    getAllVacations();
  }, []);

  useEffect(() => {
    // console.log("userId", userId);
    getFollowedVacationsOfUser(userId);
  }, [userId]);

  // socket
  const ENDPOINT = "http://127.0.0.1:4001";

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    // console.log("socket", socket);

    // GET FROM SERVER
    socket.on("updateVacations", (data) => {
      getAllVacations();
      getFollowedVacationsOfUser(userId);
    });
    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    // console.log("socket", socket);

    // GET FROM SERVER
    socket.on("updateVacations", (data) => {
      getAllVacations();
      getFollowedVacationsOfUser(userId);
    });
    return () => socket.disconnect();
  }, [userId]);

  return (
    <div>
      {userDetails && <MyNav userDetails={userDetails} />}
      <Container>
        {isToken && token ? (
          <div>
            <UserContext.Provider
              value={{
                userId,
                getAllVacations,
                vacations,
                getFollowedVacationsOfUser,
                setFollowedVacationsOfUser,
                followedVacationsOfUser,
              }}
            >
              <Outlet />
            </UserContext.Provider>
          </div>
        ) : (
          <div>You need to sign in to see all the vacations</div>
        )}
      </Container>
      {userDetails && <Footer />}
    </div>
  );
};

export default Home;
