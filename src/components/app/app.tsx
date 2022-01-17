import React, {useEffect} from 'react';
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import {useDispatch} from "react-redux";

import styles from './app.module.css';


import { AppHeader } from '../app-header/app-header';
import { Home } from "../../pages/home/home";
import { Login } from "../../pages/login/login";
import { Register } from "../../pages/register/register";
import { ForgotPassword } from "../../pages/forgot-password/forgot-password";
import { ResetPassword } from "../../pages/reset-password/reset-password";
import { NotFound } from "../../pages/not-found/not-found";
import { Profile } from "../../pages/profile/profile";
import { RequireAuth } from "../protected-route/protected-route";
import {Ingredient} from "../../pages/ingredient/ingredient";
import {Modal} from "../modal/modal";
import {IngredientDetails} from "../ingredient-details/ingredient-details";
import {REMOVE_ITEM_INFO} from "../../services/actions/ingredient-card";
import {getUserProfile} from "../../services/actions/user-profile";
import {USER_IS_LOGED} from "../../services/actions/user-auth";
import {getItems} from "../../services/actions/burger-ingredients";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const state = location.state;

  useEffect(() => {
    dispatch(getItems());
    if (localStorage.getItem('refreshToken')) {
      dispatch(getUserProfile());
      dispatch({
        type: USER_IS_LOGED
      });
    }
  }, [dispatch]);

  const closeModal = () => {
    dispatch({
      type: REMOVE_ITEM_INFO
    });
    navigate(-1);
  };

  return (
    <div className={`App ${styles.wrapper}`}>
      <AppHeader />
      <div className={styles.container}>
        <Routes location={state?.backgroundLocation || location}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route element={<RequireAuth />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/ingredients/:id" element={<Ingredient/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        {state?.backgroundLocation && (
          <Routes>
            <Route
              path="/ingredients/:id"
              element={
                <Modal closeModal={closeModal}>
                  <IngredientDetails />
                </Modal>
              }
            />
          </Routes>
        )}
      </div>
    </div>
  );
}

export default App;
