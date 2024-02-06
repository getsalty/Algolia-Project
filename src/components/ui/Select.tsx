import React from 'react';

type Props = { placeholder: string };

const Select = (props: Props) => {
  const { placeholder } = props;
  return (
    <div>
      <input
        list="brow"
        className="text-gray-800 p-4 rounded border-purple-700 border"
        placeholder={placeholder}
      />
      <datalist id="brow">
        <option value="Internet Explorer" />
        <option value="Firefox" />
        <option value="Chrome" />
        <option value="Opera" />
        <option value="Safari" />
      </datalist>
    </div>
  );
};

export default Select;
