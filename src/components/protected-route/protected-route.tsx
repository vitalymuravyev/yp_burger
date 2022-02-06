import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from '../../utils/helpers';

export const RequireAuth = () => {
  const { isUserAuth, loginRequest } = useSelector(state => state.userAuth);
  const location = useLocation();
  if (!isUserAuth && !loginRequest) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
};
