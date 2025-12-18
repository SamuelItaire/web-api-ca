import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation } from "react-router";

const ActorPage = (props) => {
  const { id } = useParams();
  const location = useLocation()
  
  console.log('Navigation state:', location.state);

  return (
    <Box sx={{ p: 3 }}>
      <Button 
        component={Link} 
        to="/" 
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 2 }}
      >
        Back to Movies
      </Button>
      
      <Typography variant="h4" component="h1" gutterBottom>
        Actor Details
      </Typography>
      
      <Typography variant="h6" component="p">
        Actor ID: {id}
      </Typography>
      
      <Typography variant="body1" sx={{ mt: 2 }}>
        This is a placeholder actor page. In a full implementation, this would show:
      </Typography>
      
      <ul>
        <li>Actor biography and photo</li>
        <li>Filmography with links to movies</li>
        <li>Additional actor information</li>
      </ul>
      
      <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic' }}>
        Demonstrates extensive linking between movies and actors
      </Typography>
    </Box>
  );
};

export default ActorPage;