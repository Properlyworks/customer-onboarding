
import React from "react";
import { makeStyles } from "@styling";
import { Button } from "@base-components";
import {logo} from "@assets";
import './Header.css';

const useStyles = makeStyles()(theme => ({
    header: {
        width: "100%",
        height: 100,
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
    button: {
        marginLeft: "auto",
        marginRight: theme.spacing(4)
    }
}));

export const Header: React.FC = () => {
    const {classes} = useStyles();
    return (
        <header className={classes.header}>
            <img className={classes.img } src={logo}></img>
            <Button className={classes.button}
                isLink={true} text="Visit Properly Works"
                href="https://properlyworks.com/">
            </Button>
        </header>
    )
}