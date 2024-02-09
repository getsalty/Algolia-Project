import { signOut } from 'next-auth/react';
import Button from '../ui/Button';
import Algolia from './algolia';

export function LoggedIn() {
  return (
    <>
      <div className="middle my-5 text-center">
        <Button onClick={() => signOut()}>Logout</Button>
      </div>
      <Algolia />
    </>
  );
}
