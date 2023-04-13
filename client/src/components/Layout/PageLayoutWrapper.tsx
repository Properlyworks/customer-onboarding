import {makeStyles} from '@styling';
import React from 'react';

const useStyles = makeStyles()(() => ({
  afterHeader: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
}));

export const PageLayoutWrapper: React.FC<{children: React.ReactNode}> = ({children}) => {
  const {classes} = useStyles();
  return <div className={classes.afterHeader}>{children}</div>;
};
