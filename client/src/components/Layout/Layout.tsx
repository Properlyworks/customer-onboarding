import {ResponsiveContainerMinWidth} from '@components';
import {makeStyles} from '@styling';
import {type ChildrenProps} from '@types';
import {ScrollToElement} from '@base-components';
import {Header} from '@components';
import { PageLayoutWrapper } from './PageLayoutWrapper';
import { useScroll } from '@hooks';

const useStyles = makeStyles()(theme => ({
  content: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.common.white,
    alignItems: 'center'
  },
}));

/**
 * Wrapper component around all pages. Contains the navigation header and composes the children as the page body.
 *
 * @param children the children to wrap for the layout
 * @returns a wrapped page body with header navigation
 */
export const Layout: React.FC<ChildrenProps> = ({children}) => {
  const topScroll = useScroll<HTMLDivElement>();
  const contentScroll = useScroll<HTMLDivElement>();
  const footerScroll = useScroll<HTMLDivElement>();
  const {classes} = useStyles();

  return (
    <ResponsiveContainerMinWidth>
        <ScrollToElement
          text='Skip to main content'
          onClick={() => contentScroll.executeScroll()}
        />
        <ScrollToElement text='Skip to footer' onClick={() => footerScroll.executeScroll()} />
        <Header />
        <PageLayoutWrapper>
          <div ref={contentScroll.ref} className={classes.content} id='content'>
            {children}
          </div>
          <div ref={footerScroll.ref} id='footer'>
          </div>
        </PageLayoutWrapper>
    </ResponsiveContainerMinWidth>
  );
};
