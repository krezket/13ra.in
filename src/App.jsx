import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import API from "./utils/API.js";
import Enter from './pages/Enter/theGate.jsx';
import Home from './pages/Homepage/Home.jsx';
import LogIn from './pages/LogIn/index.jsx';
import SignUp from './pages/SignUp/index.jsx';
import Profile from './pages/Profile/Profile.jsx';
import UserPage from './pages/UserPage/UserPage.jsx';
import CreatePage from './pages/CreatePage/CreatePage.jsx';
import About from './pages/About/About.jsx';
import OtherProfile from './pages/OtherProfile/OtherProfile.jsx';
// import LoadingPage from './pages/LoadingPage/LoadingPage.jsx';
import './App.css';

function App() {
  const [usersLoading, setUsersLoading] = useState(false)
  console.log("Users:", usersLoading)
  const [pagesLoading, setPagesLoading] = useState(false)
  console.log("Pages:", pagesLoading)
  const [userId, setUserId] = useState(null);
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");

  const [page, setPage] = useState("")
  // console.log("page:",  page)
  const [pages, setPages] = useState("")
  console.log("ALL PAGES", pages)
  const [users, setUsers] = useState("")
  // console.log("All USERS", users)

  const [pageId, setPageId] = useState("");
  console.log("FROM pageId:", pageId)

  const [newPage, setNewPage] = useState("");
  console.log("YEET", newPage);

  useEffect(() => {
    setPagesLoading(true)

    if (typeof pageId === "number") {
      API.getPage(pageId)
        .then((data) => {
          //   console.log("REALPAGEDATA:",data)
          setNewPage(data)
          setPagesLoading(false)
          location.pathname = "/" + data.users.username + "/" + pageId
        })
        .catch((err) => {
          setPagesLoading(false)
          console.log("oh noes");
          console.log(err);
        });
    }
  }, [pageId]);

  // LOADING SCREEN
  useEffect(() => {
    setUsersLoading(true)
    API.getProfiles()
      .then((data) => {
        setUsers(data)
        setUsersLoading(false)
      })
      .catch((err) => {
        setUsersLoading(false)
        console.log("oh noes");
        console.log(err);
      });
  }, []);
  // LOADING SCREEN
  useEffect(() => {
    setPagesLoading(true)
    API.getPages()
      .then((data) => {
        // console.log("bruh:",data)
        setPages(data)
        setPagesLoading(false)
      })
      .catch((err) => {
        setPagesLoading(false)
        console.log("oh noes");
        console.log(err);
      });
  }, []);

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

        {/* HOME HOME HOME HOME */}
        <Route path="/" element={
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
        >
        </Route>

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
        >
        </Route>

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
        >
        </Route>

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
            setEmail={setEmail}
            setUsername={setUsername}
            setBio={setBio}
            setToken={setToken}
          />}
        >
        </Route>

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
        >
        </Route>

        {/* OTHER PROFILE OTHER PROFILE OTHER PROFILE */}
        {
          !users ?
            <Route path={"bruh"} element={<OtherProfile />}>
            </Route>
            :
            users.map(({ username }) => (
              <Route key={username} path={'/' + username} element={
                <OtherProfile type='otherProfile' />}
              >
              </Route>
            ))
        }

        {/* {usersLoading === true ?
          <Route path={window.location.pathname} element={<LoadingPage />}></Route>
          :

          !users ?
            <Route path={"bruh"} element={<OtherProfile />}>
            </Route>
            :
            users.map(({ username }) => (
              <Route key={username} path={'/&/' + username} element={
                <OtherProfile type='otherProfile' />}
              >
              </Route>
            ))

        } */}

        {/* PAGE PAGE PAGE PAGE */}

        {!pages ?
          <Route element={<Home></Home>}></Route>

          :
          pages.map(({ createdAt, text, title, users, id }) => (
            <Route path={"/" + users.username + "/" + id} element={
              <UserPage
                type='page'
                userId={userId}
                username={username}
                pageUsername={users.username}
                setUserId={setUserId}
                setEmail={setEmail}
                setUsername={setUsername}
                setToken={setToken}
              />}
            >
            </Route>
          ))}

        {/* CREATE PAGE CREATE PAGE CREATE PAGE */}
        <Route path='/create' element={
          <CreatePage
            userId={userId}
            username={username}
          />}
        >
        </Route>

        {/* ABOUT ABOUT ABOUT ABOUT */}
        <Route path='/about' element={
          <About />
        }>
        </Route>

      </Routes>
    </Router>
  );
};

export default App;