import React, { useState } from 'react';
import './App.scss';

import Select from './components/Select';

const selectOptions = ['C++', 'Rust', 'Python', 'JavaScript'];

function App() {
  const [selectionIndex, setSelectionIndex] = useState<number>(0);
  const [selectDisabled, setSelectDisabled] = useState<boolean>(false);
  return (
    <div className="App">
      <div className="App__container">
        <h1 className="App__title">React Select Component</h1>
        <Select
          options={selectOptions}
          onSelectOption={setSelectionIndex}
          disabled={selectDisabled}
        />
        <p className="App__caption">{selectOptions[selectionIndex]} is selected.</p>
        <button
          className="App__button"
          type="button"
          onClick={() => setSelectDisabled(!selectDisabled)}
        >
          {selectDisabled ? 'Enable' : 'Disable'}
        </button>
      </div>
    </div>
  );
}

export default App;
