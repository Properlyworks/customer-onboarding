import { Box, BoxProps } from '@mui/material';
import { makeStyles } from '@styling';
import React from 'react'
import { ConditionalRenderer } from '@base-components';

export type ButtonProps = BoxProps & {
    classOveride?: string;
    isLink?: boolean;
    href?: string;
    text: string;
}

const useStyles = makeStyles()(theme => ({
    box: {
        marginRight: theme.spacing(4),
        backgroundColor: theme.palette.primary.main,
        borderRadius: "56px",
        alignItems: "center",
        textAlign: "center"
    },
    text: {
        padding: theme.spacing(0,2.5),
        color: theme.palette.common.white,
        lineHeight: "1",
        fontSize: "12px"
    }
}));

export const Button: React.FC<ButtonProps> = ({
    href = "javascript:void(0)",
    isLink = false,
    text,
    ...props
}) => {
    const { classes,cx } = useStyles();
    return (
        <Box className={cx(classes.box,props.className)}>
            <ConditionalRenderer fallbackComponent={() =>
                <p className={classes.text}>{text}</p>
            } condition={isLink}>
                <a className={classes.text}>{text}</a>
            </ConditionalRenderer>
        </Box>
  )
}
