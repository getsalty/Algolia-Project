import useMediaQuery from '~/utils/useMediaQuery';

type Props = { children: JSX.Element[] | JSX.Element };

const ContentContainer = (props: Props) => {
  const isDesktop = useMediaQuery('(min-width: 640px)');

  return (
    <div
      className="m-0 mt-16 overflow-y-scroll sm:mt-20"
      style={{ height: `calc(100vh - ${isDesktop ? '5' : '4'}rem)` }}
    >
      <div className="m-0 flex flex-col items-center justify-center">
        {props.children}
      </div>
    </div>
  );
};

export default ContentContainer;
