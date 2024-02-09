import ContentContainer from './ContentContainer';

export function App(props: any) {
  return (
    // <ThemeProvider>
    <div className="w-full">
      <ContentContainer>{props.children}</ContentContainer>
    </div>
    // </ThemeProvider>
  );
}
