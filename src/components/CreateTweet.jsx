import { useState, useContext } from "react";
import { TweetContext } from "../context/TweetContext";
import './CreateTweet.css';

function CreateTweet() {
    const [tweet, setTweet] = useState('');
    const { tweetList, setTweetList } = useContext(TweetContext);
    
    const handleInputChange = (event) => {
        setTweet(event.target.value);
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        setTweetList((prevState) => [
            {
                username:'Doron',
                tweet: tweet,
                date: new Date().toISOString()
            },
            ...prevState
            ])
    }

    return (
        <div className="tweetForm">
            <form onSubmit={(event) => handleFormSubmit(event)}>
                <textarea id="tweetContent" rows="6" placeholder="What's on your mind?" onChange={(event) => handleInputChange(event)}/>
                <button id="postTweetBtn" disabled={tweet.length > 140 || tweet.length == 0 ? true : false}>Tweet</button>
            </form>
            {tweet.length > 140 ? <div id="maxLengthError">The tweet can't contain more than 140 chars.</div> : ''}
        </div>
    )
}

export default CreateTweet;