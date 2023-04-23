import { Form, FormRadio } from "@base-components";
import { FormStateContext } from "@context";
import { Box } from "@mui/material";
import { makeStyles } from "@styling";
import produce from "immer";
import React, { useContext, useEffect } from "react";
import { useForm, useFormState } from "react-hook-form";
import { Budget as BugetType, BugetKeys } from "@types";
import { BUDGET as BUDGET_VALUES } from "@constants";

const useStyles = makeStyles()((theme) => {
  const shared = {
    display: "flex",
    alignItems: "flex-start",
  };
  return {
    container: {
      ...shared,
      flexDirection: "column",
      gap: theme.spacing(1),
      padding: theme.spacing(2, 0),
      maxWidth: theme.spacing(54),
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

export const Budget: React.FC<{ submitRef: React.MutableRefObject<null> }> = ({
  submitRef,
}) => {
  const { form, setForm } = useContext(FormStateContext);

  const formReturn = useForm({
    mode: "onBlur",
    defaultValues: form.steps.budget.value,
  });

  const {
    formState: { errors },
    clearErrors,
  } = formReturn;
  const { isDirty } = useFormState({
    control: formReturn.control,
  });

  useEffect(() => {
    setForm(
      produce((form) => {
        form.steps.budget.dirty = isDirty;
      })
    );
  }, [isDirty, setForm]);

  const onSubmit = (value: BugetType) => {
    setForm(
      produce((formState) => {
        formState.steps.budget = {
          value,
          valid: true,
          dirty: false,
        };
        formState.selectedIndex += 1;
      })
    );
  };

  const onChange = (value: string, name: BugetKeys) => {
    clearErrors(name);
    setForm(
      produce((formState) => {
        formState.steps.budget.value[name] = value;
      })
    );
  };

  const { classes } = useStyles();

  return (
    <Form onSubmit={onSubmit} form={formReturn}>
      <Box className={classes.container}>
        <Box className={classes.titleContainer}>
          <h2>What’s your project budget?</h2>
          <span>Please select the project budget range you have in mind.</span>
        </Box>
        <FormRadio
          required={"Field is required"}
          className={classes.radio}
          options={BUDGET_VALUES}
          onChange={(value: string) => onChange(value, "budget")}
          name="budget"
          form={formReturn}
          defaultValue={form.steps.budget.value.budget}
        />
      </Box>
      <button
        style={{ display: "none" }}
        ref={submitRef}
        type="submit"
      ></button>
    </Form>
  );
};
