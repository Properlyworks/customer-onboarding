import React from 'react'
import { makeStyles } from "@styling";

const useStyles = makeStyles()(theme => ({
  text: {
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(0),
    fontSize: 18,
    fontWeight: 500
  }
}));

export const SubTitle = () => {
  const {classes} = useStyles();
  return (
    <h2 className={classes.text}>Please fill form below to receive a quote for your project.
      Feel Free to add as much detail as needed.</h2>
  )
}
