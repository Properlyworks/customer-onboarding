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