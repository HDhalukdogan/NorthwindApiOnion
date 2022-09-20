import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";
 

interface Props {
  component: React.ComponentType
  roles?: string[]
}

export const  PrivateRoute: React.FC<Props> = ({ component: RouteComponent, roles }) => {
  const location = useLocation();
  const { user } = useAppSelector((state) => state.account);
  const userHasRequiredRole = user && roles?.some(r => user?.roles?.includes(r)) ? true : false;
  if (!user) {
    return <Navigate replace to="/login" state={{ from: location }} />
   } 
  if (!roles&&user) {
      return <RouteComponent />
  }
  if (!userHasRequiredRole) {
    return <Navigate replace to="/"/>
  }
  return <RouteComponent />
};