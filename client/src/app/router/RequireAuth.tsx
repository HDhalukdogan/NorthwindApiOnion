import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchCurrentUser } from '../../features/account/accountSlice';
import { useAppDispatch, useAppSelector } from '../store/configureStore';

interface Props {
    roles?: string[];
}


export default function RequireAuth({ roles }: Props) {
    const { user } = useAppSelector(state => state.account);
    const location = useLocation();
    const dispatch = useAppDispatch();
    const userHasRequiredRole = user && roles?.some(r => user?.roles?.includes(r)) ? true : false;

    if (!user) {
        dispatch(fetchCurrentUser());
    }
    if (!user) {
        return <Navigate replace to="/login" state={{ from: location }} />
    }
    if (roles && !userHasRequiredRole) {
        toast.error('You are not Authorized!');
        return <Navigate replace to="/" />
    }
    return <Outlet/>
}
