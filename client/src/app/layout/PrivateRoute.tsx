import { Navigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { toast } from 'react-toastify';
import { fetchCurrentUser } from "../../features/account/accountSlice";
 

interface Props {
  component: React.ComponentType
  roles?: string[]
}

export const  PrivateRoute: React.FC<Props> = ({ component: RouteComponent, roles }) => {
  const location = useLocation();
  const { user } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();
  const userHasRequiredRole = user && roles?.some(r => user?.roles?.includes(r)) ? true : false;
  if (!user) {
     dispatch(fetchCurrentUser());
  }
  if (!user) {
    return <Navigate replace to="/login" state={{ from: location }} />
   } 
  if (roles&&!userHasRequiredRole) {
    toast.error('You are not Authorized!');
    return <Navigate replace to="/"/>
  }
  return <RouteComponent />
};