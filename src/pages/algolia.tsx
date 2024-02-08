import algoliasearch from 'algoliasearch';
import { useSession } from 'next-auth/react';
import singletonRouter from 'next/router';
import { useRef, useState } from 'react';
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
import AlgoliaSearchBox from '~/components/ui/AlgoliaSearchBox';
import AlgoliaRuleTable from '~/components/ui/AlgoliaRuleTable';
import { trpc } from '~/utils/trpc';
import AlgoliaIndicesTable from '~/components/ui/AlgoliaIndicesTable';

const client = algoliasearch('latency', '6be0576ff61c053d5f9a3225e2a90f76');

export default function Page() {
  const { data: session } = useSession();

  const { data: allIndices } = trpc.allIndices.useQuery(undefined, {
    enabled: !!session,
  });

  const [filteredValue, setFilteredValue] = useState('');

  const [currentIndex, setCurrentIndex] = useState<string | null>(null);
  const [currentRules, setCurrentRules] = useState<string[] | null>(null);
  const [destinationIndex, setDestinationIndex] = useState<string | null>(null);

  const { data: allRules } = trpc.allRulesForIndexName.useQuery(currentIndex!, {
    enabled: !!allIndices && !!currentIndex,
  });

  const onChange = (value: string) => {
    setFilteredValue(value);
  };

  const onSourceIndexSelection = (value: string) => {
    setFilteredValue('');
    setCurrentIndex(value);
  };

  const onRuleSelection = (value: string[]) => {
    setCurrentRules(value);
  };

  const onDestinationIndexSelection = (value: string) => {
    setFilteredValue('');
    setDestinationIndex(value);
  };

  return (
    <>
      {currentIndex && <div>Current Index: {currentIndex}</div>}
      {currentRules && <div>Current Rules: {currentRules}</div>}
      {destinationIndex && <div>Destination Index: {destinationIndex}</div>}

      <div className="p-0 bg-white rounded-[3px] overflow-hidden shadow-[0_0_0_1px_rgba(35,38,59,.05),0_1px_3px_0_rgba(35,38,59,.15)] flex flex-col">
        <div className="grid gap-2">
          {!currentIndex && (
            <>
              <AlgoliaSearchBox onChange={onChange} />
              <AlgoliaIndicesTable
                data={allIndices?.filter((o) => o.name.includes(filteredValue)) ?? []}
                onClick={onSourceIndexSelection}
              />
            </>
          )}

          {currentIndex && !currentRules && (
            <AlgoliaRuleTable canSelectAll data={allRules ?? []} onSelection={onRuleSelection} />
          )}

          {currentIndex && currentRules && !destinationIndex && (
            <>
              <AlgoliaSearchBox onChange={onChange} />
              <AlgoliaIndicesTable
                data={allIndices?.filter((o) => o.name.includes(filteredValue) && o.name !== currentIndex) ?? []}
                onClick={onDestinationIndexSelection}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}
