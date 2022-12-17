import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { ACTIONS, TweetContext } from "../context/TweetContext";
import './Signin.css';

function translateFirebaseError(errorMessage) {
    switch(errorMessage) {
        case 'auth/user-not-found':
            return 'No user with that email address.';
        case 'auth/wrong-password':
            return 'Incorrect password. Try again.';
        case 'auth/too-many-requests':
            return 'Too many tries. Try again later.';
        default:
            return 'Error signing up. Please try again.';
    }
}

function Signin() {
    const { state, dispatch } = useContext(TweetContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signinError, setSigninError] = useState('');
    const navigate = useNavigate();
    const handleSignin = () => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            localStorage.setItem("username", user.uid);
            dispatch({ type: ACTIONS.AUTHENTICATE_USER, payload: userCredential.user })
            navigate('/');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setSigninError(translateFirebaseError(errorCode));
            console.log(errorCode);
        });

    }
    return (
        <div className="container">
            <h1>Sign In</h1>
            <label>Email</label>
            <input type="email" className="signinFormInput" value={email} onChange={(event) => {
                setEmail(event.target.value);
            }}/>
            <label>Password</label>
            <input type="password" className="signinFormInput" value={password} onChange={(event) => {
                setPassword(event.target.value);
            }}/>
            {signinError !== '' ? <div id="signinError">{signinError}</div> : ''}
            <button id="signinBtn" disabled={email === '' || password === '' || email.trim().length === 0 || password.trim().length === 0 ? true : false} onClick={handleSignin}>Sign In</button>
        </div>
    );
}
export default Signin;