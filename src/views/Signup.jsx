import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { ACTIONS, TweetContext } from "../context/TweetContext";
import './Signup.css';

function translateFirebaseError(errorMessage) {
    switch(errorMessage) {
        case 'auth/invalid-email':
            return 'Invalid email. Please try again.';
        case 'auth/email-already-in-use':
            return 'Email already in use. Please login.';
        case 'auth/weak-password':
            return 'Password should be at least 6 characters.';
        default:
            return 'Error signing up. Please try again.';
    }
}

function Signup() {
    const { state, dispatch } = useContext(TweetContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signupError, setSignupError] = useState('');
    const navigate = useNavigate();
    const handleSignup = () => {
        console.log('inside processsignup');
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            dispatch({ type: ACTIONS.AUTHENTICATE_USER, payload: userCredential.user.uid })
            navigate('/');
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setSignupError(translateFirebaseError(errorCode));
            console.log('errorcode', errorCode);
            console.log('errorMessage', errorMessage);
            // ..
        });
    }

    return (
        <div className="container">
            <h1>Sign Up</h1>
            <label>Email</label>
            <input type="email" className="signupFormInput" value={email} onChange={(event) => {
                setEmail(event.target.value);
            }}/>
            <label>Password</label>
            <input type="password" className="signupFormInput" value={password} onChange={(event) => {
                setPassword(event.target.value);
            }}/>
            {signupError !== '' ? <div id="signupError">{signupError}</div> : ''}
            <button id="signupBtn" disabled={email === '' || password === '' || email.trim().length === 0 || password.trim().length === 0 ? true : false} onClick={handleSignup}>Sign Up</button>
        </div>
    );
}
export default Signup;