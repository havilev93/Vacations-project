import React, { useContext, useEffect, useState } from "react";

// components
import VacationCard from "./VacationCard.jsx";

//Services
import vacationsSer from "../services/vacations.service.js";

// bootstrap
import Row from "react-bootstrap/Row";

//Context
import { UserContext } from "./UserContext";


const AllVacations = () => {
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
      {vacations.length > 0 && <h1>Vacations</h1>}
      <Row xs={1} sm={2} md={4} className="g-4 vComponent">
        {vacations.length > 0 &&
          vacations.map((vacation) => (
            <VacationCard key={vacation.id} vacationDetails={vacation} />
          ))}
      </Row>
    </>
  );
};

export default AllVacations;
