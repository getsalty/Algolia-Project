import React from 'react';

type Props = { caption: string };

const IndexCard = (props: Props) => {
  const { caption } = props;

  return (
    <div className="p-2 w-32 border bg-stl-bg-accent-100 border-stl-border-accent-200 text-stl-text-accent-700 rounded-full shadow text-center align-middle whitespace-nowrap overflow-hidden overflow-ellipsis ">
      <span>{caption}</span>
    </div>
  );
};

export default IndexCard;
