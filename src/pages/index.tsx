import { useSession } from 'next-auth/react';
import { LoggedOut } from '~/components/Landing/LoggedOut';
import { LoggedIn } from '~/components/Landing/LoggedIn';

const Landing = () => {
  const { data: session } = useSession();

  return !!session ? <LoggedIn /> : <LoggedOut />;
};
export default Landing;
