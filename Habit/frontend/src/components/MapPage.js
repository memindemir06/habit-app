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
} from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import LoadingPage from "./LoadingPage";
const dotenv = require("dotenv").config();

console.log(process.env.REACT_API_KEY);

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
    margin: theme.spacing.unit,
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

const MapPage = ({ userId }) => {
  const [selected, setSelected] = useState({});
  const [location, setLocation] = useState(null);
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [privacy, setPrivacy] = useState("");
  const [otherUserData, setOtherUserData] = useState(null);

  useEffect(() => {
    // console.log(
    //   process.env.REACT_APP_API_KEY ? "NO KEY" : process.env.REACT_APP_API_KEY
    // );
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
          setLocation(JSON.parse(data.location));
        } else {
          console.log("No Data");
        }
      });
  };

  const onSelect = (item) => {
    setSelected(item);
    console.log(selected);
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

  return (
    <div className={classes.root}>
      <div className={classes.headerContainer}>
        <div>
          <Button onClick={handleClickOpen}>Set Privacy</Button>
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
            width: "100vw",
            height: "100vh",
          }}
          center={!location ? { lat: 53.46685, lng: -2.233884 } : location}
        >
          {!location ? null : <Marker position={location} />}
          {!otherUserData
            ? null
            : otherUserData.map((user) => {
                return (
                  <Marker
                    key={user.user_id.username}
                    position={JSON.parse(user.location)}
                    onClick={() => onSelect(user)}
                  />
                );
              })}
          {selected.location && (
            <InfoWindow
              position={selected.location}
              clickable={true}
              onCloseClick={() => setSelected({})}
            >
              <p>A</p>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapPage;
