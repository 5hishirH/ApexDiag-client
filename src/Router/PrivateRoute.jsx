import { Navigate, useLocation } from "react-router-dom";
import useAuthContext from "../Providers/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { loading, user } = useAuthContext();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (user?.email) {
    return children;
  }
  return <Navigate state={location.pathname} to="/login" replace></Navigate>;
};

export default PrivateRoute;