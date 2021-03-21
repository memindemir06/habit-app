import React, { useState, useEffect } from "react";
import ProfileSettings from "./ProfileSettings";

function Profile({
  userId,
  userName,
  firstName,
  lastName,
  email,
  setUserId,
  setUserName,
  setFirstName,
  setLastName,
  setEmail,
}) {
  const [description, setDescription] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [backgroundImg, setBackgroundImg] = useState("");

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (userId) {
      getUserOptionals(userId);
    }
  }, [userId]);

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
          setProfileImg(data.profile_img);
          setBackgroundImg(data.background_img);
        } else {
          console.log("No Data");
        }
        setLoaded(true);
      });
  };

  return (
    <div>
      <ProfileSettings
        userId={userId}
        userName={userName}
        firstName={firstName}
        lastName={lastName}
        email={email}
        description={description}
        facebook={facebook}
        instagram={instagram}
        twitter={twitter}
        profileImg={profileImg}
        backgroundImg={backgroundImg}
        loaded={loaded}
        setUserId={setUserId}
        setUserName={setUserName}
        setFirstName={setFirstName}
        setLastName={setLastName}
        setEmail={setEmail}
        setDescription={setDescription}
        setFacebook={setFacebook}
        setInstgram={setInstagram}
        setTwitter={setTwitter}
        setProfileImg={setProfileImg}
        setBackgroundImg={setBackgroundImg}
        setLoaded={setLoaded}
      />
    </div>
  );
}

export default Profile;
