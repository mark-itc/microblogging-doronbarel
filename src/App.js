import { useContext, useState } from "react";
import { Routes, Route, NavLink } from 'react-router-dom';
import { TweetContext } from "./context/TweetContext";
import { auth } from "./firebase";
import Feed from "./views/Feed";
import Profile from "./views/Profile";
import Login from "./views/Login";
import './App.css';
function App() {
  console.log('authstate', auth.currentUser);
  const { state, dispatch } = useContext(TweetContext);
  /*
  useEffect(() => {
    let localUser = localStorage.getItem("username");
    setAuthUser(localUser == null ? 'Guest' : localUser);
  }, []);
  */
  return (
    <div className="App">
      <div className="navbar">
        <div className="links">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Home</NavLink>
          {state.authUser !== null ? (<NavLink to="/profile" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Profile</NavLink>) : null}
          {state.authUser === null ? (
            <>
              <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Login</NavLink>
            </>
          ) : null}
        </div>
      </div>
      <Routes>
        <Route path='/profile' element={<Profile />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Feed />} />
      </Routes>
    </div>
  );
}
export default App;