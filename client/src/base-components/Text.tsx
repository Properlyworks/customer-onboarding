import React from 'react';
import parse from 'html-react-parser';

const variantMaping: any = {
    p: <p></p>,
    h1: <h1></h1>
}

export type TextProps = {
    variant?: string;
    overideClassName?: string;
    children?: React.ReactElement;
}

export const Text: React.FC<TextProps> = ({variant = 'p',overideClassName,children, ...props}) => {
    const Component = variantMaping[variant];
    const jsxChildren = typeof children === 'string' ? parse(children) : children;
    return (
        <Component className={overideClassName} {...props} children={ jsxChildren} />
    );
}
