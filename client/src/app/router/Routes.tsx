import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../../features/account/Login";
import Register from "../../features/account/Register";
import Roles from "../../features/admin/Roles";
import UsersWR from "../../features/admin/UsersWR";
import Catalog from "../../features/catalog/Catalog";
import CategoryList from "../../features/catalog/CategoryList";
import ProductDetails from "../../features/catalog/ProductDetails";
import About from "../layout/About";
import App from "../layout/App";
import Contact from "../layout/Contact";
import RequireAuth from "./RequireAuth";


export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {element: <RequireAuth roles={["admin"]}/>, children:[
        {path:'roles',element:<Roles/>},
        {path:'users',element:<UsersWR/>}
      ]},
      {element: <RequireAuth/>, children:[
        {path:'about', element:<About/>},
        {path:'contact', element:<Contact/>}
      ]},
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/product', element: <Catalog /> },
      { path: '/product/:id', element: <ProductDetails /> },
      { path: '/category', element: <CategoryList /> },
      { path: '*', element: <Navigate replace to='/' /> }
    ]
  }
])