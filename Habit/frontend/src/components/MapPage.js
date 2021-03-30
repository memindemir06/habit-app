import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: theme.spacing(8),
    height: "100vh",
  },
}));

const MapPage = ({ userId }) => {
  const [latitude, setLatitude] = useState("None");
  const [longitude, setLongitude] = useState("None");
  const [location, setLocation] = useState(null);
  const classes = useStyles();
  const theme = useTheme();
  let map;

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
      center: location,
      zoom: 3,
    });
    const marker = new google.maps.Marker({
      position: location,
      map: map,
    });
    s;
  }

  return (
    <div>
      <div id="map" className={classes.root}></div>
      {/* Marker Cluster Library */}
      <script src="https://unpkg.com/@googlemaps/markerclustererplus/dist/index.min.js"></script>
      <script
        async
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAjYMvvwMwy5ac0xD2W9KSyN1JY4Ak9hnA&callback=initMap&libraries=&v=weekly"
      ></script>
    </div>
  );
};

export default MapPage;
