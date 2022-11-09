import React, { useContext, useState, useEffect } from "react";

// components
import VacationCard from "./VacationCard.jsx";

// bootstrap
import Row from "react-bootstrap/Row";

//Context
import { UserContext } from "./UserContext";

const FollowedVacations = () => {
  const {
    userId,
    getAllVacations,
    vacations,
    getFollowedVacationsOfUser,
    setFollowedVacationsOfUser,
    followedVacationsOfUser,
  } = useContext(UserContext);

  return (
    <>
      {followedVacationsOfUser.length > 0 && <h1>My Followed Vacations</h1>}
      <Row xs={1} sm={2} md={4} className="g-4 vComponent">
        {followedVacationsOfUser.length > 0 &&
          followedVacationsOfUser.map((vacation) => (
            <VacationCard key={vacation.id} vacationDetails={vacation} />
          ))}
      </Row>
    </>
  );
};

export default FollowedVacations;
