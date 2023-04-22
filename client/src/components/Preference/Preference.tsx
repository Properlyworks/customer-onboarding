import { ConditionalRenderer, Form, FormRadio } from '@base-components';
import { FormStateContext } from '@context';
import { Box } from '@mui/material';
import { makeStyles } from '@styling';
import produce from 'immer';
import React, { useContext, useEffect } from 'react'
import { useForm, useFormState } from 'react-hook-form';
import { Preferences as PreferencesType, PreferencesKeys } from '@types';

const useStyles = makeStyles()(theme => {
  const shared = {
    display: "flex",
    alignItems: "flex-start",
  };
  return {
    container: { ...shared, flexDirection: "column", gap: theme.spacing(2), padding: theme.spacing(2) },
    titleContainer: { ...shared, flexDirection: "column" , padding: theme.spacing(1)},
  }
});

export const Preference: React.FC<{ submitRef: React.MutableRefObject<null> }> = ({submitRef}) => {
  const { form, setForm } = useContext(FormStateContext);

  const formReturn = useForm({
    mode: 'onBlur',
    defaultValues: form.steps.preferences.value,
  });
  
  const {formState: {errors}, clearErrors} = formReturn
  const { isDirty } = useFormState({
      control: formReturn.control
  });

  useEffect(() => {
  setForm(
    produce((form) => {
      form.steps.preferences.dirty = isDirty;
    })
  );
}, [isDirty, setForm]);
  

const onSubmit = (value: PreferencesType) => {
  setForm(
    produce((formState) => {
      formState.steps.preferences = {
        value,
        valid: true,
        dirty: false,
      };
      formState.selectedIndex += 1;
    })
  );
}
  
const onChange = (value: string, name: PreferencesKeys) => {
  clearErrors(name);
  setForm(
    produce((formState) => {
      formState.steps.preferences.value[name] = value;
    })
  );
}

  const yesNo = ['Yes', 'No']

  const preferredMedium = ['Phone', 'Email', 'On-site visit']

  const { classes } = useStyles();
  
  return (
    <Form onSubmit={onSubmit} form={formReturn}>
      <Box className={classes.container}>
        <Box className={classes.titleContainer}>
          <h2>What are you looking for?</h2>
          <span>Please select an answer based on your needs.</span>
        </Box>
        <Box>
          <FormRadio required={"Field is required"} label="Do you need consulting?" options={yesNo} onChange={(value: string) => onChange(value, "needConsulting")}
            name="needConsulting" form={formReturn} defaultValue={form.steps.preferences.value.needConsulting} />
            <ConditionalRenderer condition={form.steps.preferences.value.needConsulting == yesNo[0]}>
              <FormRadio required={"Field is required"} label="Preferred Medium?" options={preferredMedium} onChange={(value: string) => onChange(value, "preferredMedium")}
              name="preferredMedium" form={formReturn} defaultValue={form.steps.preferences.value.preferredMedium} />
            </ConditionalRenderer>
        </Box>
      </Box>
      <button style={{ display: 'none' }} ref={submitRef} type="submit"></button>
      </Form>
  )
}
