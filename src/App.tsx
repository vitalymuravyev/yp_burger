import React from 'react';
import './App.css';
import { AppHeader } from './components/app-header/AppHeader';
import { BurgerConstructor } from "./components/burger-constructor/burger-constructor";

import { data } from './utils/data';

function App() {
  return (
    <div className="App">
      <AppHeader />
      <BurgerConstructor data={data} />
    </div>
  );
}

export default App;
