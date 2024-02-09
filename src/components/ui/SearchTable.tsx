import React, { useState } from 'react';
import AlgoliaSearchBox from './Algolia/AlgoliaSearchBox';
import AlgoliaIndicesTable from './Algolia/AlgoliaIndicesTable';
import { trpc } from '~/utils/trpc';
import { useSession } from 'next-auth/react';

type Props = {
  title: string;
  onSelectionChanged: (value: string) => void;
  invalidValues?: string[];
  onBackClick?: () => void;
};

const IndexSearchTable = (props: Props) => {
  const { title, onSelectionChanged, invalidValues = [], onBackClick } = props;
  const { data: session } = useSession();

  const { data: allIndices } = trpc.allIndices.useQuery(undefined, {
    enabled: !!session,
  });

  const [filteredValue, setFilteredValue] = useState('');

  const onChange = (value: string) => {
    setFilteredValue(value);
  };

  const onTableClick = (indexName: string) => {
    setFilteredValue('');
    onSelectionChanged(indexName);
  };

  return (
    <div>
      <div className="mt-4 mb-6 flex flex-row align-middle select-none">
        {onBackClick && (
          <button
            title="Go Back"
            type="button"
            onClick={onBackClick}
            className="ml-4 inline-flex rounded-[3px] justify-center items-center px-3 text-sm font-normal h-8 bg-[linear-gradient(-180deg,#003dff,#022eb9)] border-[#022eb9] border-solid border-l shadow btn-primary cursor-pointer disabled:bg-[linear-gradient(-180deg,#d5d6d8,#bfbfc2)] disabled:border-[#bfbfc2] disabled:cursor-default"
          >
            <span className="whitespace-nowrap px-1 text-white">Back</span>
          </button>
        )}
        <div className="inline-flex align-middle grow items-center justify-center">
          <span className="font-bold h-fit">{title}</span>
        </div>
        {onBackClick && (
          <button type="button" className="mr-4 inline-flex invisible items-center px-3 text-sm font-normal h-8">
            <span className="whitespace-nowrap px-1 text-white">Back</span>
          </button>
        )}
      </div>
      <div className="mt-4 mb-2 flex align-middle items-center flex-col">
        <div className="w-[80%]">
          <AlgoliaSearchBox onChange={onChange} />
        </div>
      </div>
      <AlgoliaIndicesTable
        data={allIndices?.filter((o) => o.name.includes(filteredValue) && !invalidValues.includes(o.name)) ?? []}
        onClick={onTableClick}
      />
    </div>
  );
};

export default IndexSearchTable;
