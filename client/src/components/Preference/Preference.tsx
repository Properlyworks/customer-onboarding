import {
  ConditionalRenderer,
  Form,
  FormRadio,
  MultiSelectCheckbox,
} from "@base-components";
import { FormStateContext } from "@context";
import { Box } from "@mui/material";
import { makeStyles } from "@styling";
import produce from "immer";
import React, { useContext, useEffect } from "react";
import { useForm, useFormState } from "react-hook-form";
import { Preferences as PreferencesType, PreferencesKeys } from "@types";
import { YES_NO, CATEGORIES, PREFERRED_MEDIUM } from "@constants";

const useStyles = makeStyles()((theme) => {
  const shared = {
    display: "flex",
    alignItems: "flex-start",
  };
  return {
    container: {
      ...shared,
      flexDirection: "column",
      gap: theme.spacing(2),
      padding: theme.spacing(2),
    },
    titleContainer: {
      ...shared,
      flexDirection: "column",
      padding: theme.spacing(1),
    },
  };
});

export const Preference: React.FC<{
  submitRef: React.MutableRefObject<null>;
}> = ({ submitRef }) => {
  const { form, setForm } = useContext(FormStateContext);

  const formReturn = useForm({
    mode: "onBlur",
    defaultValues: form.steps.preferences.value,
  });

  const {
    formState: { errors },
    clearErrors,
    reset,
  } = formReturn;
  const { isDirty } = useFormState({
    control: formReturn.control,
  });

  useEffect(() => {
    setForm(
      produce((form) => {
        form.steps.preferences.dirty = isDirty;
      })
    );
  }, [isDirty, setForm]);

  const onSubmit = async (value: PreferencesType) => {
    await setForm(
      produce((formState) => {
        formState.selectedIndex += 1;
      })
    );
    console.log(form.steps.preferences);
  };

  const onChange = (value: string | string[], name: PreferencesKeys) => {
    clearErrors(name);
    let setValue: PreferencesType = { ...form.steps.preferences.value };
    name === "categories"
      ? (setValue[name] = value as string[])
      : (setValue[name] = value as string);
    name === "needConsulting" &&
      (value === YES_NO[0]
        ? (setValue.categories = [])
        : ((setValue.preferredMedium = ""),
          reset({
            preferredMedium: "",
            needConsulting: setValue.needConsulting,
            categories: setValue.categories,
          })));

    setForm(
      produce((formState) => {
        formState.steps.preferences.value = setValue;
      })
    );
  };

  const { classes } = useStyles();

  return (
    <Form onSubmit={onSubmit} form={formReturn}>
      <Box className={classes.container}>
        <Box className={classes.titleContainer}>
          <h2>What are you looking for?</h2>
          <span>Please select an answer based on your needs.</span>
        </Box>
        <Box>
          <FormRadio
            required={"Field is required"}
            label="Do you need consulting?"
            options={YES_NO}
            onChange={(value: string) => onChange(value, "needConsulting")}
            name="needConsulting"
            form={formReturn}
            defaultValue={form.steps.preferences.value.needConsulting}
          />
          <ConditionalRenderer
            condition={form.steps.preferences.value.needConsulting == YES_NO[0]}
          >
            <FormRadio
              required={"Field is required"}
              label="Preferred Medium?"
              options={PREFERRED_MEDIUM}
              onChange={(value: string) => onChange(value, "preferredMedium")}
              name="preferredMedium"
              form={formReturn}
              defaultValue={form.steps.preferences.value.preferredMedium}
            />
          </ConditionalRenderer>
          <ConditionalRenderer
            condition={form.steps.preferences.value.needConsulting == YES_NO[1]}
          >
            <MultiSelectCheckbox
              required={"Field is required"}
              label="Need help with optimizing manufacturing operations?"
              options={CATEGORIES}
              onChange={(value: string[]) => onChange(value, "categories")}
              name="categories"
              form={formReturn}
              defaultValue={form.steps.preferences.value.categories}
            />
          </ConditionalRenderer>
        </Box>
      </Box>
      <button
        style={{ display: "none" }}
        ref={submitRef}
        type="submit"
      ></button>
    </Form>
  );
};
