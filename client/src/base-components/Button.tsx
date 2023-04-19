import { Box, BoxProps } from '@mui/material';
import { makeStyles } from '@styling';
import React from 'react'
import { ConditionalRenderer } from '@base-components';

export type ButtonProps = BoxProps  & {
    isLink?: boolean;
    href?: string;
    text: string;
    type?: "button" | "submit" | "reset" | undefined;
    isSecondary?: boolean; 
    onClick?: () => void;
}

const useStyles = makeStyles()((theme) => ({
    container: {
        alignItems: "center",
        textAlign: "center",
        display: 'flex'
    },
    button: {
        backgroundColor: theme.palette.primary.main,
        border: `2px solid ${theme.palette.primary.main}`,
        borderRadius: 56,
        alignItems: "center",
        textAlign: "center",
        cursor: "pointer"
    },
    secondaryButton: {
        backgroundColor: theme.palette.common.white,
    },
    text: {
        padding: theme.spacing(0,2.5),
        color: theme.palette.common.white,
        lineHeight: 1,
        fontSize: 14,
        fontWeight: 600,
    },
    secondaryText: {
        color: theme.palette.primary.main,
        fontWeight: 400,
    },
    linkContainer: {
        backgroundColor: theme.palette.primary.main,
        borderRadius: 56,
        "& > a": {
            textDecoration: "none",
        }
    },
    link: {
        margin: theme.spacing(2),
        padding: theme.spacing(5),
    },
}));

export const Button: React.FC<ButtonProps> = ({
    href = "javascript:void(0)",
    isLink = false,
    onClick,
    text,
    type,
    isSecondary,
    ...props
}) => {
    const { classes, cx } = useStyles();
    const buttonClass = isSecondary ? cx(classes.button, classes.secondaryButton) : classes.button;
    const textClass = isSecondary ? cx(classes.text, classes.secondaryText) : classes.text;
    return (
        <Box className={cx(classes.container,props.className)}>
            <ConditionalRenderer fallbackComponent={() =>
                <button type={type} onClick={onClick} className={buttonClass}>
                    <p className={textClass}>{text}</p>
                </button>
            } condition={isLink}>
                <Box className={classes.linkContainer}>
                    <a href={href}>
                        <p className={textClass}>{text}</p>
                    </a>
                </Box>
            </ConditionalRenderer>
        </Box>
  )
}
