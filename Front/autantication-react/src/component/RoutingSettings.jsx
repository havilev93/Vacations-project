import React from "react";
import { Routes, Route, Link } from "react-router-dom";

// components
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Home from "./Home";
import VacationsMain from "./VacationsMain";
import VacationPage from "./VacationPage";
import AdminDashBoard from "./AdminDashBoard";
import AdminMain from "./AdminMain";
import ManageVacations from "./ManageVacations";
import Reports from "./Reports";

const RoutingSettings = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />}>
          <Route index element={<VacationsMain />} />
          <Route path=":destination" element={<VacationPage />} />
        </Route>
        <Route path="/admin" element={<AdminDashBoard />}>
          <Route path="" element={<AdminMain />} />
          <Route path="manage-vacations" element={<ManageVacations />} />
          <Route path="reports" element={<Reports />} />
        </Route>
      </Routes>
    </div>
  );
};

export default RoutingSettings;
