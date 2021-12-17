import React from 'react';
import { Route, Routes } from 'react-router-dom';

import styles from './app.module.css';


import { AppHeader } from '../app-header/app-header';
import { Home } from "../../pages/home/home";
import { Login } from "../../pages/login/login";
import { Register } from "../../pages/register/register";
import { ForgotPassword } from "../../pages/forgot-password/forgot-password";
import { ResetPassword } from "../../pages/reset-password/reset-password";
import {NotFound} from "../../pages/not-found/not-found";

function App() {
  return (
    <div className={`App ${styles.wrapper}`}>
      <AppHeader />
      <div className={styles.container}>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
