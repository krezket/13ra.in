import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider }from 'react-router-dom'
import API from "./utils/API.js";
import Enter from './pages/Enter/theGate.jsx';
import Home from './pages/Homepage/Home.jsx';
import LogIn from './pages/LogIn/index.jsx';
import SignUp from './pages/SignUp/index.jsx';
import Profile from './pages/Profile/Profile.jsx';
import UserPage from './pages/UserPage/UserPost.jsx';
import CreatePage from './pages/CreatePage/CreatePage.jsx';
import About from './pages/About/About.jsx';
import OtherProfile from './pages/OtherProfile/OtherProfile.jsx';
import App from './App.jsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
  },
  {
    path: '/:username',
    element: <OtherProfile/>,
  },
  {
    path: '/:username/:pageId',
    element: <UserPage/>, 
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)