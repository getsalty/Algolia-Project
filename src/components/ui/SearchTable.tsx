import React, { useState } from 'react';
import AlgoliaSearchBox from './AlgoliaSearchBox';
import AlgoliaIndicesTable from './AlgoliaIndicesTable';
import { trpc } from '~/utils/trpc';
import { useSession } from 'next-auth/react';

type Props = { title: string; onSelectionChanged: (value: string) => void; invalidValues?: string[] };

const IndexSearchTable = (props: Props) => {
  const { title, onSelectionChanged, invalidValues = [] } = props;
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
      <div className="mt-4 mb-6 flex flex-row align-middle">
        <div className="inline-flex align-middle grow items-center">
          <span className="ml-4 font-bold h-fit">{title}</span>
        </div>
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
