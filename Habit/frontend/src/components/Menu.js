import React from "react";
<<<<<<< HEAD
import {
  Menu,
  Grid,
  Button,
  TextField,
  Typography,
  Container,
  Box,
=======
import { Link } from "react-router-dom";
import {
  MenuList,
  MenuItem,
  Grid,
  Button,
  Menu,
  TextField,
  Hidden,
  Typography,
  Container,
  Box,
  Icon,
>>>>>>> Frontend
} from "@material-ui/core";
import { palette } from "@material-ui/system";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import { orange } from "@material-ui/core/colors";
import MyAccountIcon from "@material-ui/icons/AccountCircleRounded";
import MenuIcon from "@material-ui/icons/Menu";
import DailyRemindersIcon from "@material-ui/icons/CalendarTodayRounded";

function MenuTest() {
<<<<<<< HEAD
  const handleClick = () => {};
  const handleClose = () => {};

  return (
    <div>
      <Button
        aria-controls="fade-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Open Menu
      </Button> 
      <Menu id="fade-menu" onClose={handleClose}>
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  ); 
} 

export default Menu;
=======

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

  return (
      <div>
          <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}> <MenuIcon /> </Button>
        <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuList onClose={handleClose}>
                <MenuItem onClick={handleClose}>
                    <Button component={Link} to="/profile/FZPIGF" startIcon={<MyAccountIcon />}> My Account </Button>    
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Button component={Link} to="/FZPIGF" startIcon={<DailyRemindersIcon />}> Daily Reminders </Button>
                </MenuItem>
              </MenuList>
        </Menu>
    </div>
  );
}

export default MenuTest;
>>>>>>> Frontend
