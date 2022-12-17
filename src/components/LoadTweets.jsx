import { useContext, useEffect } from "react";
import { collection, getDocs, query, orderBy, onSnapshot, startAfter, limit } from 'firebase/firestore';
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

    async function initialFetch() {
        const tweetsCollection = collection(db, COLLECTION_NAME);
        const tweetsQuery = query(tweetsCollection, orderBy(ORDER_TWEETS_BY, ORDER), limit(RESULTS_PER_PAGE));
        let firestoreTweets = [];
        let lastViewedTweet = '';
        const unsubscribe = onSnapshot(tweetsQuery, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                firestoreTweets.push({ id: doc.id, ...doc.data() });
                lastViewedTweet = doc;
                console.log('lasttweet', lastViewedTweet.data().date);
            });
            console.log('sending from initial fetch', firestoreTweets);
            dispatch({ type: ACTIONS.LAST_TWEET_LOADED, payload: lastViewedTweet });
            dispatch({ type: ACTIONS.LOAD_TWEETS, payload: firestoreTweets});
        });
    }

    async function scrollFetch() {
        const tweetsCollection = collection(db, COLLECTION_NAME);
        let  tweetsQuery = '';
        console.log('lastTweetLoaded!!!', state.lastTweetLoaded);
        tweetsQuery = query(tweetsCollection, orderBy(ORDER_TWEETS_BY, ORDER), startAfter(state.lastTweetLoaded), limit(RESULTS_PER_PAGE));
        let firestoreTweets = [];
        let lastViewedTweet;
        const unsubscribe = onSnapshot(tweetsQuery, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                firestoreTweets.push({ id: doc.id, ...doc.data() });
                lastViewedTweet = doc;
            });
            //lastViewedTweet = querySnapshot.docs[querySnapshot.docs.length-1];
            dispatch({ type: ACTIONS.LAST_TWEET_LOADED, payload: lastViewedTweet });
            dispatch({ type: ACTIONS.LOAD_TWEETS, payload: firestoreTweets});
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
                    key={tweet.id + Math.random()} 
                    id={tweet.id}
                    userName={tweet.userName}
                    content={tweet.content}
                    date={tweet.date} />
            ))}
        </>
    )
}
export default LoadTweets;