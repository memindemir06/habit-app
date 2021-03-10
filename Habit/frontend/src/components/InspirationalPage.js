import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

const InspirationalPage = ({ leaveAccountCallback }) => {
  let params = useParams();
  let history = useHistory();
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    fetch("../api/userIdValid" + "?user_id=" + params.userId)
      .then((response) => {
        if (!response.ok) {
          leaveAccountCallback();
          history.push("/ErrorPage");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (!data) {
          setUserId(null);
        } else {
          setUsername(data.user_name);
        }
      });
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

  return (
    <div>
      <h1>Inspirational Page</h1>
      <h3>Welcome {username}</h3>
    </div>
  );
};

export default InspirationalPage;
