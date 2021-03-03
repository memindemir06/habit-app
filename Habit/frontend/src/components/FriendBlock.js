import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Card, CardHeader, CardContent, Collapse, Grid, IconButton, Typography, Container, Avatar, Tooltip } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import DeleteIcon from '@material-ui/icons/Delete';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

  
const FriendBlock = ({ firstName, lastName, email, user_id }) => {
    const [expanded, setExpanded] = useState(false);
    const [showComponent, setShowComponent] = useState(true);
    let history = useHistory();
    const handleExpandClick = () => {
        setExpanded(!expanded);
    }

    const handleProfileClick = () => {
      history.push("/profile/" + user_id);
    }
    
    const handleDeleteClick = () => {
      console.log("Delete" + user_id);
      removeFriendBlock(); // Call this function when user is deleted in backend
    }

    const removeFriendBlock = () => {
      setShowComponent(false);
    }

  if (showComponent == true) {
    return (
      <div>
          <Container>
              <Grid item xs={12}>
                  <Card>
                      <CardHeader avatar={<Avatar> {firstName[0]} </Avatar>} title={firstName + " " + lastName} action={
                          <div>
                              <Tooltip title="View profile">
                              <IconButton onClick={handleProfileClick} >
                                  <AccountCircleIcon />
                              </IconButton>
                              </Tooltip>
                              <Tooltip title="Delete friend">
                              <IconButton onClick={handleDeleteClick} >
                                  <DeleteIcon />
                              </IconButton >
                              </Tooltip>     
                              <IconButton onClick={handleExpandClick} >
                                  {expanded ? (<ExpandLessIcon />) : (<ExpandMoreIcon />)}
                              </IconButton>
                          </div>
                      } />
                      <Collapse in={expanded} timeout="auto">
                          <CardContent>
                              <Typography variant="h4">Email: {email}</Typography>
                              <Typography variant="h4">Twitter: twitter.com/twitter</Typography>
                              <Typography variant="h4">Instagram: instagram.com/instagram</Typography>
                              <Typography variant="h4">Facebook: facebook.com/facebook</Typography>
                          </CardContent>
                      </Collapse>
                  </Card>
              </Grid>
          </Container>
    </div>
  );
  }
  else {
    return <div></div>;
  }
 
};

export default FriendBlock;
