import { Box } from "@mui/system";
import { makeStyles } from "@styling";
import { FormEvent, Fragment } from "react";
import { FieldValue, FieldValues, UseFormReturn } from "react-hook-form";

export type FormSelectProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  className?: string;
  label?: string;
  name: string;
  options: string[];
  onChange?: (value: any) => void;
  wrapper?: React.JSXElementConstructor<{ children: React.ReactElement }>;
  defaultValue?: string;
  required?: string | boolean;
};

const useStyles = makeStyles()((theme) => ({
  formGroup: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "relative",
    width: "100%",
  },
  label: {
    padding: theme.spacing(1),
  },
  input: {
    width: "100%",
    border: `1px solid ${theme.palette.grey[300]}`,
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
    borderRadius: 30,
    padding: theme.spacing(2.5),
    paddingRight: theme.spacing(7.5),
  },
  inputError: {
    border: `1px solid red`,
  },
  img: {
    position: "absolute",
    right: 20,
    top: 40,
    bottom: 0,
    margin: "auto 0",
  },
  formError: {
    display: "flex",
    padding: theme.spacing(1, 2),
    color: "indianred",
    fontSize: 14,
    whiteSpace: "nowrap",
  },
  formInputSelectBox: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    padding: theme.spacing(1, 0),
    fontSize: theme.spacing(1.5),
  },
  formInputSelect: {
    display: "flex",
    width: "100%",
    height: theme.spacing(4),
    border: `1px solid ${theme.palette.grey[300]}`,
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
    borderRadius: 10,
    padding: theme.spacing(0, 1.5),
  },
}));

export const FormSelect = <T extends FieldValues>({
  form,
  className,
  wrapper: Wrapper = Fragment,
  defaultValue,
  options = [],
  name,
  onChange,
  required,
}: FormSelectProps<T>) => {
  const { classes, cx } = useStyles();
  const {
    register,
    formState: { errors },
  } = form;
  const onValueChange = (e: FormEvent<HTMLSelectElement>) => {
    onChange?.(e.currentTarget.value);
  };
  return (
    <Wrapper>
      <Box className={classes.formInputSelectBox}>
        <select
          value={defaultValue}
          {...register(name as FieldValue<T>, {
            required: required,
            onChange: onValueChange,
          })}
          className={cx(
            classes.formInputSelect,
            errors[name] && classes.inputError
          )}
        >
          <option value="">Select</option>
          {options &&
            options.length &&
            options.map((eachOption, indx) => {
              return (
                <option value={eachOption} key={indx}>
                  {eachOption}
                </option>
              );
            })}
        </select>
        <span className={classes.formError}>
          {errors[name]?.message as string}
        </span>
      </Box>
    </Wrapper>
  );
};
