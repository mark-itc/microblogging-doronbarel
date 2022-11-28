import { useContext, useEffect } from "react";
import { Routes, Route, NavLink } from 'react-router-dom';
import { TweetContext } from "./context/TweetContext";
import Feed from "./views/Feed";
import Profile from "./views/Profile";
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
          <NavLink to="/profile" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Profile</NavLink>
        </div>
      </div>
      <Routes>
        <Route path='/profile' element={<Profile />} />
        <Route path='/' element={<Feed />} />
      </Routes>
    </div>
  );
}
export default App;