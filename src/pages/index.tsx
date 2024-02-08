import { useSession } from 'next-auth/react';
import { LoggedOut } from '~/components/Landing/LoggedOut';
import { LoggedIn } from '~/components/Landing/LoggedIn';

const Landing = () => {
  const { data: session } = useSession();

  return (
    <div className="text-gray-900">
      !!session ? <LoggedIn /> : <LoggedOut />
    </div>
  );
};
export default Landing;
