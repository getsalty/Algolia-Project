import colors from '../utils/colors';
import UserBadge from '~/components/ui/UserBadge';

type HeaderBarProps = {};

const HeaderBar = (props: HeaderBarProps) => {
  return (
    <header
      className=" fixed top-0 left-auto right-0 z-[1251] box-border flex w-full flex-col bg-red-500 text-white transition-shadow"
      style={{
        boxShadow:
          '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
      }}
    >
      <div className="flex min-h-[40px] items-center px-4 sm:min-h-[64px] sm:px-6 ">
        <div
          className="m-0 ml-6 flex grow text-2xl font-medium tracking-[0.12rem] no-underline md:font-[550] text-center"
          style={{
            fontFamily: `'Lobster', cursive`,
            textShadow: `-1px 1px 0 ${colors.textOutline}, 1px 1px 0 ${colors.textOutline},1px -1px 0 ${colors.textOutline},-1px -1px 0 ${colors.textOutline}`,
          }}
        >
          <span className="grow">Algolia Project</span>
        </div>
        <UserBadge />
      </div>
    </header>
  );
};

export default HeaderBar;
