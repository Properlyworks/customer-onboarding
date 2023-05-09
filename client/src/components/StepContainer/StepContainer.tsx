import React, { useCallback, useContext } from "react";
import { Box } from "@mui/material";
import { makeStyles } from "@styling";
import { ConditionalRenderer } from "@base-components";
import { FORM_STEPS } from "@constants";
import { FormStateContext } from "@context";
import produce from "immer";

const useStyles = makeStyles()((theme) => ({
  navContainer: {
    display: "flex",
    width: "100%",
    height: theme.spacing(8),
    gap: theme.spacing(3),
    padding: theme.spacing(0, 3, 2, 3),
    borderColor: theme.palette.text.secondary,
    alignItems: "flex-start",
    verticalAlign: "middle",
    flexDirection: "row",
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
  },
  circle: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    borderRadius: "50%",
    backgroundColor: theme.palette.grey[200],
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.grey[600],
  },
  circleCompleted: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  progressBar: {
    width: "calc(100% - 48px)",
    height: theme.spacing(0.7),
    borderRadius: theme.spacing(1),
    backgroundColor: theme.palette.grey[200],
  },
  progressBarCompleted: {
    backgroundColor: theme.palette.primary.main,
  },
  stepContainer: {
    height: "100%",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: theme.spacing(2),
    width: "100%",
    "&:last-of-type": {
      flexShrink: 2,
    },
  },
}));

export const StepContainer: React.FC = () => {
  const { classes, cx } = useStyles();
  const { form, setForm } = useContext(FormStateContext);
  const setState = useCallback(
    (index: number) => {
      setForm(
        produce((form) => {
          form.selectedIndex = index;
        })
      );
    },
    [setForm]
  );

  return (
    <Box className={classes.navContainer}>
      {FORM_STEPS.map((step, index) => (
        <Box key={index} className={classes.stepContainer}>
          <div
            className={cx(
              classes.circle,
              form.selectedIndex >= index ? classes.circleCompleted : ""
            )}
          >
            <span>{index + 1}</span>
          </div>
          <ConditionalRenderer condition={index + 1 != FORM_STEPS.length}>
            <div
              className={cx(
                classes.progressBar,
                form.selectedIndex >= index ? classes.progressBarCompleted : ""
              )}
            ></div>
          </ConditionalRenderer>
        </Box>
      ))}
    </Box>
  );
};
