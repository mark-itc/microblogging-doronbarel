import { useContext, useEffect } from "react";
import { Routes, Route, NavLink } from 'react-router-dom';
import { ACTIONS, TweetContext } from "./context/TweetContext";
import { auth, onAuthStateChanged } from "./firebase";
import Feed from "./views/Feed";
import Profile from "./views/Profile";
import './App.css';
function App() {
  const { state, dispatch } = useContext(TweetContext);
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if(user !== null) {
        dispatch({type: ACTIONS.AUTHENTICATE_USER });
      }
    })
  }, []);
  const handleSignout = () => {
    dispatch({ type: ACTIONS.LOGOUT_USER });
    window.location.href = '../';
  }
  return (
    <div className="App">
      <div className="navbar">
        <div className="links">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Home</NavLink>
          {state.authUser !== null ? (
            <>
              <NavLink to="/profile" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Profile</NavLink>
              <NavLink onClick={handleSignout} className="logoutBtn">Logout</NavLink>
            </>
          ) : null}
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