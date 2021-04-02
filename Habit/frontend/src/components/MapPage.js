import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
//import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
  Circle,
} from "@react-google-maps/api";
import {
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  Input,
  MenuItem,
  FormControl,
  Grid,
  Select,
  Typography,
  Tooltip,
  IconButton,
  Avatar,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import FilterListIcon from "@material-ui/icons/FilterList";
import LoadingPage from "./LoadingPage";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import FingerprintIcon from "@material-ui/icons/Fingerprint";
import GpsFixedIcon from "@material-ui/icons/GpsFixed";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: theme.spacing(7),
    [theme.breakpoints.down("xs")]: {
      margin: 0,
    },
  },
  headerContainer: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "1em 0",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      justifyContent: "center",
    },
  },
  headerButtons: {
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  mapStyles: {
    height: "50%",
    width: "50%",
  },
  container: {
    marginLeft: "30%",
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  dialogTitleStyle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mapContainer: {
    position: "relative",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  filterNoFilter: {
    background: theme.palette.primary.main,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const MapPage = ({ userId, userName }) => {
  const [selected, setSelected] = useState(null);
  const [location, setLocation] = useState(null);
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [privacy, setPrivacy] = useState("");
  const [otherUserData, setOtherUserData] = useState(null);
  const [windowOpen, setWindowOpen] = useState(false);
  const [filterHabitOpen, setFilterHabitOpen] = useState(false);
  const [listOfFilters, setListOfFilters] = useState(["No Filter", "Friends"]);
  const [filter, setFilter] = useState();
  const options = {
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 32,
    zIndex: 1,
  };

  useEffect(() => {
    getAllHabits();
    getUserLocation();
    getOtherLocations("No Filter");
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

  const handleFilterHabitOpen = () => {
    setFilterHabitOpen(!filterHabitOpen);
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

  const getOtherLocations = (filterChoice) => {
    setFilterHabitOpen(false);
    setFilterOpen(false);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        filter: filterChoice,
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

  const getAllHabits = () => {
    fetch("../api/getAllHabits")
      .then((response) => {
        if (!response.ok) {
          console.log(response);
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (data) {
          for (let habit in data.list_of_all_habits) {
            listOfFilters.push(data.list_of_all_habits[habit].habit_name);
          }
          console.log(listOfFilters);
        } else {
          console.log("No Data");
        }
      });
  };

  const mapStyles = {
    width: "75vw",
    height: "75vh",
    [theme.breakpoints.down("xs")]: {
      width: "100px",
      height: "100vh",
    },
  };

  const handleWindowChange = (user) => {
    setSelected(user);
    setWindowOpen(!windowOpen);
  };

  const handleFilterDialogClose = () => {
    setFilterHabitOpen(false);
    setFilterOpen(false);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} align="center">
          <div className={classes.headerContainer}>
            <div>
              <Button
                onClick={handleClickOpen}
                color="primary"
                startIcon={<FingerprintIcon />}
                className={classes.headerButtons}
              >
                Set Privacy
              </Button>

              <Dialog onClose={handleFilterDialogClose} open={filterOpen}>
                <MuiDialogTitle>
                  <div
                    style={{
                      height: "100px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography style={{ alignSelf: "flex-end" }} variant="h6">
                      Filter the users shown on the map:
                    </Typography>
                    {filterOpen ? (
                      <IconButton
                        style={{ alignSelf: "flex-start" }}
                        onClick={() => setFilterOpen(false)}
                      >
                        <CloseIcon />
                      </IconButton>
                    ) : null}
                  </div>
                </MuiDialogTitle>
                <List>
                  {console.log(listOfFilters)}
                  <ListItem
                    button
                    alignItems="center"
                    onClick={() => getOtherLocations(listOfFilters[0])}
                    key={listOfFilters[0]}
                  >
                    <ListItemText primary="List all users" />
                  </ListItem>
                  <ListItem
                    button
                    alignItems="center"
                    onClick={() => getOtherLocations(listOfFilters[1])}
                    key={listOfFilters[1]}
                  >
                    <ListItemText primary={listOfFilters[1]} />
                  </ListItem>
                  <ListItem button onClick={handleFilterHabitOpen}>
                    <ListItemText primary="Habits:" />
                    {filterHabitOpen ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={filterHabitOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {listOfFilters.map((filter) => {
                        return filter == "No Filter" ? null : filter ==
                          "Friends" ? null : (
                          <ListItem
                            button
                            alignItems="center"
                            onClick={() => getOtherLocations(filter)}
                            key={filter}
                            className={classes.nested}
                          >
                            <ListItemText primary={filter} />
                          </ListItem>
                        );
                      })}
                    </List>
                  </Collapse>
                </List>
              </Dialog>

              <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                open={open}
                onClose={handleClose}
              >
                <DialogTitle
                  disableTypography
                  style={{
                    fontSize: "16px",
                    fontWeight: "800",
                    textTransform: "uppercase",
                  }}
                >
                  Select one of the privacy options:
                </DialogTitle>
                <DialogContent>
                  <Typography style={{ fontSize: "12px" }} variant="body1">
                    Private: Your location will not be visible to other users.
                  </Typography>
                  <Typography style={{ fontSize: "12px" }} variant="body1">
                    Friends: Your location will be visible only to your friends.
                  </Typography>
                  <Typography style={{ fontSize: "12px" }} variant="body1">
                    Public: Your location will be visible to other users.
                  </Typography>
                  <form className={classes.container}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="demo-dialog-select-label">
                        Privacy
                      </InputLabel>
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
              variant="outlined"
              color="secondary"
              onClick={getLocation}
              startIcon={<GpsFixedIcon />}
              className={classes.headerButtons}
            >
              Get Your Location
            </Button>
            <Button
              color="primary"
              endIcon={<FilterListIcon />}
              onClick={() => setFilterOpen(true)}
              className={classes.headerButtons}
            >
              Filter
            </Button>
          </div>
        </Grid>
        <Grid item xs={12} align="center">
          <LoadScript googleMapsApiKey="AIzaSyATAEeS2YuhKhzbSUNV2M2XH1H1YFztfZo">
            <GoogleMap
              zoom={15}
              mapContainerStyle={mapStyles}
              center={!location ? { lat: 53.46685, lng: -2.233884 } : location}
            >
              {!location ? null : (
                <Marker position={location} label={userName} />
              )}
              <Circle
                center={{ lat: 53.46685, lng: -2.233884 }}
                // required
                options={options}
              />
              {!otherUserData
                ? null
                : otherUserData.map((user) => {
                    return (
                      <Marker
                        key={user.user_id.user_name}
                        position={JSON.parse(user.location)}
                        onClick={() => handleWindowChange(user)}
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
        </Grid>
      </Grid>
    </div>
  );
};

export default MapPage;
