import { useCallback, useEffect } from 'react';
import { Outlet } from "react-router-dom";
import Header from './Header';
import { useAppDispatch } from "../store/configureStore";
import { fetchCurrentUser } from "../../features/account/accountSlice";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
      <Outlet/>
      {/* <Routes>
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
      </Routes> */}
      <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
    </div>
  );
}

export default App;
