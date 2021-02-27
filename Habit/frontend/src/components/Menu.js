import React from "react";
import {
  Menu,
  Grid,
  Button,
  TextField,
  Typography,
  Container,
  Box,
} from "@material-ui/core";
import { palette } from "@material-ui/system";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import { orange } from "@material-ui/core/colors";

function MenuTest() {
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
