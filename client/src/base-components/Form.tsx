
import { ChildrenProps } from "@types"
import { FormEvent } from "react"
import { FieldValues, FormProvider, UseFormReturn } from "react-hook-form"

type FormProps<T extends FieldValues> = ChildrenProps & {
    onSubmit: (data: T) => void,
    form: UseFormReturn<T>
}

const formSubmit = <T extends FieldValues>(
    onSubmit: (data: T) => void,
    form: UseFormReturn<T>
) => async (event: FormEvent) => {
    event.preventDefault();
    const isValid = form.trigger();
    await form.handleSubmit(onSubmit)();
}
 
export const Form = <T extends FieldValues>({
    children,
    onSubmit,
    form,
}: FormProps<T>) => {
    const { handleSubmit } = form;
    return (<FormProvider {...(form as UseFormReturn<T>)}>
        <form onSubmit={formSubmit(onSubmit,form)}>
            {children}
        </form>
    </FormProvider>)
}
