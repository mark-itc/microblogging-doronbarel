import { useContext } from "react";
import { TweetContext } from "../context/TweetContext";
import './CreateTweet.css';

function CreateTweet() {
    const { tweet, setTweet, postInProgress, setPostInProgress, authUser, setAuthUser } = useContext(TweetContext);

    const maxTweetLength = 140;

    const handleInputChange = (event) => {
        setTweet(event.target.value);
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        setPostInProgress(true);
        const tweetData = {
            userName: authUser,
            content: tweet,
            date: new Date().toISOString()
        };
        const fetchURL = 'https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet';
        const postData = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tweetData)
        };
        const fetchPostData = fetch(fetchURL, postData).then(setPostInProgress(false)).catch((error) => { 
            console.warn(`Failed to post Tweet: ${error}`);
            setPostInProgress(false);
        });
    }

    return (
        <div className="tweetForm">
            <form onSubmit={(event) => handleFormSubmit(event)}>
                <textarea id="tweetContent" rows="6" placeholder="What's on your mind?" onChange={(event) => handleInputChange(event)}/>
                <div className="loaderContainer" style={ postInProgress == true ? { display: 'block' } : { display: 'none' }}><div className="loader"></div></div>
                <button id="postTweetBtn" disabled={tweet.length > maxTweetLength || tweet == '' || postInProgress == true ? true : false}>Tweet</button>
            </form>
            {tweet.length > maxTweetLength ? <div id="maxLengthError">The tweet can't contain more than {maxTweetLength} chars.</div> : ''}
        </div>
    )
}

export default CreateTweet;