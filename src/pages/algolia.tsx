import algoliasearch from 'algoliasearch';
import { useSession } from 'next-auth/react';
import singletonRouter from 'next/router';
import {
  Configure,
  DynamicWidgets,
  HierarchicalMenu,
  InstantSearch,
  Menu,
  RangeInput,
  RefinementList,
  SearchBox,
  ToggleRefinement,
} from 'react-instantsearch';
import { createInstantSearchRouterNext } from 'react-instantsearch-router-nextjs';
import { trpc } from '~/utils/trpc';

const client = algoliasearch('latency', '6be0576ff61c053d5f9a3225e2a90f76');

export default function Page() {
  const { data: session } = useSession();

  const { data: allIndices } = trpc.allIndices.useQuery(undefined, {
    enabled: !!session,
  });

  const indexName = !!allIndices ? allIndices[0]?.name : '' ?? '';

  return (
    <>
      <span>indexName:{indexName}</span>
      <InstantSearch
        searchClient={client}
        indexName="instant_search"
        routing={{ router: createInstantSearchRouterNext({ singletonRouter }) }}
      >
        <Configure ruleContexts={[]} />
        <div className="grid gap-2">
          <SearchBox placeholder="Search" autoFocus />
        </div>
      </InstantSearch>
    </>
  );
}
