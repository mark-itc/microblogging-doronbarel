import { useContext } from "react";
import { TweetContext, ACTIONS } from "../context/TweetContext";
import { collection as getCollection, addDoc, Timestamp } from 'firebase/firestore';
import { db, auth } from '../firebase';
import './CreateTweet.css';
function CreateTweet() {
    const { state, dispatch } = useContext(TweetContext);
    const maxTweetLength = 140;
    const handleInputChange = (event) => {
        dispatch({ type: ACTIONS.UPDATE_TWEET, payload: event.target.value })
    }
    const handleFormSubmit = (event) => {
        event.preventDefault();
        dispatch({ type: ACTIONS.TOGGLE_POST_IN_PROGRESS })
        const tweetData = {
            userName: auth.currentUser.email,
            content: state.draftTweet,
            date: Timestamp.now(),
            avatar: auth.currentUser.photoURL
        };
        console.log('tweetData', tweetData);
        const tweetsCollection = getCollection(db, 'Tweets');
        addDoc(tweetsCollection, tweetData);
        dispatch({ type: ACTIONS.UPDATE_TWEET, payload: '' });
        dispatch({ type: ACTIONS.TOGGLE_POST_IN_PROGRESS });
    }
    return (
        <div className="tweetForm">
            <form onSubmit={(event) => handleFormSubmit(event)}>
                <textarea id="tweetContent" rows="6" placeholder="What's on your mind?" value={state.draftTweet} onChange={(event) => handleInputChange(event)}/>
                <div className="loaderContainer" style={ state.postInProgress == true ? { display: 'block' } : { display: 'none' }}><div className="loader"></div></div>
                <button id="postTweetBtn" disabled={state.draftTweet.length > maxTweetLength || state.draftTweet.trim().length == 0 || state.draftTweet == '' || state.postInProgress == true ? true : false}>Tweet</button>
            </form>
            {state.draftTweet.length > maxTweetLength ? <div id="maxLengthError">The tweet can't contain more than {maxTweetLength} chars.</div> : ''}
        </div>
    )
}
export default CreateTweet;