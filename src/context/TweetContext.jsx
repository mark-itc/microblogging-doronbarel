import React, { useState } from "react";
  
export const TweetContext = React.createContext();
export const TweetContextProvider = ({ children }) => {
    const [tweet, setTweet] = useState('');
    const [postInProgress, setPostInProgress] = useState(false);
    const [tweetList, setTweetList] = useState([]);
    const [authUser, setAuthUser] = useState('');
    return (
        <TweetContext.Provider value={{ tweet, setTweet, postInProgress, setPostInProgress, tweetList, setTweetList, authUser, setAuthUser }}>
            {children}
        </TweetContext.Provider>
    );
};