import { useState, useEffect, useContext } from "react";
import { updateProfile } from "firebase/auth";
import { auth, storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ACTIONS, TweetContext } from "../context/TweetContext";
import './Profile.css';
function Profile() {
    const { dispatch } = useContext(TweetContext);
    const [image, setImage] = useState(null);
    const [user, setUser] = useState({email: '', photoURL: null});
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
                updateProfile(auth.currentUser, { photoURL: `${url}` })
                .then(() => {
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
            <label>Email</label>
            <input type="text" id="username" value={user.email} disabled/>
            <label>Profile Image</label><br/>
            {user.photoURL !== null && <img className="profileImg" alt="Avatar" src={user.photoURL}/>}
            <input type="file" className="uploadImg" accept="image/*" onChange={handleImageChange}/>
            <button id="uploadBtn" disabled={ image === null ? true : false } onClick={() => {
                if(image) {
                    handleImageUpload();
                }
            }}>Upload</button>
        </div>
    );
}
export default Profile;