import {Button} from '@base-components';
import {makeStyles} from '@styling';

const useStyles = makeStyles()(theme => ({
  skipLink: {
    position: 'absolute',
    boxShadow: theme.shadows[2],
    top: -9999,
    left: -9999,
    zIndex: -9999,
    '&:focus,&:active': {
      top: 20,
      left: 20,
      zIndex: 9999,
    },
  },
}));

export type ScrollToElementProps = {
  onClick: () => void;
  text: string;
};

export const ScrollToElement: React.FC<ScrollToElementProps> = ({onClick, text}) => {
  const {classes} = useStyles();

  return (
    <Button className={classes.skipLink} text={text} onClick={onClick}>
      {text}
    </Button>
  );
};
