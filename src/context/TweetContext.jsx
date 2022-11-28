import React, { useState } from "react";
  
export const TweetContext = React.createContext();
export const TweetContextProvider = ({ children }) => {
    const [tweetList, setTweetList] = useState([]);
    const [authUser, setAuthUser] = useState('');
    return (
        <TweetContext.Provider value={{ tweetList, setTweetList, authUser, setAuthUser }}>
            {children}
        </TweetContext.Provider>
    );
};