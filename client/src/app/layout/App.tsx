import React, { useCallback, useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import Login from '../../features/account/Login';
import Register from '../../features/account/Register';
import Header from './Header';
import { useAppDispatch } from "../store/configureStore";
import { fetchCurrentUser } from "../../features/account/accountSlice";
import { PrivateRoute } from './PrivateRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Roles from '../../features/admin/Roles';
import UsersWR from '../../features/admin/UsersWR';
import Catalog from '../../features/catalog/Catalog';
import ProductDetails from '../../features/catalog/ProductDetails';
import CategoryList from '../../features/catalog/CategoryList';
function App() {
  const dispatch = useAppDispatch();

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser())
    } catch (error) {
      console.log(error);
    }
  }, [dispatch])

  useEffect(() => {
    initApp();
  }, [initApp])
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path="/product" element={<Catalog />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/category" element={<CategoryList />} />
        <Route
          path="roles"
          element={<PrivateRoute roles={["admin"]} component={Roles} />}
        />
        <Route
          path="users"
          element={<PrivateRoute roles={["admin"]} component={UsersWR} />}
        />
      </Routes>
      <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
    </div>
  );
}

export default App;
