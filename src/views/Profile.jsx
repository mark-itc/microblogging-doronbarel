import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TweetContext } from "../context/TweetContext";
import './Profile.css';
function Profile() {
    const { authUser, setAuthUser } = useContext(TweetContext);
    const [user, setUser] = useState(authUser);
    const navigate = useNavigate();
    const setAuthUserDetails = () => {
        localStorage.setItem("username", user);
        setAuthUser(user);
        navigate('/');
    }
    return (
        <div className="container">
            <h1>Profile</h1>
            <label>Username</label>
            <input type="text" id="username" value={user} onChange={(event) => {
                setUser(event.target.value);
            }}/>
            <button id="saveUsernameBtn" disabled={user == '' || user.trim().length == 0 ? true : false} onClick={() => {
                setAuthUserDetails();
            }}>Save</button>
        </div>
    );
}
export default Profile;