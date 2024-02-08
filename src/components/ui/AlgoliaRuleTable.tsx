import { Rule } from 'algoliasearch';
import React, { useState } from 'react';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import utc from 'dayjs/plugin/utc';
dayjs.extend(advancedFormat);
dayjs.extend(utc);

type Props = { canSelectAll: boolean; data: Rule[]; onSelection: (ruleObjectIds: string[]) => void };

const AlgoliaRuleTable = (props: Props) => {
  const { canSelectAll, data, onSelection } = props;

  const [checkedRules, setCheckedRules] = useState<string[]>([]);

  function onRowClick(this: string) {
    const newCheckedRules = checkedRules.some((rule) => rule === this)
      ? checkedRules.filter((rule) => rule !== this)
      : [...checkedRules, this];

    setCheckedRules(newCheckedRules);
  }

  function onTransferClick() {
    onSelection(checkedRules);
  }

  return (
    <div className="overflow-x-auto whitespace-nowrap bg-white min-w-[1000px] sm:min-w-[600px] w-full">
      <div className="my-4 flex flex-row align-middle">
        <div className="inline-flex align-middle grow items-center">
          <span className="ml-4 font-bold h-fit">Select Roles To Transfer</span>
        </div>
        <button
          title="Select at least one rule to transfer"
          type="button"
          onClick={onTransferClick}
          disabled={checkedRules.length === 0}
          className="mr-4 inline-flex rounded-[3px] justify-center items-center px-3 text-sm font-normal typo-display-body h-8 bg-[linear-gradient(-180deg,#003dff,#022eb9)] border-[#022eb9] border-solid border-l shadow btn-primary cursor-pointer disabled:bg-[linear-gradient(-180deg,#d5d6d8,#bfbfc2)] disabled:border-[#bfbfc2] disabled:cursor-default"
        >
          <span className="whitespace-nowrap px-1 text-white">Transfer</span>
        </button>
      </div>
      <table role="table" className="border-none w-full">
        <thead className="bg-gray-50 border-t border-b border-gray-200">
          <tr role="row">
            {canSelectAll && (
              <th colSpan={1} role="columnheader" className="p-3 text-left font-normal w-3">
                <span className="flex space-x-2">
                  <span>
                    <div className="flex">
                      <div className="group/checkbox inline-flex items-center">
                        <span className="checkbox">
                          {/* <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="lucide lucide-check checkbox-icon"
                          >
                            <path d="M20 6 9 17l-5-5"></path>
                          </svg>
                          <input
                          title="Toggle All Rows Selected"
                          aria-checked="false"
                          id="stszep"
                          className="cursor-pointer  opacity-0 absolute inset-0"
                          type="checkbox"
                        /> */}
                        </span>
                      </div>
                    </div>
                  </span>
                </span>
              </th>
            )}
            <th colSpan={1} role="columnheader" className="p-3 text-left font-normal select-none text-sm">
              <span className="flex space-x-2">
                <span>Conditions</span>
              </span>
            </th>
            <th colSpan={1} role="columnheader" className="p-3 text-left font-normal select-none text-sm">
              <span className="flex space-x-2">
                <span>Consequences</span>
              </span>
            </th>
            <th colSpan={1} role="columnheader" className="p-3 text-left font-normal select-none text-sm">
              <span className="flex space-x-2">
                <span>Last Update (UTC)</span>
              </span>
            </th>
          </tr>
        </thead>
        <tbody role="rowgroup" className="text-sm font-normal">
          {data.map((rule) => (
            <tr
              key={rule.objectID}
              role="row"
              className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer select-none"
              onClick={onRowClick.bind(rule.objectID)}
            >
              <td role="cell" className="align-top py-4 px-3">
                <div className="flex w-5 pt-1">
                  <div className="group/checkbox inline-flex items-center">
                    <span className="border-current stl-checkbox">
                      {checkedRules.includes(rule.objectID) && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-check checkbox-icon"
                        >
                          <path d="M20 6 9 17l-5-5"></path>
                        </svg>
                      )}
                      <input
                        title="Toggle Row Selected"
                        aria-checked={checkedRules.includes(rule.objectID)}
                        id="w4scm"
                        className="cursor-pointer opacity-0 absolute inset-0"
                        type="checkbox"
                      />
                    </span>
                  </div>
                </div>
              </td>

              <td role="cell" className="align-top py-4 px-3">
                {rule.conditions?.map((condition, index) => (
                  <div key={'condition' + index + rule.objectID} className="mb-2">
                    <div className="flex-grid-inner flex flex-grid-sm flex-col items-start justify-start">
                      <div className="">
                        <div className="flex-grid-inner flex flex-grid-sm flex-col items-start justify-start">
                          <div className="">
                            <div className="flex-grid-inner flex flex-grid-sm flex-col items-start justify-start">
                              <div className="">
                                <div className="flex-grid-inner flex flex-wrap flex-grid-sm flex-row items-center justify-start gap-1">
                                  <span className="shrink-0">
                                    {index > 0 && 'or '}Query {condition.anchoring}
                                  </span>
                                  <span className="inline-flex items-center justify-center rounded-full border overflow-hidden bg-stl-bg-blue-100 border-stl-border-blue-200 text-stl-text-blue-800 h-6 px-2 space-x-2 max-w-3xl">
                                    <span className="truncate">
                                      <div className="truncate">
                                        <span>{condition.pattern}</span>
                                      </div>
                                    </span>
                                  </span>
                                </div>
                              </div>
                              {condition.alternatives && (
                                <p className="display-caption text-xs  text-[#5a5e9a] mt-2 flex items-center">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    className="lucide lucide-check-circle mr-2"
                                  >
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                    <path d="m9 11 3 3L22 4"></path>
                                  </svg>
                                  Apply to plurals, synonyms and typos.
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </td>

              <td role="cell" className="align-top py-4 px-3 text-sm flex flex-col font-normal gap-4">
                {!!rule.consequence?.promote && (
                  <div className="flex flex-col gap-2">
                    {rule.consequence.promote.map((value, index) => (
                      <div key={'promote' + index + rule.objectID} className="">
                        <div className="flex-grid-inner flex flex-grid-sm flex-col items-start justify-start">
                          <div className="">
                            <div className="flex-grid-inner flex flex-grid-sm flex-row items-center justify-start">
                              <span>Pin</span>
                              <span className="mx-2 inline-flex items-center justify-center rounded-full border overflow-hidden  bg-stl-bg-accent-100 border-stl-border-accent-200 text-stl-text-accent-700  h-6 display-body px-2 space-x-2 shrink">
                                <span>
                                  <picture className="border border-stl-border-grey-300 flex items-center justify-center rounded-full w-4 h-4"></picture>
                                </span>
                                <span className="truncate">
                                  <span>{!!('objectID' in value) ? value.objectID : value.objectIDs}</span>
                                </span>
                              </span>
                              <span>to position</span>
                              <span className="mx-2 inline-flex items-center justify-center rounded-full border overflow-hidden  bg-stl-bg-accent-100 border-stl-border-accent-200 text-stl-text-accent-700  h-6 display-body px-2 space-x-2">
                                <span className="truncate">{value.position + 1}</span>
                              </span>
                            </div>
                          </div>
                        </div>
                        {index == rule.consequence!.promote!.length - 1 && (
                          <p className="display-caption text-xs  text-[#5a5e9a] mt-2 flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              className="lucide lucide-check-circle mr-2"
                            >
                              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                              <path d="m9 11 3 3L22 4"></path>
                            </svg>
                            Pinned items must match active filters to be displayed.
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {!!rule.consequence?.hide && (
                  <div>
                    {rule.consequence.hide.map((value, index) => (
                      <div key={'hide' + index + rule.objectID} className="">
                        <div className="flex-grid-inner flex flex-grid-sm flex-col items-start justify-start">
                          <div className="">
                            <div className="flex-grid-inner flex flex-grid-sm flex-row items-center justify-start">
                              <span>Hide</span>
                              <span className="ml-2 inline-flex items-center justify-center rounded-full border overflow-hidden bg-stl-bg-accent-100 border-stl-border-accent-200 text-stl-text-accent-700  h-6 display-body px-2 space-x-2 shrink">
                                <span>
                                  <picture className="border border-stl-border-grey-300 flex items-center justify-center rounded-full w-4 h-4"></picture>
                                </span>
                                <span className="truncate">
                                  <span>{value.objectID}</span>
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {!!rule.consequence?.params?.query && typeof rule.consequence?.params?.query === 'string' && (
                  <div>
                    <div className="flex-grid-inner flex flex-grid-sm flex-col items-start justify-start">
                      <div className="">
                        <div className="flex-grid-inner flex flex-wrap flex-grid-sm flex-row items-center justify-start">
                          <span>Replace query with</span>
                          <span
                            title="phone"
                            className="ml-2 inline-flex items-center justify-center rounded-full border overflow-hidden  bg-stl-bg-accent-100 border-stl-border-accent-200 text-stl-text-accent-700  h-6 display-body px-2 space-x-2 max-w-48"
                          >
                            <span className="truncate">
                              <span>{rule.consequence.params.query}</span>
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {!!rule.consequence?.params?.query &&
                  typeof rule.consequence.params.query !== 'string' &&
                  rule.consequence.params.query.edits && (
                    <div className="flex flex-col gap-4">
                      {rule.consequence.params.query.edits
                        .map((e) => e)
                        .sort((a, b) => {
                          const valueMap = {
                            remove: 2,
                            replace: 1,
                            null: 0,
                          };
                          return valueMap[b.type ?? 'null'] - valueMap[a.type ?? 'null'];
                        })
                        .map((value, index) => (
                          <div key={'hide' + index + rule.objectID} className="">
                            <div className="flex-grid-inner flex flex-grid-sm flex-col items-start justify-start">
                              <div className="">
                                <div className="flex-grid-inner flex flex-wrap flex-grid-sm flex-row items-center justify-start">
                                  <span>
                                    {value.type?.charAt(0).toUpperCase() ?? ''}
                                    {value.type?.slice(1) ?? ''} word
                                  </span>
                                  <span
                                    title="phone"
                                    className="mx-2 inline-flex items-center justify-center rounded-full border overflow-hidden  bg-stl-bg-accent-100 border-stl-border-accent-200 text-stl-text-accent-700  h-6 display-body px-2 space-x-2 max-w-48"
                                  >
                                    <span className="truncate">
                                      <span>{value.delete}</span>
                                    </span>
                                  </span>
                                  {!!value.insert && (
                                    <>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="12"
                                        height="12"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        className="lucide lucide-arrow-right "
                                      >
                                        <path d="M5 12h14"></path>
                                        <path d="m12 5 7 7-7 7"></path>
                                      </svg>
                                      <span
                                        title="tablet"
                                        className="mx-2 inline-flex items-center justify-center rounded-full border overflow-hidden  bg-stl-bg-accent-100 border-stl-border-accent-200 text-stl-text-accent-700  h-6 display-body px-2 space-x-2 max-w-48"
                                      >
                                        <span className="truncate">
                                          <span>{value.insert}</span>
                                        </span>
                                      </span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}

                {!!rule.consequence?.userData && (
                  <div className="flex-grid-inner flex flex-grid-sm flex-col items-start justify-start">
                    <div className="">
                      <div className="flex-grid-inner flex flex-grid-sm gap-1 flex-row items-center justify-start">
                        <span>Return Custom Data</span>
                        <span
                          data-state="closed"
                          className="inline-flex items-center justify-center rounded-full border overflow-hidden bg-stl-bg-accent-100 border-stl-border-accent-200 text-stl-text-accent-700 h-6 px-2 space-x-2 max-w-[8rem] cursor-default"
                        >
                          <span className="truncate">{JSON.stringify(rule.consequence?.userData)}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </td>

              <td role="cell" className="align-top py-4 px-3">
                <div className="">
                  <div className="flex-grid-inner flex flex-grid-sm flex-row items-center justify-start">
                    {!!rule._metadata && (
                      <span>{dayjs.utc(rule._metadata.lastUpdate * 1000).format('MMM Do YYYY, hh:mma')}</span>
                    )}
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AlgoliaRuleTable;
