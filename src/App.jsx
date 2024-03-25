import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
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
import './App.css';

function App() {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
    
  const [pageId, setPageId] = useState("");
  console.log("PAGEID:", pageId)

  useEffect(() => { 
    location.pathname === "/:users/:pageId" ? 
    setPageId(location.pathname.split("/").pop()) : setPageId("");
  }
  , []);
  
  useEffect(() => {
    const storedToken = window.sessionStorage.getItem("token");

    if (!storedToken) {
      return;
    }

    API.verifyToken(storedToken)
      .then((data) => {
        setToken(storedToken);
        setUserId(data.id);
        setUsername(data.username);
        setFullName(data.fullName);
        setEmail(data.email);
      })
      .catch((err) => {
        console.log("oh noes");
        console.log(err);
      });
  }, []);

  /////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <Router>
      <Routes>

        <Route path='/' element={<Enter />}/>

        {/* HOME HOME HOME HOME */}
        <Route path="/st0rm" element={
          <Home
            userId={userId}
            username={username}
            token={token}
            setUserId={setUserId}
            setEmail={setEmail}
            setUsername={setUsername}
            setToken={setToken}
            setPageId={setPageId}
          />}
        
        />

        {/* LOGIN LOGIN LOGIN LOGIN */}
        <Route path="/login" element={
          <LogIn
            type='login'
            userId={userId}
            username={username}
            setUserId={setUserId}
            setEmail={setEmail}
            setFullName={setFullName}
            setUsername={setUsername}
            setToken={setToken}
          />}
        
        />

        {/* SIGNUP SIGNUP SIGNUP SIGNUP */}
        <Route path="/signup" element={
          <SignUp
            type='signup'
            userId={userId}
            setUserId={setUserId}
            setEmail={setEmail}
            setFullName={setFullName}
            setUsername={setUsername}
            setToken={setToken}
          />}
        />

        {/* PROFILE PROFILE PROFILE PROFILE */}
        <Route path={"/&/" + username} element={
          <Profile
            type='profile'
            userId={userId}
            token={token}
            username={username}
            fullName={fullName}
            bio={bio}
            email={email}
            setUserId={setUserId}
            setUsername={setUsername}
            setToken={setToken}
            setEmail={setEmail}
            setBio={setBio}
          />}
        />

        {/* PROFILE EDIT PROFILE EDIT PROFILE EDIT */}
        <Route path={"/edit"} element={
          <Profile
            type="edit"
            userId={userId}
            username={username}
            fullName={fullName}
            bio={bio}
            email={email}
            setEmail={setEmail}
            setUsername={setUsername}
            setFullName={setFullName}
            setBio={setBio}
          />}
        />

        {/* PAGE PAGE PAGE PAGE */}
        <Route
          element={<UserPage type='post' userId={userId} username={username} token={token} />}
          path={"/:username/:pageId"}
        />

        {/* OTHER PROFILE OTHER PROFILE OTHER PROFILE */}
        <Route key={username} path={"/:username"} element={
          <OtherProfile 
          type='otherProfile'
          userId={userId}
          username={username}
          token={token}
          setUserId={setUserId}
          setUsername={setUsername}
          setToken={setToken}
          setEmail={setEmail}
           />}
        />


        {/* CREATE PAGE CREATE PAGE CREATE PAGE */}
        <Route path='/create' element={
          <CreatePage
            userId={userId}
            username={username}
          />}
        
        />

        {/* ABOUT ABOUT ABOUT ABOUT */}
        <Route path='/about' element={
          <About />
        }
        />

      </Routes>
    </Router>
  );
};

export default App;