import React from 'react';
import { RouterProvider } from 'react-router-dom';
import UserContextProvider from './context/DataContext'; // Ensure this path is correct
import router from './Routes/router';

export default function App() {
  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  );
}
