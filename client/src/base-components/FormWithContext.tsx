
import { ChildrenProps } from "@types"
import { FieldValues, FormProvider, UseFormReturn } from "react-hook-form"

type FormProps<T extends FieldValues> = ChildrenProps & {
    onSubmit: (data: T) => void,
    form: UseFormReturn<T>
}
 
export const Form = <T extends FieldValues>({
    children,
    form
}: FormProps<T>) => {
    <FormProvider {...(form as UseFormReturn<T>)}>
        {children}
    </FormProvider>
}

export default Form 