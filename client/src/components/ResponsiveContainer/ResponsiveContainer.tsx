import {makeStyles} from '@styling';
import {memo} from 'react-tracked';
import { Container } from '@mui/material';
import { ResponsiveContainerProps } from '@types';

const useStyles = makeStyles()(theme => ({
  root: Object.fromEntries(
    theme.breakpoints.keys.map(breakpoint => [
      theme.breakpoints.up(breakpoint),
      {
        paddingLeft: 12,
        paddingRight: 12,
      },
    ]),
  ),
}));

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = memo(
  ({children, className, isFixed = false, maxWidth = false, useGutter = false, ...rest}) => {
    const {classes, cx} = useStyles();
    const maxWidthProps = isFixed ? {fixed: isFixed} : {maxWidth};
    const newClassName = cx(
      {
        [classes.root]: useGutter,
      },
      className,
    );

    return (
      <>
        <span />
        <Container disableGutters className={newClassName} {...maxWidthProps} {...rest}>
          {children}
        </Container>
        <span />
      </>
    );
  },
);
