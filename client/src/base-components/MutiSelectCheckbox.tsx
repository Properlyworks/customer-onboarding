import { Box } from "@mui/system";
import { makeStyles } from "@styling";
import { LabelValue } from "@types";
import { FormEvent, Fragment, useState } from "react";
import { FieldValue, FieldValues, UseFormReturn } from "react-hook-form";

export type MultiSelectCheckboxProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  className?: string;
  label?: string;
  name: string;
  onChange?: (value: any) => void;
  shouldUnregister?: boolean;
  required?: boolean | string;
  wrapper?: React.JSXElementConstructor<{ children: React.ReactElement }>;
  options?: LabelValue[];
  defaultValue?: string[];
};

const useStyles = makeStyles()((theme) => ({
  container: {
    padding: theme.spacing(1),
    gap: theme.spacing(1),
    flexDirection: "column",
    display: "flex",
    textAlign: "left",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    position: "relative",
    width: "100%",
    flexWrap: "wrap",
  },
  inputContainer: {
    display: "flex",
    padding: theme.spacing(0.5, 0),
    alignItems: "center",
    borderRadius: 10,
    fontSize: 14,
  },
  input: {
    width: theme.spacing(2),
    height: theme.spacing(2),
  },
  text: {
    padding: theme.spacing(0, 1),
  },
  formError: {
    display: "flex",
    color: "indianred",
    fontSize: 14,
    whiteSpace: "nowrap",
  },
}));

export const MultiSelectCheckbox = <T extends FieldValues>({
  className,
  wrapper: Wrapper = Fragment,
  name,
  label,
  required = false,
  form,
  onChange,
  options,
  defaultValue = [],
}: MultiSelectCheckboxProps<T>) => {
  const { classes, cx } = useStyles();
  const {
    register,
    formState: { errors },
  } = form;
  const [checkedValues, setCheckedValues] = useState(defaultValue);

  const onValueChange = (e: FormEvent<HTMLInputElement>) => {
    const { value, checked } = e.currentTarget;
    const setValue = checked
      ? checkedValues.includes(value)
        ? checkedValues
        : [...checkedValues, value]
      : checkedValues.filter((v) => v !== value);
    setCheckedValues(setValue);
    onChange?.(setValue);
  };

  return (
    <Wrapper>
      <Box className={classes.container}>
        <label htmlFor={name}>{label}</label>
        <Box className={cx(classes.formGroup, className)}>
          {options?.map(({ label, value }: LabelValue) => {
            return (
              <label
                key={value}
                html-for={name + "-" + value}
                className={cx(classes.inputContainer)}
              >
                <input
                  className={classes.input}
                  {...register(name as FieldValue<T>, { required: required })}
                  type="checkbox"
                  value={label}
                  onChange={onValueChange}
                  name={value}
                  id={name + "-" + value}
                />
                <span className={classes.text}>{label}</span>
              </label>
            );
          })}
        </Box>
        <span className={classes.formError}>
          {errors[name]?.message as string}
        </span>
      </Box>
    </Wrapper>
  );
};
