import { useState, useEffect, useContext } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, onAuthStateChanged, storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ACTIONS, TweetContext } from "../context/TweetContext";
import './Profile.css';
function Profile() {
    const auth = getAuth();
    const { state, dispatch } = useContext(TweetContext);
    const [image, setImage] = useState(null);
    const [user, setUser] = useState({email: '', photoURL: null});
    const navigate = useNavigate();
    useEffect(() => {
        auth.onAuthStateChanged(user => {
          if(user !== null) {
            setUser({email: auth.currentUser.email, photoURL: auth.currentUser.photoURL});
            dispatch({type: ACTIONS.AUTHENTICATE_USER });
          }
        })
      }, []);
    const handleImageChange = (e) => {
        if(e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }
    const handleImageUpload = () => {
        const imageRef = ref(storage, "images/" + auth.currentUser.uid);
        uploadBytes(imageRef, image)
        .then(() => {
            getDownloadURL(imageRef)
            .then((url) => {
                console.log("ImageURL ", url);
                updateProfile(auth.currentUser, { photoURL: `${url}` })
                .then(() => {
                    console.log("image upload success");
                    window.location.reload();
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
    return (
        <div className="container">
            <h1>Profile</h1>
            {user.photoURL !== null && <img className="profileImg" src={user.photoURL}/>}
            <label>Email</label>
            <input type="text" id="username" value={user.email} disabled/>
            <label>Profile Image</label><br/>
            <input type="file" className="uploadImg" accept="image/*" onChange={handleImageChange}/>
            <button id="saveUsernameBtn" onClick={() => {
                if(image) {
                    handleImageUpload();
                }
            }}>Save</button>
        </div>
    );
}
export default Profile;