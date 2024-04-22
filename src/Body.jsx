import { useEffect } from 'react'
import Login from './components/forms/Login'
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

import Browse from './components/layouts/Browse';

import { onAuthStateChanged } from "firebase/auth";
import { auth } from './utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from './utils/userSlice';




const Body = () => {

  const dispatch = useDispatch()
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

      useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
          if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const {uid, displayName, email} = user;

            dispatch(addUser({uid, displayName, email}))
            // ...
          } else {
            dispatch(removeUser())
            
            // User is signed out
            // ...
          }
        });
        
        
      }, [])

  return (
    <div className=''>
     <RouterProvider router={router} />
    </div>
  )
}

export default Body