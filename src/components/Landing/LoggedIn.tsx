import { trpc } from '~/utils/trpc';
import Button from '../ui/Button';
import { signOut, useSession } from 'next-auth/react';
import Select from '../ui/Select';
import { useMemo } from 'react';

export function LoggedIn() {
  const { data: session } = useSession();

  const { data: allIndices } = trpc.allIndices.useQuery(undefined, {
    enabled: !!session,
  });

  const indexName = !!allIndices ? allIndices[0]?.name : '' ?? '';
  const { data: allRules } = trpc.allRulesForIndexName.useQuery(indexName, {
    enabled: !!allIndices,
  });

  const indexOptions = useMemo(
    () => allIndices?.map((index) => ({ name: index.name, value: index.name })) ?? [],
    [allIndices],
  );

  // const ruleOptions = useMemo(
  //   () => allRules?.map((index) => ({ name: index., value: index.name })) ?? [],
  //   [allRules],
  // );

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
      <Select placeholder="Select Source Index" options={indexOptions} data-testid="select-source-index" />
      <Select placeholder="Select Source Index" options={indexOptions} data-testid="select-source-index" />
      <Select placeholder="Select Destination Index" options={indexOptions} data-testid="select-destination-index" />
    </>
  );
}
