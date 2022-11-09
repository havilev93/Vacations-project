import React, { useContext } from "react";

// components
import AllVacations from "./AllVacations.jsx";
import FollowedVacations from "./FollowedVacations.jsx";

//Context
import { UserContext } from "./UserContext";

const VacationsMain = () => {
  return (
    <>
      <FollowedVacations />
      <AllVacations />
    </>
  );
};

export default VacationsMain;
