import { Box } from '@mui/system';
import { makeStyles } from '@styling';
import {FormEvent, Fragment } from 'react'
import { FieldValue, FieldValues, UseFormReturn, ValidationRule } from 'react-hook-form';
import { ConditionalRenderer } from './ConditionalRenderer';

export type FormInputProps<T extends FieldValues> = {
    form: UseFormReturn<T>,
    className?: string,
    label?: string
    name: string;
    onChange?: (value: any) => void;
    shouldUnregister?: boolean;
    required?: boolean | string;
    wrapper?: React.JSXElementConstructor<{ children: React.ReactElement }>;
    icon?: string;
    placeHolder?: string;
    pattern?: ValidationRule<RegExp>;
}

const useStyles = makeStyles()(theme => ({
    formGroup: {
        display: "flex",
        flexDirection: "column",
        alignItems: 'flex-start',
        position: "relative",
        width: "100%"
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
        display: 'flex',
        padding: theme.spacing(1,2),
        color: 'indianred',
        fontSize: 14,
        whiteSpace: 'nowrap',
    }

    }
));

    
export const FormInput = <T extends FieldValues>({
    className, wrapper: Wrapper = Fragment, name,
    label, required = false, form, onChange, icon, placeHolder,pattern
}: FormInputProps<T>) => {
    const { classes, cx } = useStyles();
    const { register, formState: {errors} } = form;
    const onValueChange = (e: FormEvent<HTMLInputElement>) => {
        onChange?.(e.currentTarget.value)
    }
    return (
        <Wrapper>
            <Box>
                <Box className={cx(classes.formGroup, className)}>
                    <label className={ classes.label} htmlFor={name}>{ label }</label>
                    <input placeholder={placeHolder} className={cx(classes.input, errors[name] && classes.inputError)}
                        {...register(name as FieldValue<T>,
                            { required: required, pattern: pattern, onChange: onValueChange })} type="text" name={name} id={name} />
                    <ConditionalRenderer condition={Boolean(icon)}>
                        <img className={classes.img } src={icon}></img>
                    </ConditionalRenderer>
                </Box>
                <span className={classes.formError}>{errors[name]?.message as string}</span>
            </Box>
        </Wrapper >
    )
}
