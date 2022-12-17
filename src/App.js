import { useContext, useEffect } from "react";
import { Routes, Route, NavLink } from 'react-router-dom';
import { TweetContext } from "./context/TweetContext";
import { auth } from "./firebase";
import Feed from "./views/Feed";
import Profile from "./views/Profile";
import Signup from "./views/Signup";
import Signin from "./views/Signin";
import './App.css';
function App() {
  const { authUser, setAuthUser } = useContext(TweetContext);
  useEffect(() => {
    let localUser = localStorage.getItem("username");
    setAuthUser(localUser == null ? 'Guest' : localUser);
  }, []);
  return (
    <div className="App">
      <div className="navbar">
        <div className="links">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Home</NavLink>
          {localStorage.getItem("username") !== null ? (<NavLink to="/profile" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Profile</NavLink>) : null}
          {localStorage.getItem("username") === null ? (
            <>
              <NavLink to="/signup" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Sign Up</NavLink>
              <NavLink to="/signin" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Sign In</NavLink>
            </>
          ) : null}
        </div>
      </div>
      <Routes>
        <Route path='/profile' element={<Profile />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/' element={<Feed />} />
      </Routes>
    </div>
  );
}
export default App;