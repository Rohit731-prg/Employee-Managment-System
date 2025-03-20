import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LogInPage from './Components/LogInPage.jsx';
import Admin from './Components/Admin.jsx';
import AddEmployee from './Components/AddEmployee.jsx';
import Employee from './Components/Employee.jsx';

const route = createBrowserRouter([
  {
    path: '/',
    element: <LogInPage />
  },
  {
    path: '/admin',
    element: <Admin />
  },
  {
    path: '/addEmployee',
    element: <AddEmployee />
  },
  {
    path: '/employee/:id',
    element: <Employee />
  },
  
]);

function App() {
  return (
    <RouterProvider router={route} />
  )
}

export default App