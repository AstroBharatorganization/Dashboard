import { Location, Navigate, useLocation } from "react-router-dom";
import { selectAuth } from "../features/authSlice";
import { useSelector } from "react-redux";

type ProtectedRouteProps = {
  children: JSX.Element;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps): JSX.Element => {
  const token: string | null = useSelector(selectAuth);

  const location: Location<any> = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
