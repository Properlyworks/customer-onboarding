import { submitImage } from "@assets";
import { Button } from "@base-components";
import { BASE_QUESTIONS } from "@constants";
import { FormStateContext } from "@context";
import { Box } from "@mui/material";
import { makeStyles } from "@styling";
import React, { useContext } from "react";

const useStyles = makeStyles()((theme) => {
  const shared = {
    display: "flex",
    alignItems: "center",
  };
  return {
    container: {
      ...shared,
      flexDirection: "column",
      gap: theme.spacing(1),
      padding: theme.spacing(2, 0),
      maxWidth: theme.spacing(54),
      "& img": {
        paddingTop: theme.spacing(2),
      },
      "& > div > button > p": {
        padding: theme.spacing(0.5, 4),
      },
    },
    radio: {
      "& > label": {
        width: "calc(50% - 10px)",
        height: theme.spacing(9),
        fontSize: 15,
      },
    },
    titleContainer: {
      ...shared,
      flexDirection: "column",
      padding: theme.spacing(1),
    },
  };
});

export const Review: React.FC = () => {
  const { classes } = useStyles();
  const { form, setForm } = useContext(FormStateContext);
  const submit = () => {
    let data = {} as Record<string, string | string[]>;
    Object.entries(form.steps).forEach(([stepName, step]) => {
      if (stepName == "questions") {
        Object.entries(step.value).forEach(([id, value]) => {
          data[BASE_QUESTIONS[id].question] = value;
        });
      } else {
        data = { ...data, ...step.value };
      }
    });
    console.log(data);
  };

  return (
    <Box className={classes.container}>
      <img src={submitImage} alt="review and submit" />
      <Box className={classes.titleContainer}>
        <h2>Submit your quote request</h2>
        <span>
          Please review all the information you previously typed in the past
          steps, and if all is okay, submit your message to receive a project
          quote in 24 - 48 hours.
        </span>
      </Box>
      <Button onClick={submit} text="Submit"></Button>
    </Box>
  );
};
