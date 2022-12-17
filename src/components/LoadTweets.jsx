import { useContext, useEffect } from "react";
import { collection, query, orderBy, onSnapshot, startAfter, limit } from 'firebase/firestore';
import { db } from '../firebase';
import { TweetContext, ACTIONS } from "../context/TweetContext";
import { BottomScrollListener } from "react-bottom-scroll-listener";
import Tweet from "./Tweet";
const RESULTS_PER_PAGE = 10;
const COLLECTION_NAME = 'Tweets';
const ORDER_TWEETS_BY = 'date';
const ORDER = 'desc';
function LoadTweets() {
    const { state, dispatch } = useContext(TweetContext);
    const tweetsCollection = collection(db, COLLECTION_NAME);        
    async function initialFetch() {
        const initialTweetsQuery = query(tweetsCollection, orderBy(ORDER_TWEETS_BY, ORDER), limit(RESULTS_PER_PAGE));
        let lastViewedTweet = '';
        onSnapshot(initialTweetsQuery, (querySnapshot) => {
            let firestoreTweets = [];
            querySnapshot.forEach((doc) => {
                firestoreTweets.push({ id: doc.id, ...doc.data() });
                lastViewedTweet = doc;
            });
            dispatch({ type: ACTIONS.LAST_TWEET_LOADED, payload: lastViewedTweet });
            dispatch({ type: ACTIONS.LOAD_TWEETS, payload: firestoreTweets });
        });
    }
    async function scrollFetch() {
        const scrollTweetsQuery = query(tweetsCollection, orderBy(ORDER_TWEETS_BY, ORDER), startAfter(state.lastTweetLoaded), limit(RESULTS_PER_PAGE));
        onSnapshot(scrollTweetsQuery, (querySnapshot) => {
            let firestoreTweets = [];
            let lastViewedTweet = '';
            querySnapshot.forEach((doc) => {
                firestoreTweets.push({ id: doc.id, ...doc.data() });
                lastViewedTweet = doc;
            });
            dispatch({ type: ACTIONS.LAST_TWEET_LOADED, payload: lastViewedTweet });
            dispatch({ type: ACTIONS.LOAD_TWEETS_ON_SCROLL, payload: firestoreTweets });
        });
    }
    useEffect(() => {
        initialFetch();
    }, []);
    return (
        <>
            <BottomScrollListener onBottom={scrollFetch} />
            {state.tweetsList.map((tweet) => (
                <Tweet
                    key={tweet.id} 
                    id={tweet.id}
                    userName={tweet.userName}
                    content={tweet.content}
                    date={tweet.date} />
            ))}
        </>
    )
}
export default LoadTweets;