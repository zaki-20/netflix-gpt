import React from 'react'
import Login from './components/forms/Login'
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

import Browse from './components/layouts/Browse';


const Body = () => {

    const router = createBrowserRouter([
        {
          path: "/",
          element: <Login />
        },
        {
            path: "/browse",
            element: <Browse />
        },
      ]);


  return (
    <div className=''>
     <RouterProvider router={router} />
    </div>
  )
}

export default Body