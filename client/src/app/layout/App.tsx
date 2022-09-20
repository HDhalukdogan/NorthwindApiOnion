import React,{ useCallback, useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import Login from '../../features/account/Login';
import Register from '../../features/account/Register';
import Header from './Header';
import { useAppDispatch } from "../store/configureStore";
import { fetchCurrentUser } from "../../features/account/accountSlice";
import { PrivateRoute } from './PrivateRoute';
import Product from '../../features/product/Product';
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
    initApp().then(() => console.log('user fetched'));
  }, [initApp])
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route
          path="product"
          element={<PrivateRoute roles={["admin"]} component={Product} />}
        />
      </Routes>
    </div>
  );
}

export default App;
