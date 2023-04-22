import { FormLabel, Radio, RadioGroup } from '@mui/material';
import { Box } from '@mui/system';
import { makeStyles } from '@styling';
import {FormEvent, Fragment, useState } from 'react'
import { FieldValue, FieldValues, UseFormReturn, ValidationRule } from 'react-hook-form';
import { FieldSize } from './FieldSize';

export type FormRadioProps<T extends FieldValues> = {
    form: UseFormReturn<T>,
    className?: string,
    label?: string
    name: string;
    onChange?: (value: any) => void;
    shouldUnregister?: boolean;
    required?: boolean | string;
    wrapper?: React.JSXElementConstructor<{ children: React.ReactElement }>;
    options?: string[];
    defaultValue?: string;
}

const useStyles = makeStyles()(theme => ({
    container: {
        padding: theme.spacing(1),
        textAlign: 'left',
    },
    formGroup: {
        display: "flex",
        flexDirection: "row",
        alignItems: 'flex-start',
        position: "relative",
        width: "100%",
        flexWrap: "wrap",
        gap: theme.spacing(2)
    },
    inputContainer: {
        display: "flex",
        padding: theme.spacing(1),
        border: `1px solid`,
        width: theme.spacing(20),
        alignItems: 'center',
        height: theme.spacing(8),
        borderRadius: 10,
        gap: theme.spacing(1),
        margin: theme.spacing(1, 0),
        fontSize: 14
    },
    inputChecked: {
        borderColor: theme.palette.primary.main
    },
    input: {
        width: theme.spacing(3),
        height: theme.spacing(2),
    },
    inputError: {
        border: `1px solid red`,
    },
    formError: {
        display: 'flex',
        color: 'indianred',
        fontSize: 14,
        whiteSpace: 'nowrap',
    }
    }
));

    
export const FormRadio = <T extends FieldValues>({
    className, wrapper: Wrapper = Fragment, name,
    label, required = false, form, onChange, options, defaultValue
}: FormRadioProps<T>) => {
    const { classes, cx } = useStyles();
    const { register, formState: { errors } } = form;
    const [checked, setChecked] = useState(defaultValue || "");
    const onValueChange = (e: FormEvent<HTMLInputElement>) => {
        setChecked(e.currentTarget.value)
        onChange?.(e.currentTarget.value)
    }
    return (
        <Wrapper>
            <Box className={classes.container}>
                <label htmlFor={name}>{ label }</label>
                <Box className={cx(classes.formGroup, className)}>
                    {options?.map((opt: string) => {
                        return <label key={opt} html-for={name + '-' + opt}
                                    className={cx(classes.inputContainer, checked === opt && classes.inputChecked)}>
                                <input className={cx(classes.input, errors[name] && classes.inputError)}
                                    {...register(name as FieldValue<T>,
                                    { required: required, onChange: onValueChange })} type="radio" value={opt} name={name} id={name + '-' + opt} />
                                {opt}
                            </label>
                    })}
                </Box>
                <span className={classes.formError}>{errors[name]?.message as string}</span>
            </Box>
        </Wrapper >
    )
}
