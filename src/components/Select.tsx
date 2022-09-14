import React, { useState, useRef, useEffect } from 'react';
import './Select.scss';

interface ISelectProps {
  options: string[];
  defaultSelectedIndex?: number;
  onSelectOption?: (index: number) => void;
  disabled?: boolean;
  name?: string;
  displayedItems?: number;
}

export default function Select({
  options,
  defaultSelectedIndex,
  onSelectOption,
  disabled,
  name,
  displayedItems,
}: ISelectProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<number>(defaultSelectedIndex as number);

  function handleClick() {
    setIsOpen(!isOpen);
  }

  function selectOptionAndClose(optionIndex: number) {
    setSelectedOption(optionIndex);
    if (onSelectOption) {
      onSelectOption(optionIndex);
    }
    // TODO: Make this trigger a transition
    setIsOpen(false);
  }

  function handleKeyDown(index: number) {
    return (evt: React.KeyboardEvent<HTMLElement>) => {
      if (disabled) {
        evt.preventDefault();
        evt.stopPropagation();
        return;
      }
      switch (evt.key) {
        case ' ':
        case 'SpaceBar':
        case 'Enter':
          evt.preventDefault();
          selectOptionAndClose(index);
          break;
        default:
          break;
      }
    };
  }

  function handleHeaderKeyDown(evt: React.KeyboardEvent<HTMLButtonElement>) {
    if (disabled) {
      evt.preventDefault();
      evt.stopPropagation();
      return;
    }
    switch (evt.key) {
      case 'ArrowUp':
        evt.preventDefault();
        setSelectedOption(selectedOption === 0 ? options.length - 1 : selectedOption - 1);
        break;
      case 'ArrowDown':
        evt.preventDefault();
        setSelectedOption(selectedOption === options.length - 1 ? 0 : selectedOption + 1);
        break;
      case 'Escape':
        evt.preventDefault();
        setIsOpen(false);
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    function handleClickOutside(evt: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(evt.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (headerRef.current && contentRef.current && isOpen) {
      const { clientHeight: itemHeight } = headerRef.current;
      const borderSizeContribution = 2;
      const actualDisplayedItems = Math.min(displayedItems as number, options.length);
      const maxHeight = itemHeight * actualDisplayedItems + borderSizeContribution;
      contentRef.current.style.maxHeight = `${maxHeight}px`;
    }
  });

  return (
    <div
      className={`Select${disabled ? ' Select_disabled' : ''}`}
      ref={rootRef}
      aria-disabled={disabled}
    >
      <button
        type="button"
        className="Select__header"
        ref={headerRef}
        aria-haspopup="listbox"
        onClick={handleClick}
        onKeyDown={handleHeaderKeyDown}
      >
        <span>{options[selectedOption]}</span>
        <div className={`Select__arrow-icon${isOpen ? ' Select__arrow-icon_inverted' : ''}`} />
      </button>
      {isOpen ? (
        <div className="Select__options-container" ref={contentRef}>
          <ul
            role="listbox"
            className="Select__options"
            aria-activedescendant={options[selectedOption]}
            aria-expanded={isOpen}
            aria-label={name as string}
            tabIndex={-1}
          >
            {options.map((option, index) => (
              <li
                className="Select__option"
                id={option}
                key={option}
                role="option"
                aria-selected={selectedOption === index}
                tabIndex={0}
                onKeyDown={handleKeyDown(index)}
                onClick={() => selectOptionAndClose(index)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

Select.defaultProps = {
  defaultSelectedIndex: 0,
  onSelectOption: undefined,
  disabled: false,
  name: 'select-component',
  displayedItems: 4,
};
