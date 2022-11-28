import { useContext, useEffect } from "react";
import { TweetContext } from "../context/TweetContext";
import Tweet from "./Tweet";
function LoadTweets() {
    const { tweetList, setTweetList } = useContext(TweetContext);
    function fetchTweets() {
        const fetchURL = 'https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet';
        const fetchedData = fetch(fetchURL);
        fetchedData.then((response) => {
            if(response.status == 200) {
                response.json().then((result) => {
                    setTweetList(result.tweets);
                })
            } else {
                response.text().then(error => {
                    console.log(error);
                });
            }
        });
    }
    useEffect(() => {
        setInterval(fetchTweets, 500);
    }, []);
    return (
        tweetList.map((tweet) => (
            <Tweet
                key={tweet.date} 
                userName={tweet.userName}
                content={tweet.content}
                date={tweet.date} />
        ))
    )
}
export default LoadTweets;