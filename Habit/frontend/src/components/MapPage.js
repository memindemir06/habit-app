import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
//import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  Input,
  MenuItem,
  FormControl,
  Select,
  Typography,
  Tooltip,
  IconButton,
  Avatar,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import FilterListIcon from "@material-ui/icons/FilterList";
import LoadingPage from "./LoadingPage";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    marginLeft: theme.spacing(7),
    [theme.breakpoints.down("xs")]: {
      margin: 0,
    },
  },
  headerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "1em 0",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  },
  mapStyles: {
    height: "50%",
    width: "50%",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  mapContainer: {
    position: "relative",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const MapPage = ({ userId, userName }) => {
  const [selected, setSelected] = useState(null);
  const [location, setLocation] = useState(null);
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [privacy, setPrivacy] = useState("");
  const [otherUserData, setOtherUserData] = useState(null);
  const [windowOpen, setWindowOpen] = useState(false);

  useEffect(() => {
    getUserLocation();
    getOtherLocations();
  }, []);

  const getUserLocation = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
      }),
    };
    fetch("../api/getUserLocation", requestOptions)
      .then((response) => {
        if (!response.ok) {
          console.log(response);
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (data) {
          setPrivacy(data.access_permission);
          setLocation(JSON.parse(data.location));
        } else {
          console.log("No Data");
        }
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOkClose = () => {
    setOpen(false);
    updatePermission();
  };

  const handleChange = (event) => {
    setPrivacy(event.target.value);
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        updateLocation(
          JSON.stringify({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        );
      });
    }
  };

  const updateLocation = (location) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        location: location,
      }),
    };
    fetch("../api/updateLocation", requestOptions)
      .then((response) => {
        if (!response.ok) {
          console.log(response);
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (data) {
          console.log(data);
        } else {
          console.log("No Data");
        }
      });
  };

  const updatePermission = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        access_permission: privacy,
      }),
    };
    fetch("../api/updatePermission", requestOptions)
      .then((response) => {
        if (!response.ok) {
          console.log(response);
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (data) {
          console.log(data);
        } else {
          console.log("No Data");
        }
      });
  };

  const getOtherLocations = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        filter: "No Filter",
      }),
    };
    fetch("../api/getLocations", requestOptions)
      .then((response) => {
        if (!response.ok) {
          console.log(response);
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (data) {
          setOtherUserData(data.data);
          console.log(data);
        } else {
          console.log("No Data");
        }
      });
  };

  const mapStyles = {
    height: "70%",
    width: "70%",
  };

  const handleWindowChange = (user) => {
    setSelected(user);
    setWindowOpen(!windowOpen);
  };

  return (
    <div className={classes.root}>
      <div className={classes.headerContainer}>
        <div>
          <Button onClick={handleClickOpen} color="primary">
            Set Privacy
          </Button>
          <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            open={open}
            onClose={handleClose}
          >
            <DialogTitle>Select one of the privacy options.</DialogTitle>
            <DialogContent>
              <Typography variant="subtitle1">
                Private: Your location will not be visible to other users.
              </Typography>
              <Typography variant="subtitle1">
                Friends: Your location will be visible only to your friends.
              </Typography>
              <Typography variant="subtitle1">
                Public: Your location will be visible to other users.
              </Typography>
              <form className={classes.container}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-dialog-select-label">Privacy</InputLabel>
                  <Select
                    labelId="demo-dialog-select-label"
                    id="demo-dialog-select"
                    value={privacy}
                    onChange={handleChange}
                    input={<Input />}
                  >
                    <MenuItem value={"private"}>Private</MenuItem>
                    <MenuItem value={"friends"}>Friends</MenuItem>
                    <MenuItem value={"public"}>Public</MenuItem>
                  </Select>
                </FormControl>
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleOkClose} color="primary">
                Ok
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={getLocation}
        >
          Get Your Location
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="small"
          endIcon={<FilterListIcon />}
        >
          Filter
        </Button>
      </div>
      <LoadScript googleMapsApiKey="AIzaSyATAEeS2YuhKhzbSUNV2M2XH1H1YFztfZo">
        <GoogleMap
          zoom={7}
          mapContainerStyle={{
            width: "70vw",
            height: "70vh",
          }}
          center={!location ? { lat: 53.46685, lng: -2.233884 } : location}
        >
          {!location ? null : <Marker position={location} label={userName} />}
          {!otherUserData
            ? null
            : otherUserData.map((user) => {
                return (
                  <Marker
                    key={user.user_id.user_name}
                    position={JSON.parse(user.location)}
                    onClick={() => handleWindowChange(user)}
                    options={{
                      icon: {
                        url: user.profile_img,
                        scaledSize: { width: 32, height: 32 },
                      },
                      shape: {
                        coords: [null, null, 16],
                        type: "circle",
                      },
                    }}
                    label={user.user_id.user_name}
                  />
                );
              })}
          {windowOpen && selected ? (
            <InfoWindow
              position={JSON.parse(selected.location)}
              onCloseClick={() => handleWindowChange(null)}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <Tooltip title="View profile">
                  <IconButton
                    onClick={() =>
                      history.push(`/profile/${selected.user_id.user_name}`)
                    }
                  >
                    <Avatar src={selected.profile_img} />
                  </IconButton>
                </Tooltip>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <Typography variant="h6">
                    {selected.user_id.user_name}
                  </Typography>
                  <Typography
                    variant="body1"
                    component={Link}
                    to={`/profile/${selected.user_id.user_name}`}
                  >
                    Go to profile
                  </Typography>
                </div>
              </div>
            </InfoWindow>
          ) : null}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapPage;
