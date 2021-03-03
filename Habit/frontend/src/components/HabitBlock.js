import React, {useState} from "react";
import { Card, CardHeader, CardContent, Collapse, Grid, IconButton, Tooltip, Typography, Container } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import DeleteIcon from '@material-ui/icons/Delete';

const HabitBlock = ({ habitName, startDate, streak }) => {
  const [expanded, setExpanded] = useState(false);
  const [showComponent, setShowComponent] = useState(true);
  
  const handleExpandClick = () => {
    setExpanded(!expanded);
    }

  const handleDeleteClick = () => {
    console.log("Delete" + habitName);
    removeFriendBlock();
  }

  const removeFriendBlock = () => {
    setShowComponent(false);
  }

  if (showComponent == true) {
    return (
      <div>
        {/* <ThemeProvider theme={theme}>
          <Container style={{ backgroundColor: "orange" }}>
  
          </Container>
        </ThemeProvider> */}
        <Container>
          <Grid item xs={12}> 
            <Card> 
            <CardHeader title={habitName} action={
            <div> 
                <Tooltip title="Delete habit">
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
                <Typography variant="h4">Start Date: {startDate}</Typography> 
                <Typography variant="h4">Streak: {streak}</Typography>
              </CardContent> 
            </Collapse>
            </Card>
          </Grid>
        </Container>
  
  
      </div>
    );
  } else {
    return <div></div>;
  }   
  
};

export default HabitBlock;
