import React, { useState, useReducer } from "react";
export const TweetContext = React.createContext();

const initialState = {
    authUser: '',
    tweetsList: [],
    postInProgress: false,
    draftTweet: '',
    lastTweetLoaded: '',
}

export const ACTIONS = {
    AUTHENTICATE_USER: 'authenticate-user',
    LOAD_TWEETS: 'load-tweets',
    LOAD_TWEETS_ON_SCROLL: 'load-tweets-on-scroll',
    TOGGLE_POST_IN_PROGRESS: 'toggle-post-in-progress',
    UPDATE_TWEET: 'update-tweet',
    LAST_TWEET_LOADED: 'last-tweet-loaded',
}

export function reducer(state, action) {
    switch(action.type) {
        case ACTIONS.AUTHENTICATE_USER:
            return { ...state, authUser: action.payload.uid };
        case ACTIONS.LOAD_TWEETS:
            //[...state.tweetsList, ...action.payload]
            return { ...state, tweetsList: action.payload };
        case ACTIONS.LOAD_TWEETS_ON_SCROLL:
            //[...state.tweetsList, ...action.payload]
            return { ...state, tweetsList: [...state.tweetsList, ...action.payload] };
        case ACTIONS.TOGGLE_POST_IN_PROGRESS:
            return { ...state, postInProgress: !state.postInProgress };
        case ACTIONS.UPDATE_TWEET:
            return { ...state, draftTweet: action.payload };
        case ACTIONS.LAST_TWEET_LOADED:
            return { ...state, lastTweetLoaded: action.payload };
        default:
            return state;
    }
}

export const TweetContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [tweet, setTweet] = useState('');
    const [postInProgress, setPostInProgress] = useState(false);
    const [tweetList, setTweetList] = useState([]);
    const [authUser, setAuthUser] = useState('');
    return (
        <TweetContext.Provider value={{ tweet, setTweet, postInProgress, setPostInProgress, tweetList, setTweetList, authUser, setAuthUser, state, dispatch }}>
            {children}
        </TweetContext.Provider>
    );
};