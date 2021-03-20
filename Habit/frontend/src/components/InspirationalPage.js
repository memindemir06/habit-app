import React, { useState, useEffect } from "react";
import LoadingPage from "./LoadingPage";

const InspirationalPage = ({ leaveAccountCallback, userId, userName }) => {
  useEffect(() => {
    if (userId) {
      fetchAPI();
    }
  }, []);

  let requestOptions = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "SIGN-UP-FOR-KEY",
      "x-rapidapi-host": "healthruwords.p.rapidapi.com",
    },
  };

  let fetchAPI = () => {
    fetch(
      "https://healthruwords.p.rapidapi.com/v1/quotes/?id=731&t=Wisdom&maxR=1&size=medium",
      requestOptions
    )
      .then((response) => {
        if (!response.ok) {
          console.log("Bad Request!");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (data) {
          console.log(data);
        } else {
          console.log("No Data!");
        }
      });
  };

  if (!userId || !userName) {
    return <LoadingPage />;
  } else {
    return (
      <div>
        <h1>Inspirational Page</h1>
        <h3>Welcome {"u/" + userName}</h3>
      </div>
    );
  }
};

export default InspirationalPage;
