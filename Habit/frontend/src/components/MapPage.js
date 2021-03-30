import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { Button } from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";

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

  const getLocation = () => {};

  return (
    <div className={classes.root}>
      <div className={classes.headerContainer}>
      <Button variant="outlined" color="primary" onClick={getLocation}>
          Get Your Location
        </Button>
        <Button variant="outlined" color="primary" onClick={getLocation}>
          Get Your Location
        </Button>
        <Button
          variant="contained"
          color="primary"
          endIcon={<FilterListIcon />}
        >
          Filter
        </Button>
      </div>
      <Map
        google={google}
        zoom={12}
        className={classes.mapStyles}
        initialCenter={{ lat: 53.46685, lng: -2.233884 }}
      />
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyAjYMvvwMwy5ac0xD2W9KSyN1JY4Ak9hnA",
})(MapPage);
