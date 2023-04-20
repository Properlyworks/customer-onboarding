import { Box } from '@mui/material';
import { makeStyles } from '@styling';
import { StepContainer,ContactDetails, Budget, Review, Preference} from '@components';
import produce from 'immer';
import React, { useCallback, useContext, useRef } from 'react'
import { FormStateContext } from '@context'
import { Button, ConditionalRenderer } from '@base-components';
import { FORM_STEPS } from '@constants';
import { fireClick } from '@utils';

export const MutiStepFormComponent: React.FC = () => {

    const useStyles = makeStyles()(theme => ({
        container: {
            borderRadius: 25,
            minHeight: theme.spacing(70),
            maxWidth: "fit-content",
            border: `1px solid ${theme.palette.grey[200]}`,
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            margin: theme.spacing(3),
            marginBottom: theme.spacing(2),
            padding: theme.spacing(2, 4),
            [theme.breakpoints.up('lg')]: {
                maxWidth: theme.spacing(100),
            }
        },
        buttonContainer: {
            display: 'flex',
            margin: theme.spacing(3),
            "& > div > button > p": {
                padding: theme.spacing(0.5, 5),
                fontSize: theme.spacing(2),
            }
        },
        nextButton: {
            marginLeft: "auto"
        }
    }
    ));
    
    const { form, setForm } = useContext(FormStateContext);

    const formRefs = {[FORM_STEPS[0].label] : useRef(null), [FORM_STEPS[0].label]: useRef(null)};

    const prev = useCallback(() => {
        setForm(
            produce((form) => {
                form.selectedIndex -= 1;
            })
        );
    }, [setForm]);

    const selectedIndex = form.selectedIndex;
    
    const next = () => fireClick(formRefs[FORM_STEPS[selectedIndex]?.label]?.current) 

    const { classes } = useStyles();
    return (
        <Box>
            <Box className={classes.container}>
                <StepContainer />
                {selectedIndex == 0 && <ContactDetails submitRef={formRefs[0]} />}
                {selectedIndex == 1 && <Preference />}
                {selectedIndex == 2 && <Budget />}
                {selectedIndex == 3 && <Review/>}
            </Box>
            <Box className={classes.buttonContainer}>
                <ConditionalRenderer condition={selectedIndex > 0}>
                    <Button onClick={ prev} isSecondary text="Previous"></Button>
                </ConditionalRenderer>
                <ConditionalRenderer condition={selectedIndex < FORM_STEPS.length - 1}>
                    <Button onClick={ next} className={classes.nextButton} text="Next"> </Button>
                </ConditionalRenderer>
            </Box>
        </Box>
    )
}
