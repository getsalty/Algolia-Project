import React, { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

type Props = { onChange: (value: string) => void };

const AlgoliaSearchBox = (props: Props) => {
  const { onChange } = props;

  const [inputValue, setInputValue] = useState('');
  const [inputDebounce] = useDebounce(inputValue, 200);

  useEffect(() => {
    onChange(inputDebounce);
  }, [inputDebounce, onChange]);

  return (
    <div className="ais-SearchBox w-full">
      <form action="" className="ais-SearchBox-form" role="search">
        <input
          className="ais-SearchBox-input"
          aria-label="Search"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          placeholder="Search"
          spellCheck="false"
          maxLength={512}
          type="search"
          value={inputValue}
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
        />
        <button className="ais-SearchBox-submit" type="submit" title="Submit the search query">
          <svg className="ais-SearchBox-submitIcon" width="10" height="10" viewBox="0 0 40 40" aria-hidden="true">
            <path d="M26.804 29.01c-2.832 2.34-6.465 3.746-10.426 3.746C7.333 32.756 0 25.424 0 16.378 0 7.333 7.333 0 16.378 0c9.046 0 16.378 7.333 16.378 16.378 0 3.96-1.406 7.594-3.746 10.426l10.534 10.534c.607.607.61 1.59-.004 2.202-.61.61-1.597.61-2.202.004L26.804 29.01zm-10.426.627c7.323 0 13.26-5.936 13.26-13.26 0-7.32-5.937-13.257-13.26-13.257C9.056 3.12 3.12 9.056 3.12 16.378c0 7.323 5.936 13.26 13.258 13.26z"></path>
          </svg>
        </button>
        <button className="ais-SearchBox-reset" type="reset" title="Clear the search query" hidden>
          <svg className="ais-SearchBox-resetIcon" viewBox="0 0 20 20" width="10" height="10" aria-hidden="true">
            <path d="M8.114 10L.944 2.83 0 1.885 1.886 0l.943.943L10 8.113l7.17-7.17.944-.943L20 1.886l-.943.943-7.17 7.17 7.17 7.17.943.944L18.114 20l-.943-.943-7.17-7.17-7.17 7.17-.944.943L0 18.114l.943-.943L8.113 10z"></path>
          </svg>
        </button>
        <span className="ais-SearchBox-loadingIndicator" hidden>
          <svg
            aria-label="Results are loading"
            width="16"
            height="16"
            viewBox="0 0 38 38"
            stroke="#444"
            className="ais-SearchBox-loadingIcon"
            aria-hidden="true"
          >
            <g fill="none" fill-rule="evenodd">
              <g transform="translate(1 1)" stroke-width="2">
                <circle stroke-opacity=".5" cx="18" cy="18" r="18"></circle>
                <path d="M36 18c0-9.94-8.06-18-18-18">
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 18 18"
                    to="360 18 18"
                    dur="1s"
                    repeatCount="indefinite"
                  ></animateTransform>
                </path>
              </g>
            </g>
          </svg>
        </span>
      </form>
    </div>
  );
};

export default AlgoliaSearchBox;
