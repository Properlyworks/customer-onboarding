import React from 'react'
import { Box, BoxProps } from '@mui/material';
import { makeStyles } from '@styling';

const useStyles = makeStyles()(theme => ({
    container: {
        borderRadius: 25,
        alignItems: "center",
        textAlign: "center",
        minHeight: 400,
        maxWidth: 600,
        minWidth: 300,
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        margin: theme.spacing(3)
    }
}));

export const StepContainer: React.FC = () => {
    const { classes } = useStyles();
  return (
    <Box className={classes.container}>
        
    </Box>
  )
}
