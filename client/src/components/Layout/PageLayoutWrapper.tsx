import {makeStyles} from '@styling';
import React from 'react';

const useStyles = makeStyles()(() => ({
  afterHeader: {
    minHeight: 'calc(100vh - 240px)',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
}));

export const PageLayoutWrapper: React.FC<{children: React.ReactNode}> = ({children}) => {
  const {classes} = useStyles();
  return <div className={classes.afterHeader}>{children}</div>;
};
