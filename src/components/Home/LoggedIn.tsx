import { trpc } from '~/utils/trpc';
import Button from '../ui/Button';
import { signOut, useSession } from 'next-auth/react';
import Select from '../ui/Select';

export function LoggedIn() {
  const { data: session } = useSession();

  const { data: allIndices } = trpc.allIndices.useQuery(undefined, {
    enabled: !!session,
  });

  const indexName = !!allIndices ? allIndices[0]?.name : '' ?? '';
  const { data: allRules } = trpc.allRulesForIndexName.useQuery(indexName, {
    enabled: !!allIndices,
  });

  return (
    <>
      <h3 className="text-center text-xl font-bold">
        Welcome, {session?.user?.name}!<p>{session?.user?.email}</p>
      </h3>
      <div className="middle my-5 text-center">
        <Button onClick={() => signOut()}>Logout</Button>
      </div>
      {allIndices && <p>{JSON.stringify(allIndices)}</p>}
      <br />
      {allRules && <p>{JSON.stringify(allRules)}</p>}
      <br /> <br />
      <Select placeholder="Select Source Index" />
    </>
  );
}
