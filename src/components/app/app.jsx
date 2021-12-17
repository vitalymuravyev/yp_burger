import React from 'react';
import { Route, Routes } from 'react-router-dom';

import styles from './app.module.css';


import { AppHeader } from '../app-header/app-header';
import { Home } from "../../pages/home/home";
import {Login} from "../../pages/login/login";

function App() {
  return (
    <div className={`App ${styles.wrapper}`}>
      <AppHeader />
      <div className={styles.container}>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
