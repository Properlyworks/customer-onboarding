import React from "react";
import { makeStyles } from "@styling";
import { Button} from "@base-components";
import {logo} from "@assets";
import { Box } from "@mui/material";

const useStyles = makeStyles()(theme => ({
    header: {
        width: "100%",
        height: 140,
        backgroundColor: theme.palette.primary.dark,
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    img: {
        width: 330,
        height: 46,
        marginLeft: theme.spacing(2)
    },
    inputContainer: {
        width: 400,
        marginLeft: "auto",
        position: "relative",
        marginRight: theme.spacing(6),
    },
    button: {
        top: 0,
        bottom: 0,
        right: theme.spacing(1),
        position: "absolute"
    },
    input: {
        width: "100%",
        maxWidth: 400,
        padding: 20,
        borderRadius: 30,
    }
}));

export const Footer: React.FC = () => {
    const {classes} = useStyles();
    return (
        <header className={classes.header}>
            <img className={classes.img} src={logo}></img>
            <Box className={classes.inputContainer}>
                <input className={classes.input} placeholder="Enter your email" name="footer-email" />
                <Button className={classes.button}
                    text="Subscribe">
            </Button>
            </Box>
        </header>
    )
}