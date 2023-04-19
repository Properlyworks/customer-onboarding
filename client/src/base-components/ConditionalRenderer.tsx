import { Box, type BoxProps } from '@mui/system';
import { ChildrenProps } from '@types';
import React, { Fragment } from 'react'

export type ConditionalRendererProps = BoxProps & ChildrenProps & {
    condition: boolean | null | undefined;
    fallbackComponent?: React.ComponentType;
    useBox?: boolean 
}

export const ConditionalRenderer: React.FC<ConditionalRendererProps> = ({
    children,
    condition,
    fallbackComponent: FallbackComponent = () => null,
    useBox = false,
    ...props
}) => {
    const Component = useBox ? Box : Fragment;       
    return condition ? <Component {...props}>{children}</Component> : <FallbackComponent />
}
