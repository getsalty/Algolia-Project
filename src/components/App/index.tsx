import { useEffect } from 'react';
import HeaderBar from './HeaderBar';
import colors from '../utils/colors';
import ContentContainer from './ContentContainer';
import useMediaQuery, { BreakPoint } from '~/utils/useMediaQuery';

export function App(props: any) {
  useEffect(() => {
    document.body.style.backgroundColor = colors.background;
  }, []);
  const matches = useMediaQuery(BreakPoint.sm.up);

  return (
    // <ThemeProvider>
    <>
      <HeaderBar />

      <ContentContainer>
        <span>{matches ? 'Big' : 'Small'}</span>
        {props.children}
      </ContentContainer>
    </>
    // </ThemeProvider>
  );
}
