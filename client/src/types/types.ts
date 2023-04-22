import { FORM_STATE } from "@constants";

export declare type ChildrenProps = {
    children: React.ReactNode;
};
export declare type StyleProps = {
    className?: string;
    style?: React.CSSProperties;
};
export type Breakpoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ResponsiveContainerProps = ChildrenProps &
  StyleProps & {
    isFixed?: boolean;
    maxWidth?: Breakpoints | false;
    useGutter?: boolean;
};
export type FormBaseProps = {
    className?: string,
    defaultValue?: boolean | string | readonly string[] | number;
    label?: string;
    labelComponent?: React.FC;
    name: string;
    onChange?: (value: unknown) => void;
    shouldUnregister?: boolean;
    required?: boolean;
    wrapper?: React.JSXElementConstructor<{ children: React.ReactElement }>;
};

export type LabelValue = {
    label: string,
    value: string
}

export declare type ContactDetailsKeys = keyof typeof FORM_STATE.steps.contactDetails.value
export declare type ContactDetails = typeof FORM_STATE.steps.contactDetails.value
export declare type PreferencesKeys = keyof typeof FORM_STATE.steps.preferences.value
export declare type Preferences = typeof FORM_STATE.steps.preferences.value

export declare type ValidationRules = {
    required: string | boolean
}

export declare type Question = {
    id: string;
    type: string;
    label: string;
    value: string;
    options?: string[];
    rules?: ValidationRules;
}