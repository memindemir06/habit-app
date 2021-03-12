import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import { Typography, TextField, IconButton } from "@material-ui/core";
import EditIcon from '@material-ui/icons/EditRounded';
import SaveIcon from '@material-ui/icons/SaveRounded';

function Profile({ leaveAccountCallback }) {
    const params = useParams();
    const history = useHistory();

    const [userId, setUserId] = useState();
    const [userName, setUserName] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [email, setEmail] = useState(null);
    const [description, setDescription] = useState(null);
    const [facebook, setFacebook] = useState(null);
    const [instagram, setInstagram] = useState(null);
    const [twitter, setTwitter] = useState(null);
    const [usernameEditClicked, setUsernameEditClicked] = useState(true);
    const [nameEditClicked, setNameEditClicked] = useState(true);
    const [emailEditClicked, setEmailEditClicked] = useState(true);
    const [descriptionEditClicked, setDescriptionEditClicked] = useState(true);
    const [facebookEditClicked, setFacebookEditClicked] = useState(true);
    const [instagramEditClicked, setInstagramEditClicked] = useState(true);
    const [twitterEditClicked, setTwitterEditClicked] = useState(true);


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
                    setUserName(data.user_name);
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
        !email
        // !description ||
        // !facebook ||
        // !instagram ||
        // !twitter
    ) {
        return <LoadingPage />;
    }

    const profileStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    }


    const handleUsernameEditClicked = () => {
        setUsernameEditClicked(!usernameEditClicked);
    }
    const handleNameEditClicked = () => {
        setNameEditClicked(!nameEditClicked);
    }
    const handleEmailEditClicked = () => {
        setEmailEditClicked(!emailEditClicked);
    }
    const handleDescriptionEditClicked = () => {
        setDescriptionEditClicked(!descriptionEditClicked);
    }
    const handleFacebookEditClicked = () => {
        setFacebookEditClicked(!facebookEditClicked);
    }
    const handleInstagramEditClicked = () => {
        setInstagramEditClicked(!instagramEditClicked);
    }
    const handleTwitterEditClicked = () => {
        setTwitterEditClicked(!twitterEditClicked);
    }
           return (
            <div>
                <Typography variant="h3" align="left">
                    {userName}
                </Typography>
                <br />
                <form noValidate autoComplete="off">
                    <div style={profileStyle}>
                        <TextField disabled={usernameEditClicked} label="Username" defaultValue={userName} />
                            <IconButton onClick={handleUsernameEditClicked}>
                               {usernameEditClicked ? <EditIcon /> : <SaveIcon />}
                            </IconButton>
                        <br />
                        <TextField disabled={nameEditClicked} label="Name" defaultValue={firstName + " " + lastName} />
                            <IconButton onClick={handleNameEditClicked}>
                               {nameEditClicked ? <EditIcon /> : <SaveIcon />}
                            </IconButton>
                        <br />
                        <TextField disabled={emailEditClicked} label="Email" defaultValue={email} />
                            <IconButton onClick={handleEmailEditClicked}>
                               {emailEditClicked ? <EditIcon /> : <SaveIcon />}
                            </IconButton>
                        <br />
                        <TextField disabled={descriptionEditClicked} label="Description" defaultValue={description} />
                            <IconButton onClick={handleDescriptionEditClicked}>
                               {descriptionEditClicked ? <EditIcon /> : <SaveIcon /> }
                            </IconButton>
                        <br />
                        <TextField disabled={facebookEditClicked} label="Facebook" defaultValue={facebook} />
                            <IconButton onClick={handleFacebookEditClicked}>
                               {facebookEditClicked ? <EditIcon /> : <SaveIcon /> }
                            </IconButton>
                        <br />
                        <TextField disabled={instagramEditClicked} label="Instagram" defaultValue={instagram} />                        
                            <IconButton onClick={handleInstagramEditClicked}>
                               {instagramEditClicked ? <EditIcon /> : <SaveIcon /> }
                            </IconButton>
                        <br />
                        <TextField disabled={twitterEditClicked} label="Twitter" defaultValue={twitter} />
                            <IconButton onClick={handleTwitterEditClicked}>
                               {twitterEditClicked ? <EditIcon /> : <SaveIcon /> }
                            </IconButton>
                    </div>
                </form>
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