import { useSession } from 'next-auth/react';
import { LoggedOut } from '~/components/Home/LoggedOut';
import { LoggedIn } from '~/components/Home/LoggedIn';
import { trpc } from '~/utils/trpc';

const Landing = () => {
  const { data: session } = useSession();

  return <div>{session ? <LoggedIn /> : <LoggedOut />}</div>;
};
export default Landing;
