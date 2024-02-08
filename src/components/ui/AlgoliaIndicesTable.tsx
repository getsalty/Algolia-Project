import { Index } from 'algoliasearch';
import React from 'react';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
dayjs.extend(advancedFormat);
dayjs.extend(utc);

type Props = { data: Index[]; onClick: (indexName: string) => void };

const AlgoliaIndicesTable = (props: Props) => {
  const { data, onClick } = props;

  function onRowClick(this: string) {
    onClick(this);
  }

  return (
    <div className="overflow-x-auto whitespace-nowrap bg-white text-left  min-w-[1000px] sm:min-w-[600px] w-full">
      <table role="table" className="border-none w-full">
        <thead className="bg-gray-50 border-t border-b border-gray-200 font-normal select-none text-sm">
          <tr>
            <th className="px-[14px] py-[16px] font-normal">Index</th>
            <th className="px-[14px] py-[16px] font-normal text-right w-40">Last build</th>
            <th className="px-[14px] py-[16px] font-normal text-right w-24">Records</th>
          </tr>
        </thead>
        <tbody role="rowgroup" className="text-sm font-normal">
          {data.map((index) => (
            <tr
              key={index.name}
              role="row"
              className="border-b border-gray-100 cursor-pointer hover:bg-gray-50"
              onClick={onRowClick.bind(index.name)}
            >
              <td className="px-[14px] py-[16px]">
                <div className="flex flex-col items-start">
                  <span className="text-[#003dff] inline-flex items-center truncate">{index.name}</span>
                </div>
              </td>

              <td role="cell" className="align-top px-[14px] py-[16px] text-right text-sm">
                {dayjs.utc(index.updatedAt).fromNow(true)} ago
              </td>

              <td role="cell" className="px-[14px] py-[16px] text-right align-top">
                <span>{index.entries}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AlgoliaIndicesTable;
