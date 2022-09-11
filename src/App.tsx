import React, { useState } from 'react';
import './App.scss';

import Select from './components/Select';

const selectOptions = [
  'C++',
  'Rust',
  'Python',
  'JavaScript'
];

function App() {
  const [selectionIndex, setSelectionIndex] = useState<number>(0);
  return (
    <div className="App">
      <div className="App__container">
        <h1 className="App__title">React Select Component</h1>
        <Select options={selectOptions} onSelectOption={setSelectionIndex} />
        <p className="App__caption">{selectOptions[selectionIndex]} is selected.</p>
      </div>
    </div>
  );
}

export default App;
