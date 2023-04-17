import React, { createContext, useState } from 'react'
import { MutiStepFormComponent } from "./MutiStepFormComponent";
import { FormStateContext } from '@context';
import { FORM_STATE } from '@constants';

export const MutliStepForm: React.FC = () => {
    const [form, setForm] = useState(FORM_STATE);
    return (
        <FormStateContext.Provider
        value={{
            form,
            setForm,
        }}
        >
        <MutiStepFormComponent/>
        </FormStateContext.Provider>
    )
}
