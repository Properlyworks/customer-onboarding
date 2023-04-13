import React from 'react'
import { Box } from '@mui/material';
import { makeStyles } from "@styling";
import { SubTitle } from './SubTitle';

const useStyles = makeStyles()(theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    margin: theme.spacing(1),
    maxWidth: 500
  }
}));

export const Title: React.FC = () => {
const {classes} = useStyles();
    return (
      <Box className={classes.container}>
        <h1>Get a project quote</h1>
        <SubTitle></SubTitle>
      </Box>
  )
}
