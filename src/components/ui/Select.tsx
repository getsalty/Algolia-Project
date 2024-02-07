import React, { FormEvent, MouseEvent, useRef, useState } from 'react';

type Option = {
  name: string;
  value: string;
};

type Props = { 'data-testid': string; placeholder: string; options: Option[] };

const Select = (props: Props) => {
  const { placeholder, options } = props;

  const [placeholderValue, setPlaceholderValue] = useState<string>(placeholder);
  const [currentValue, setCurrentValue] = useState<string>('');
  const onHoldValue = useRef<string>(currentValue);

  const onClick = () => {
    if (currentValue) {
      setPlaceholderValue(currentValue);
    }

    onHoldValue.current = currentValue;
    setCurrentValue('');
  };

  const onInput = (event: FormEvent<HTMLInputElement>) => {
    setCurrentValue(event.currentTarget.value);
  };

  const onBlur = () => {
    if (onHoldValue.current) {
      setCurrentValue(onHoldValue.current);
      onHoldValue.current = '';
    }
    setPlaceholderValue(placeholder);
  };

  return (
    <>
      <input
        data-testid={props['data-testid'] + '-input'}
        list={props['data-testid']}
        className="text-gray-800 p-4 rounded border-purple-700 border"
        value={currentValue ?? undefined}
        placeholder={placeholderValue}
        onClick={onClick}
        onInput={onInput}
        onBlur={onBlur}
      />
      <datalist id={props['data-testid']} data-testid={props['data-testid'] + '-datalist'}>
        {options.map(({ value, name }) => (
          <option key={value} value={value}>
            {name}
          </option>
        ))}
      </datalist>
    </>
  );
};

export default Select;
