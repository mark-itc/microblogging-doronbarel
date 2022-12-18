import { useContext, useEffect } from "react";
import { collection, query, orderBy, onSnapshot, startAfter, limit } from 'firebase/firestore';
import { db } from '../firebase';
import { TweetContext, ACTIONS } from "../context/TweetContext";
import { BottomScrollListener } from "react-bottom-scroll-listener";
import Tweet from "./Tweet";
const CONFIG = {
    RESULTS_PER_PAGE: 10,
    COLLECTION_NAME: 'Tweets',
    ORDER_TWEETS_BY: 'date',
    ORDER: 'desc',
    INITIAL_FETCH: 'initial-fetch',
    SCROLL_FETCH: 'scroll-fetch'
}
function LoadTweets() {
    const { state, dispatch } = useContext(TweetContext);
    const tweetsCollection = collection(db, CONFIG.COLLECTION_NAME);        
    let fetchQuery = '';
    async function fetchTweets(fetchType) {
        if(fetchType === CONFIG.INITIAL_FETCH) {
            fetchQuery = query(tweetsCollection, orderBy(CONFIG.ORDER_TWEETS_BY, CONFIG.ORDER), limit(CONFIG.RESULTS_PER_PAGE));
        } else {
            fetchQuery = query(tweetsCollection, orderBy(CONFIG.ORDER_TWEETS_BY, CONFIG.ORDER), startAfter(state.lastTweetLoaded), limit(CONFIG.RESULTS_PER_PAGE));
        }
        let lastViewedTweet = '';
        onSnapshot(fetchQuery, (querySnapshot) => {
            let firestoreTweets = [];
            querySnapshot.forEach((doc) => {
                firestoreTweets.push({ id: doc.id, ...doc.data() });
                lastViewedTweet = doc;
            });
            dispatch({ type: ACTIONS.LAST_TWEET_LOADED, payload: lastViewedTweet });
            if(fetchType === CONFIG.INITIAL_FETCH) {
                dispatch({ type: ACTIONS.LOAD_TWEETS, payload: firestoreTweets });
            } else {
                dispatch({ type: ACTIONS.LOAD_TWEETS_ON_SCROLL, payload: firestoreTweets });
            }
        });
    }
    useEffect(() => {
        fetchTweets(CONFIG.INITIAL_FETCH);
    }, []);
    return (
        <>
            <BottomScrollListener onBottom={() => fetchTweets(CONFIG.SCROLL_FETCH)} />
            {state.tweetsList.map((tweet) => (
                <Tweet
                    key={tweet.id} 
                    id={tweet.id}
                    userName={tweet.userName}
                    content={tweet.content}
                    date={tweet.date} 
                    avatar={tweet.avatar}/>
            ))}
        </>
    )
}
export default LoadTweets;