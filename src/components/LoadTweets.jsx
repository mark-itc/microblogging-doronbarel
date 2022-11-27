import { useContext, useEffect } from "react";
import { TweetContext } from "../context/TweetContext";
import Tweet from "./Tweet";

function LoadTweets() {
    const { tweetList, setTweetList } = useContext(TweetContext);

    async function getFromStorage() {
        const tweetsInStorage = await localStorage.getItem('tweets');
        if(tweetsInStorage !== null) {
            setTweetList(JSON.parse(tweetsInStorage));
        }
    }

    function setLocalStorage() {
        localStorage.setItem("tweets", JSON.stringify(tweetList));
    }

    useEffect(() => {
        getFromStorage();
    }, [])

    useEffect(() => {
        setLocalStorage();
    }, [tweetList])

    return (
        tweetList.map((tweet) => (
            <Tweet
                key={tweet.date} 
                username={tweet.username}
                tweet={tweet.tweet}
                date={tweet.date} />
        ))
    )
}

export default LoadTweets;