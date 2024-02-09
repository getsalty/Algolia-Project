import React, { ReactNode } from 'react';

type Props = { header: string; children: ReactNode; currentStep: boolean };

const IndexCardContainer = (props: Props) => {
  const { children, header, currentStep } = props;

  return (
    <div className={currentStep ? 'dashed-border' : ''}>
      <div className="select-none flex items-center h-18 w-40 border rounded-[3px] flex-col justify-center bg-white shadow-[0_0_0_1px_rgba(35,38,59,.05),0_1px_3px_0_rgba(35,38,59,.15)]">
        <span className="border-b border-gray-200  w-full text-center bg-gray-50 text-sm font-normal">{header}</span>
        <div className="flex items-center h-14 w-40 flex-col justify-center">{children}</div>
      </div>
    </div>
  );
};

export default IndexCardContainer;
