import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import AppBar2 from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import CloseIcon from '@material-ui/icons/Close';
import { MenuList, MenuItem } from '@material-ui/core';
import { Link } from "react-router-dom";
import MyAccountIcon from "@material-ui/icons/AccountCircleRounded";
import DailyRemindersIcon from "@material-ui/icons/CalendarTodayRounded";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

function AppBar() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <AppBar2 position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleClickOpen}>
            <MenuIcon />
          </IconButton>
          <Typography align="center" variant="h6" className={classes.title}>
            HAB!TS
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar2>
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            {/* <div>
            <MenuList>
                <MenuItem> */}
                    <Button component={Link} to="/profile/FZPIGF" startIcon={<MyAccountIcon />}> My Account </Button>    
                {/* </MenuItem>
                <MenuItem> */}
                    <Button component={Link} to="/FZPIGF" startIcon={<DailyRemindersIcon />}> Daily Reminders </Button>
                {/* </MenuItem>
              </MenuList>
            </div> */}
        </Dialog>
    </div>
  );
}

export default AppBar;
