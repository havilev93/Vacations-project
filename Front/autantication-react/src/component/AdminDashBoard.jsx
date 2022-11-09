import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

// components
import AdminNav from "./AdminNav.jsx";
import Footer from "./Footer.jsx";

//Services
import vacationsSer from "../services/vacations.service.js";

//Context
import { AdminContext } from "./AdminContext";

// bootstrap
import Container from "react-bootstrap/Container";

const AdminDashBoard = () => {
  const [vacations, setVacations] = useState([]);

  const getAllVacations = () => {
    vacationsSer
      .getAllVacations()
      .then((res) => {
        // console.log("res", res.data);
        setVacations(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllVacations();
  }, []);

  return (
    <>
      <AdminNav />
      <Container style={{ minHeight: "85vh" }}>
        <AdminContext.Provider
          value={{
            getAllVacations,
            vacations,
            setVacations,
          }}
        >
          <Outlet />
        </AdminContext.Provider>
      </Container>
      <Footer />
    </>
  );
};

export default AdminDashBoard;
