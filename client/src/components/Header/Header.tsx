
import React from "react";
import { makeStyles } from "@styling";
import { Button } from "@base-components";
import logo from "@assets";
import './Header.css';

const useStyles = makeStyles()(theme => ({
    header: {
        width: "100%",
        height: "70px",
        backgroundColor: theme.palette.primary.dark,
        display: "flex",
        flexDirection: "row",
        position: "absolute",
        alignItems: "center"
    },
    img: {
        width: "330px",
        height: "46px",
        marginLeft: theme.spacing(2)
    },
    button: {
        marginLeft: "auto",
    }
}));

export const Header: React.FC = () => {
    const {classes} = useStyles();
    return (
        <header className={classes.header}>
            <img className={classes.img } src={logo}></img>
            <Button className={classes.button}
                isLink={false} text="Visit Properly Works"
                href="https://properlyworks.com/">
            </Button>
        </header>
    )
}