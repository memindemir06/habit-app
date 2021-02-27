import React from "react";
import { Link } from "react-router-dom";
import { MenuList, MenuItem, Grid, Button, TextField, Typography, Container, Box } from "@material-ui/core";
import { palette } from '@material-ui/system';
import { makeStyles, ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { orange } from "@material-ui/core/colors";

function Menu()
{    
    const handleClick = () => {};
    const handleClose = () => {};

    return (
    <div>
    <Button aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
    Open Menu
    </Button>
    <MenuList
        id="fade-menu"
        onClose={handleClose}
            >
        <MenuItem component={Link} to="/FZPIGF">Daily Reminders</MenuItem>
        <MenuItem component={Link} to="/profile/FZPIGF">My account</MenuItem>
    </MenuList>
    </div> 
    );
};

export default Menu;