import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import LoadingPage from "./LoadingPage";

function Profile({ leaveAccountCallback }) {
  const params = useParams();
  const history = useHistory();

  const [userId, setUserId] = useState();
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [email, setEmail] = useState(null);
  const [description, setDescription] = useState(null);
  const [facebook, setFacebook] = useState(null);
  const [instagram, setInstagram] = useState(null);
  const [twitter, setTwitter] = useState(null);

  useEffect(() => {
    fetch("../api/userIdValid" + "?user_id=" + params.userId)
      .then((response) => {
        if (!response.ok) {
          // console.log("No response");
          leaveAccountCallback();
          history.push("/ErrorPage");
        } else {
          // console.log("Response");
          return response.json();
        }
      })
      .then((data) => {
        if (!data) {
          setUserId(null);
        } else {
          setFirstName(data.first_name);
          setLastName(data.last_name);
          setUserId(data.user_id);
          setEmail(data.email);
          getUserOptionals(data.user_id);
        }
      });
  }, []);

  const getUserOptionals = (user_id) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user_id,
      }),
    };
    fetch("../api/getUserOptionals", requestOptions)
      .then((response) => {
        if (!response.ok) {
          console.log("No User ID: ", response);
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (data) {
          console.log(data);
          setDescription(data.description);
          setFacebook(data.facebook);
          setInstagram(data.instagram);
          setTwitter(data.twitter);
        } else {
          console.log("No Data");
        }
      });
  };

  if (
    !firstName ||
    !lastName ||
    !email ||
    !description ||
    !facebook ||
    !instagram ||
    !twitter
  ) {
    return <LoadingPage />;
  }

  return (
    <div>
      <h1>Profile Page</h1>
      <p>{firstName + " " + lastName}</p>
      <p>{email}</p>
      <p>{description}</p>
      <p>{facebook}</p>
      <p>{instagram}</p>
      <p>{twitter}</p>
    </div>
  );

  // return (
  //   <div>
  //     <h1>Profile Page</h1>
  //     <p>{firstName ? firstName : "Loading..."}</p>
  //     <p>{lastName ? lastName : "Loading..."}</p>
  //     <p>{email ? email : "Loading..."}</p>
  //     <p>{description ? description : "Loading..."}</p>
  //     <p>{facebook ? facebook : "Loading..."}</p>
  //     <p>{instagram ? instagram : "Loading..."}</p>
  //     <p>{twitter ? twitter : "Loading..."}</p>
  //   </div>
  // );
}

export default Profile;
