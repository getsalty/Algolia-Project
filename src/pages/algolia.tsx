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
import IndexCard from '~/components/ui/IndexCard';
import IndexCardContainer from '~/components/ui/IndexCardContainer';
import RightArrow from '~/components/ui/RightArrow';
import IndexSearchTable from '~/components/ui/SearchTable';

const client = algoliasearch('latency', '6be0576ff61c053d5f9a3225e2a90f76');

export default function Page() {
  const { data: session } = useSession();

  const { data: allIndices } = trpc.allIndices.useQuery(undefined, {
    enabled: !!session,
  });

  const [currentIndex, setCurrentIndex] = useState<string | null>(null);
  const [currentRules, setCurrentRules] = useState<string[] | null>(null);
  const [destinationIndex, setDestinationIndex] = useState<string | null>(null);

  const { data: allRules } = trpc.allRulesForIndexName.useQuery(currentIndex!, {
    enabled: !!allIndices && !!currentIndex,
  });

  const onSourceIndexSelection = (value: string) => {
    setCurrentIndex(value);
  };

  const onRuleSelection = (value: string[]) => {
    setCurrentRules(value);
  };

  const onDestinationIndexSelection = (value: string) => {
    setDestinationIndex(value);
  };

  return (
    <div className="text-gray-900">
      <div className="mb-4 flex gap-2 align-middle items-center justify-center">
        <IndexCardContainer header="Source Index" currentStep={!currentIndex}>
          {currentIndex && <IndexCard caption={currentIndex} />}
        </IndexCardContainer>
        <RightArrow />
        <IndexCardContainer header="Rules" currentStep={!!currentIndex && !currentRules}>
          {currentRules && <IndexCard caption={currentRules.length.toString()} />}
        </IndexCardContainer>
        <RightArrow />
        <IndexCardContainer
          header="Destination Index"
          currentStep={!!currentIndex && !!currentRules && !destinationIndex}
        >
          {destinationIndex && <IndexCard caption={destinationIndex} />}
        </IndexCardContainer>
      </div>

      <div className="p-0 bg-white rounded-[3px] overflow-hidden shadow-[0_0_0_1px_rgba(35,38,59,.05),0_1px_3px_0_rgba(35,38,59,.15)] flex flex-col">
        <div className="grid gap-2">
          {!currentIndex && (
            <IndexSearchTable title="Select A Source Index" onSelectionChanged={onSourceIndexSelection} />
          )}

          {currentIndex && !currentRules && (
            <AlgoliaRuleTable canSelectAll data={allRules ?? []} onSelection={onRuleSelection} />
          )}

          {currentIndex && currentRules && !destinationIndex && (
            <IndexSearchTable
              title="Select A Destination Index"
              onSelectionChanged={onDestinationIndexSelection}
              invalidValues={[currentIndex]}
            />
          )}
        </div>
      </div>
    </div>
  );
}
