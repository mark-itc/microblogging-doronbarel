import React, { useState, useReducer } from "react";
import { auth } from "../firebase";
export const TweetContext = React.createContext();
const initialState = {
    authUser: null,
    tweetsList: [],
    postInProgress: false,
    draftTweet: '',
    lastTweetLoaded: '',
}
export const ACTIONS = {
    AUTHENTICATE_USER: 'authenticate-user',
    LOGOUT_USER: 'logout-user',
    LOAD_TWEETS: 'load-tweets',
    LOAD_TWEETS_ON_SCROLL: 'load-tweets-on-scroll',
    TOGGLE_POST_IN_PROGRESS: 'toggle-post-in-progress',
    UPDATE_TWEET: 'update-tweet',
    LAST_TWEET_LOADED: 'last-tweet-loaded',
}
export function reducer(state, action) {
    switch(action.type) {
        case ACTIONS.AUTHENTICATE_USER:
            localStorage.setItem("username", auth.currentUser.uid);
            return { ...state, authUser: auth.currentUser.uid };
        case ACTIONS.LOGOUT_USER:
            auth.signOut();
            localStorage.removeItem("username");
            return { ...state, authUser: null };
        case ACTIONS.LOAD_TWEETS:
            return { ...state, tweetsList: action.payload };
        case ACTIONS.LOAD_TWEETS_ON_SCROLL:
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
    return (
        <TweetContext.Provider value={{ state, dispatch }}>
            {children}
        </TweetContext.Provider>
    );
};