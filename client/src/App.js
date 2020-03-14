import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';

import InteractiveRoom from './containers/InteractiveRoom/InteractiveRoom';

function App(props) {
  return (
    <div className="App">
      <BrowserRouter>
        <InteractiveRoom />
      </BrowserRouter>
    </div>
  );
}

export default App;
