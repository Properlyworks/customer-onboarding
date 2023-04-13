import useScrollbarSize from 'react-scrollbar-size';
import {useWindowSize} from 'rooks';
import {makeStyles, useTheme} from '@styling';
import type {ChildrenProps} from '@types';
import {ResponsiveContainer} from '@components';

const useStyles = makeStyles<{width: number}>()((theme, {width}) => ({
  root: {
    minWidth: theme.breakpoints.values.sm,
    [theme.breakpoints.only('xs')]: {
      zoom: `${width / theme.breakpoints.values.sm}`,
      MozTransform: `scale(${width / theme.breakpoints.values.sm})`,
      MozTransformOrigin: '0 0',
    },
  },
}));

export type ResponsiveContainerMinWidthProps = ChildrenProps;

/**
 * Uses the smallest breakpoint as the min-width for the container. Also scales the container to to always look like
 * the smallest breakpoint for its min-width so that the screen looks consistent when under the smallest breakpoint.
 */
export const ResponsiveContainerMinWidth: React.FC<ResponsiveContainerMinWidthProps> = ({
  children,
}) => {
  const {innerWidth: viewportWidth} = useWindowSize();
  const {width: scrollbarWidth} = useScrollbarSize();
  const theme = useTheme();
  const width = (viewportWidth ?? theme.breakpoints.values.sm) - scrollbarWidth;
  // Only get the new width value if and only if it is less than the SM breakpoint
  const deBouncedWidth = width < theme.breakpoints.values.sm ? width : theme.breakpoints.values.sm;
  const {classes} = useStyles({width: deBouncedWidth});

  return <ResponsiveContainer className={classes.root}>{children}</ResponsiveContainer>;
};
