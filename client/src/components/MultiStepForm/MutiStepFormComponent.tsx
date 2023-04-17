import { Box } from '@mui/material';
import { makeStyles } from '@styling';
import { StepContainer,ContactDetails, Budget, Review, Preference} from '@components';
import produce from 'immer';
import React, { useCallback, useContext } from 'react'
import { FormStateContext } from '@context'

export const MutiStepFormComponent: React.FC = () => {

    const useStyles = makeStyles()(theme => ({
        container: {
            borderRadius: 25,
            alignItems: "center",
            textAlign: "center",
            minHeight: theme.spacing(70),
            maxWidth: theme.spacing(95),
            width: `calc(100% - ${theme.spacing(4)})`,
            border: `1px solid ${theme.palette.grey[200]}`,
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            margin: theme.spacing(3),
            padding: theme.spacing(2,4)
        },
    }
    ));
    
    const { form, setForm } = useContext(FormStateContext);

    const next = useCallback(() => {
        setForm(
        produce((form) => {
            form.selectedIndex += 1;
        })
        );
    }, [setForm]);

    const prev = useCallback(() => {
        setForm(
        produce((form) => {
            form.selectedIndex -= 1;
        })
        );
    }, [setForm]);

    const setSelectedIndex = useCallback(
        (index: number) => {
        setForm(
            produce((form) => {
            form.selectedIndex = index;
            })
        );
        },
        [setForm]
    );

    const selectedIndex = form.selectedIndex;
    const { classes } = useStyles();
    return (
        <Box className={classes.container}>
            <StepContainer />
            {selectedIndex == 0 && <ContactDetails />}
            {selectedIndex == 1 && <Preference />}
            {selectedIndex == 2 && <Budget />}
            {selectedIndex == 3 && <Review/>}
        </Box>
    )
}
