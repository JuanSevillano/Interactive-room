import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';

import Portfolio from './hoc/Portfolio/Portfolio';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Portfolio />
      </BrowserRouter>
    </div>
  );
}

export default App;
