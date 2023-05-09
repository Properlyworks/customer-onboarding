import {
  companyImage,
  compnayTypeImage,
  designationImage,
  emailImage,
  personImage,
  phoneImage,
} from "@assets";
import { Form, FormInput } from "@base-components";
import { FormStateContext } from "@context";
import { Box } from "@mui/material";
import { makeStyles } from "@styling";
import {
  ContactDetails as ContactDetailsType,
  ContactDetailsKeys,
} from "@types";
import produce from "immer";
import React, { useContext, useEffect } from "react";
import { useForm, useFormState } from "react-hook-form";

const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex =
  /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

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
    inputGroup: {
      ...shared,
      gap: theme.spacing(2),
      width: "100%",
      [theme.breakpoints.between("md", "lg")]: {
        flexWrap: "wrap",
        "& > div": {
          width: `calc(50% - ${theme.spacing(2)})`,
        },
      },
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        width: "100%",
      },
    },
    companyGroup: {
      ...shared,
      flexWrap: "wrap",
      gap: theme.spacing(2),
      "& > div": {
        width: `calc(50% - ${theme.spacing(2)})`,
      },
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        width: "100%",
        "& > div": {
          width: "100%",
        },
      },
    },
  };
});

export const ContactDetails: React.FC<{
  submitRef: React.MutableRefObject<null>;
}> = ({ submitRef }) => {
  const { form, setForm } = useContext(FormStateContext);

  const formReturn = useForm({
    mode: "onBlur",
    defaultValues: form.steps.contactDetails.value,
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
        form.steps.contactDetails.dirty = isDirty;
      })
    );
  }, [isDirty, setForm]);

  const onSubmit = (value: ContactDetailsType) => {
    setForm(
      produce((formState) => {
        formState.steps.contactDetails = {
          value,
          valid: true,
          dirty: false,
        };
        formState.selectedIndex += 1;
      })
    );
  };

  const onChange = (value: string, name: ContactDetailsKeys) => {
    clearErrors(name);
    setForm(
      produce((formState) => {
        formState.steps.contactDetails.value[name] = value;
      })
    );
  };

  const { classes } = useStyles();

  return (
    <Form onSubmit={onSubmit} form={formReturn}>
      <Box className={classes.container}>
        <Box className={classes.titleContainer}>
          <h2>Contact Details</h2>
          <span>Please provide your contact details.</span>
        </Box>
        <Box className={classes.inputGroup}>
          <FormInput
            required={"Name is required"}
            icon={personImage}
            label="Name"
            onChange={(value: string) => onChange(value, "name")}
            name="name"
            form={formReturn}
            placeHolder="John Doe"
          />
          <FormInput
            required={"Phone is required"}
            icon={phoneImage}
            label="Phone"
            onChange={(value: string) => onChange(value, "phone")}
            name="phone"
            pattern={{
              value: phoneRegex,
              message: "Please enter valid phone number",
            }}
            form={formReturn}
            placeHolder="(123) 456 7890"
          />
          <FormInput
            required={"Email is required"}
            icon={emailImage}
            label="Email"
            onChange={(value: string) => onChange(value, "email")}
            name="email"
            pattern={{ value: emailRegex, message: "Please enter valid email" }}
            form={formReturn}
            placeHolder="abc@org.com"
          />
        </Box>
        <Box className={classes.companyGroup}>
          <FormInput
            required={"Company name is required"}
            icon={companyImage}
            label="Company"
            onChange={(value: string) => onChange(value, "company")}
            name="company"
            form={formReturn}
            placeHolder="Company name"
          />
          <FormInput
            icon={compnayTypeImage}
            label="Company type"
            onChange={(value: string) => onChange(value, "companyType")}
            name="companyType"
            form={formReturn}
            placeHolder="Company type"
          />
          <FormInput
            icon={designationImage}
            label="Designation"
            onChange={(value: string) => onChange(value, "designation")}
            name="designation"
            form={formReturn}
            placeHolder="Designation"
          />
        </Box>
        <button
          style={{ display: "none" }}
          ref={submitRef}
          type="submit"
        ></button>
      </Box>
    </Form>
  );
};
