// import React, {useCallback, useEffect, useState} from 'react';
// import { Route, Navigate } from 'react-router-dom';
// import {useDispatch, useSelector} from "react-redux";
// import Cookies from "js-cookie";
// import {getUserProfile} from "../../services/actions/user-profile";
//
// // eslint-disable-next-line react/prop-types
// export const ProtectedRoute = ({ children, ...other }) => {
//   const dispatch = useDispatch();
//   const { userAuth } = useSelector(state => state);
//   const [isUserLoaded, setUserLoaded] = useState(false);
//
//   const init = useCallback(() => {
//     dispatch(getUserProfile());
//     setUserLoaded(true);
//   }, [dispatch]);
//
//   useEffect(() => {
//     init();
//   }, []);
//
//   if (!isUserLoaded) return null;
//
//   return (
//     <Route
//       { ...other }
//       element={
//         userAuth.isUserAuth ? (
//           children
//         ) : (
//           <Navigate to='/login' />
//         )
//       }
//     />
//   );
// };

import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export const RequireAuth = () => {
  const { userAuth } = useSelector(state => state);
  const location = useLocation();

  if (!userAuth.isUserAuth) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
};
