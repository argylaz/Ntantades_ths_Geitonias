import React from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import nanny_image from "../images/nanny.jpg"
import handshake_image from "../images/handshake.jpg"
import payment_image from "../images/payment.webp"
import history_activity_image from "../images/history_activity.jpg"
import greeting_image from "../images/cooperation_image.jpg"
import job_image from "../images/job.jpg"
import rating_image from "../images/rating.jpeg"


import { useNavigate } from 'react-router-dom';




const images = [
    {
      url: greeting_image,
      title: 'Αιτήσεις Ενδιαφέροντος Συνεργασίας',
      width: '100%',
      route: 'requests'
    },
    {
      url: job_image,
      title: 'Οι Αγγελίες μου',
      width: '100%',
      route: 'Advertisement'
    },
    {
      url: payment_image,
      title: 'Λήψη Πληρωμής',
      width: '100%',
    },
    {
        url: history_activity_image,
        title: 'Ιστορικό Ενεργειών',
        width: '100%',
    },
    {
        url: handshake_image,
        title: 'Τα Ραντεβού μου',
        width: '100%',
        route: 'NannyMeetings'
    },    
    {
        url: rating_image,
        title: 'Προβολή Αξιολογήσεων',
        width: '100%',
    },    

  ];
  
  const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    height: 300,
    [theme.breakpoints.down('sm')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &.Mui-focusVisible': {
      zIndex: 1,
      '& .MuiImageBackdrop-root': {
        opacity: 0.15,
      },
      '& .MuiImageMarked-root': {
        opacity: 0,
      },
      '& .MuiTypography-root': {
        border: '4px solid currentColor',
      },
    },
  }));
  
  const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  });
  
  const Image = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  }));
  
  const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  }));
  
  const ImageMarked = styled('span')(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  }));

function NannyActions () {

    const navigate = useNavigate();

    return (

        
        <div className="inner-page">
            <h1 style={{ color: "#494030", fontStyle: 'normal' }}> Επιλέξτε την ενέργεια που επιθυμείτε </h1>
            
            

            <Box sx={{ display: 'flex', flexDirection: "row", gap : 4, minWidth: 1200, width: '100%' , minHeight:100,}}>
            {images.map((image) => (
                <ImageButton
                focusRipple
                key={image.title}
                onClick={() => navigate(image.route)}
                style={{
                    width: image.width,
                }}
                >
                <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
                <ImageBackdrop className="MuiImageBackdrop-root" />
                <Image>
                    <Typography
                    component="span"
                    variant="subtitle1"
                    color="inherit"
                    sx={(theme) => ({
                        position: 'relative',
                        p: 4,
                        pt: 2,
                        pb: `calc(${theme.spacing(1)} + 6px)`,
                    })}
                    >
                    {image.title}
                    <ImageMarked className="MuiImageMarked-root" />
                    </Typography>
                </Image>
                </ImageButton>
            ))}
            </Box>
   

        </div>
    );
};

export default NannyActions;