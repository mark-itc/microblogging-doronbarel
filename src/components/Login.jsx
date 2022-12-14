import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { auth, signInWithGoogle } from "../firebase";
import { ACTIONS, TweetContext } from "../context/TweetContext";
import './Login.css';
function translateFirebaseError(errorMessage, isSigningIn) {
    switch(isSigningIn) {
        case true:
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
        case false:
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
        default:
            break;
    }
}

function Login() {
    const { dispatch } = useContext(TweetContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formError, setFormError] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);
    const navigate = useNavigate();
    const handleSignup = () => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            localStorage.setItem("username", user.uid);
            dispatch({ type: ACTIONS.AUTHENTICATE_USER })
            navigate('/');
        })
        .catch((error) => {
            const errorCode = error.code;
            setFormError(translateFirebaseError(errorCode, isSigningIn));
        });
    }
    const handleSignin = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            localStorage.setItem("username", user.uid);
            dispatch({ type: ACTIONS.AUTHENTICATE_USER })
            navigate('/');
        })
        .catch((error) => {
            const errorCode = error.code;
            setFormError(translateFirebaseError(errorCode, isSigningIn));
        });
    }
    return (
        <div className="container">
            { isSigningIn === false && (
                <>
                    <h1>Sign Up</h1>
                    <img id="signInWithGoogle" alt ="Sign In With Google" src="https://i.stack.imgur.com/JkSed.png" onClick={signInWithGoogle}/>
                    <span id="signInUpInstead">Already have an account? <span id="signInUpLink" onClick={() => setIsSigningIn(true) }>Sign in.</span></span>
                </>)}
            { isSigningIn === true && (
                <>
                    <h1>Sign In</h1>
                    <img id="signInWithGoogle" alt ="Sign In With Google" src="https://i.stack.imgur.com/JkSed.png" onClick={signInWithGoogle}/>
                    <span id="signInUpInstead">Don't have an account? <span id="signInUpLink" onClick={() => setIsSigningIn(false) }>Sign up.</span></span>
                </>)}
            <label>Email</label>
            <input type="email" className="signupFormInput" value={email} onChange={(event) => {
                setEmail(event.target.value);
            }}/>
            <label>Password</label>
            <input type="password" className="signupFormInput" value={password} onChange={(event) => {
                setPassword(event.target.value);
            }}/>
            {formError !== '' ? <div id="signupError">{formError}</div> : ''}
            { isSigningIn === false && (<>
                <button id="signupBtn" disabled={email === '' || password === '' || email.trim().length === 0 || password.trim().length === 0 ? true : false} onClick={handleSignup}>Sign Up</button>
            </>)}
            { isSigningIn === true && (<>
                <button id="signupBtn" disabled={email === '' || password === '' || email.trim().length === 0 || password.trim().length === 0 ? true : false} onClick={handleSignin}>Sign In</button>
            </>)}
        </div>
    );
}
export default Login;