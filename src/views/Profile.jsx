import { useState, useContext } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { ACTIONS, TweetContext } from "../context/TweetContext";
import './Profile.css';
function Profile() {
    const auth = getAuth();
    console.log('imgurl user', auth.currentUser.imageURL);
    const { state, dispatch } = useContext(TweetContext);
    const [image, setImage] = useState(null);
    const [imageURL, setImageURL] = useState(null);
    const [user, setUser] = useState(state.authUser);
    console.log('user', user);
    const navigate = useNavigate();
    const setAuthUserDetails = () => {
        localStorage.setItem("username", user);
        dispatch({ type: ACTIONS.AUTHENTICATE_USER, payload: user});
        navigate('/');
    }
    const handleImageChange = (e) => {
        if(e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }
    const handleImageUpload = () => {
        const imageRef = ref(storage, "images/");
        uploadBytes(imageRef, image)
        .then(() => {
            getDownloadURL(imageRef)
            .then((url) => {
                setImageURL(url);
                console.log("ImageURL ", url);
                updateProfile(auth.currentUser, { photoURL: `${url}` })
                .then(() => {
                    console.log("success");
                }).catch((error) => { console.log(error); });
            })
            .catch((error) => {
                console.log(error.message);
            });
        })
        .catch((error) => {
            console.log(error.message)
        });
    }
    const handleSignout = () => {
        dispatch({ type: ACTIONS.LOGOUT_USER });
        navigate('/login');
    }
    return (
        <div className="container">
            <h1>Profile</h1>
            <button onClick={handleSignout}>LOGOUT</button>
            <label>Username</label>
            <input type="text" id="username" value={user} onChange={(event) => {
                setUser(event.target.value);
            }}/>
            <input type="file" accept="image/*" onChange={handleImageChange}/>
            <button id="saveUsernameBtn" disabled={user === '' || user.trim().length === 0 ? true : false} onClick={() => {
                setAuthUserDetails();
                if(image) {
                    handleImageUpload();
                }
            }}>Save</button>
        </div>
    );
}
export default Profile;