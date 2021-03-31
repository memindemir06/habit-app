import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
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
  const [location, setLocation] = useState(null);
  let map;
  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const [privacy, setPrivacy] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
      });
    }
  };

  const mapStyles = {
    height: "70%",
    width: "70%",
    alignSelf: "center",
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
                    <MenuItem value={10}>Private</MenuItem>
                    <MenuItem value={20}>Friends</MenuItem>
                    <MenuItem value={30}>Public</MenuItem>
                  </Select>
                </FormControl>
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleClose} color="primary">
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

      <Map
        google={google}
        zoom={12}
        className={classes.mapStyles}
        style={mapStyles}
        initialCenter={{ lat: 53.46685, lng: -2.233884 }}
      >
        <Marker position={location} />
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyAjYMvvwMwy5ac0xD2W9KSyN1JY4Ak9hnA",
})(MapPage);
