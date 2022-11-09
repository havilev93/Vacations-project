import React, { useContext, useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto"; //not delete altoguh its look like not needed

//Services
import vacationsSer from "../services/vacations.service.js";

//Context
import { AdminContext } from "./AdminContext";

const Reports = () => {
  const { getAllVacations, vacations, setVacations } = useContext(AdminContext);

  const [allFollowedVacations, setAllFollowedVacations] = useState([]);

  // setXSequence([...xSequence, id])
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);

  const state = {
    labels: labels,
    datasets: [
      {
        label: "Followers",
        backgroundColor: "rgba(6, 190, 191, 0.5)",
        borderWidth: 0,
        data: data,
      },
    ],
  };

  const makeLabels = () => {
    const vactionsNames = [];
    {
      allFollowedVacations.length > 0 &&
        allFollowedVacations.map((vacation) =>
          vactionsNames.push(vacation.destination)
        );
    }
    setLabels(vactionsNames);
  };

  const makeData = () => {
    const vactionCounter = [];
    {
      allFollowedVacations.length > 0 &&
        allFollowedVacations.map((vacation) =>
          vactionCounter.push(vacation.followersList.length)
        );
    }
    setData(vactionCounter);
  };

  useEffect(() => {
    getAllVacations();
    // console.log(vacations);
  }, []);

  useEffect(() => {
    setAllFollowedVacations(
      vacations.filter(function (vacation) {
        return vacation.followersList.length > 0;
      })
    );
    // console.log(allFollowedVacations);
  }, [vacations]);

  useEffect(() => {
    makeLabels();
    makeData();
  }, [allFollowedVacations]);

  return (
    <div>
      {allFollowedVacations.length > 0 && <h1>Reports</h1>}
      {allFollowedVacations.length > 0 ? (
        <h2>Vacations by Followers</h2>
      ) : (
        <p>There are not vacations in followed by users</p>
      )}
      <div>
        <Bar
          data={state}
          options={{
            title: {
              display: true,
              text: "Average Rainfall per month",
              fontSize: 20,
            },
            legend: {
              display: true,
              position: "right",
            },
          }}
        />
      </div>
    </div>
  );
};

export default Reports;
