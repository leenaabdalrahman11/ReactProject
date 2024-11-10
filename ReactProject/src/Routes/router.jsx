import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from "../components/user/Home/Home.jsx";
import Login from "../pages/user/Login/Login.jsx";
import Register from "../pages/user/Register/Register.jsx";
import Profile from "../pages/user/profile/Profile.jsx";
import Root from "../Root.jsx";
import { ProtectedRouter, PublicRouter } from '../components/ProtectedRouter/ProtectedRouter.jsx';
import CategoryDetails from '../pages/user/CategoryDetails/CategoryDetails.jsx';
import Product from '../pages/user/Product/Product.jsx';
import Cart from '../pages/user/Cart/cart.jsx';
import Welcome from '../pages/user/Welcome/Welcome.jsx';
import ForgotPassword from '../pages/user/ForgotPassword/ForgotPassword.jsx';
import Products from '../pages/user/Products/Products.jsx';
import Order from '../pages/user/Order/Order.jsx';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root/>, // Root component wraps all child routes
    children: [
      {
        path: '/', 
        element: (
          <ProtectedRouter>
            <Home />
          </ProtectedRouter>
        ),
      },
      {
        path: '/home',
        element: (
          <ProtectedRouter>
            <Home />
          </ProtectedRouter>
        ),
      },
      {
        path: '/login',
        element: (
            <PublicRouter>
            <Login />
          </PublicRouter>
        ),
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/ForgotPassword',
        element: <ForgotPassword />,
      },
      {
        path: '/profile',
        element: (
          <ProtectedRouter>
            <Profile />
          </ProtectedRouter>
        ),
      },
     
      {
        path: '/CategoryDetails/:Id', 
        element: (
          <ProtectedRouter>
            <CategoryDetails />
          </ProtectedRouter>
        ),
      },{
        path: '/Product/:Id', 
        element: (
          <ProtectedRouter>
            <Product/>
          </ProtectedRouter>
        ),
      },{
        path:'/cart',
        element:  (
        <ProtectedRouter>
        <Cart/>
        </ProtectedRouter>)
      },{
        path:'/Welcome',
        element:(
          <PublicRouter>
              <Welcome/>
          </PublicRouter>
        )
      },{
        path: '/Products', 
        element: (
          <ProtectedRouter>
            <Products/>
          </ProtectedRouter>
        ),
      },{
        path:'/Order',
        element: (
          <ProtectedRouter>
            <Order/>
          </ProtectedRouter>
        )
      }
      
    ],
  },
]);

export default router; // Export the router for use in App.js
