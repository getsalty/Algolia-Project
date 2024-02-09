import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import AlgoliaRuleTable from '~/components/ui/Algolia/AlgoliaRuleTable';
import { trpc } from '~/utils/trpc';
import IndexCard from '~/components/ui/IndexCard';
import IndexCardContainer from '~/components/ui/IndexCardContainer';
import RightArrow from '~/components/ui/RightArrow';
import IndexSearchTable from '~/components/ui/SearchTable';
import Spinner from '~/components/ui/Spinner';
import Success from '../ui/Success';

const Algolia = () => {
  const { data: session } = useSession();

  const { data: allIndices } = trpc.allIndices.useQuery(undefined, {
    enabled: !!session,
  });

  const { mutate: addRulesToIndex, isPending, isSuccess, isError, error } = trpc.addRulesToIndex.useMutation();

  const [currentIndex, setCurrentIndex] = useState<string | null>(null);
  const [currentRules, setCurrentRules] = useState<string[] | null>(null);
  const [destinationIndex, setDestinationIndex] = useState<string | null>(null);

  const { data: allRules } = trpc.allRulesForIndexName.useQuery(currentIndex!, {
    enabled: !!allIndices && !!currentIndex,
  });

  const onSourceIndexSelection = (value: string) => {
    setCurrentIndex(value);
    window.scrollTo(0, 0);
  };

  const onRuleSelection = (value: string[]) => {
    setCurrentRules(value);
    window.scrollTo(0, 0);
  };

  const onDestinationIndexSelection = (value: string) => {
    setDestinationIndex(value);
    window.scrollTo(0, 0);

    if (!!currentIndex && !!value && !!currentRules) {
      addRulesToIndex({
        sourceIndexName: currentIndex,
        destinationIndexName: value,
        ruleObjectIDs: currentRules,
      });
    }
  };

  const onRuleBackClick = () => {
    setCurrentIndex(null);
  };

  const onDestinationBackClick = () => {
    setCurrentRules(null);
  };

  useEffect(() => {
    if (isSuccess && destinationIndex) {
      setTimeout(() => {
        setCurrentIndex(null);
        setCurrentRules(null);
        setDestinationIndex(null);
      }, 2000);
    }
  }, [isSuccess, destinationIndex]);

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

      {!destinationIndex ? (
        <div className="p-0 bg-white rounded-[3px] overflow-hidden shadow-[0_0_0_1px_rgba(35,38,59,.05),0_1px_3px_0_rgba(35,38,59,.15)] flex flex-col">
          <div className="grid gap-2">
            {!currentIndex && (
              <IndexSearchTable title="Select A Source Index" onSelectionChanged={onSourceIndexSelection} />
            )}

            {currentIndex && !currentRules && (
              <AlgoliaRuleTable
                canSelectAll
                data={allRules ?? []}
                onSelection={onRuleSelection}
                onBackClick={onRuleBackClick}
              />
            )}

            {currentIndex && currentRules && !destinationIndex && (
              <IndexSearchTable
                title="Select A Destination Index"
                onSelectionChanged={onDestinationIndexSelection}
                invalidValues={[currentIndex]}
                onBackClick={onDestinationBackClick}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center mt-8">
          {isPending && <Spinner />}
          {isSuccess && <Success />}
          {isError && (
            <div>
              <p>
                <h3>Error</h3>
              </p>
              <span>{error.message}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Algolia;
