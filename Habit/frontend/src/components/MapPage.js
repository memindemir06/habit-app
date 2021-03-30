import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { Button, Typography } from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import LoadingPage from "./LoadingPage";

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: theme.spacing(7),
    [theme.breakpoints.down("xs")]: {
      margin: 0,
    },
  },
  headerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  mapStyles: {
    height: "90%",
    width: "80%",
  },
}));

const MapPage = ({ userId }) => {
  const [location, setLocation] = useState(null);
  let map;
  const classes = useStyles();
  const theme = useTheme();

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.headerContainer}>
        <Button variant="outlined" color="primary" onClick={getLocation}>
          Allow your Location
        </Button>
        <Button
          variant="contained"
          color="primary"
          endIcon={<FilterListIcon />}
        >
          Filter
        </Button>
      </div>
      {location ? (
        <Map
          google={google}
          zoom={12}
          className={classes.mapStyles}
          initialCenter={location}
        />
      ) : (
        // Loading... 
        <Typography variant="h4" align="center">
          Allow Location
        </Typography>
      )}
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyAjYMvvwMwy5ac0xD2W9KSyN1JY4Ak9hnA",
})(MapPage);
