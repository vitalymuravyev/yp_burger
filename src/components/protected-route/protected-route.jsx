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
