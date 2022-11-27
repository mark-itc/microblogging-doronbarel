import React, { useState } from "react";
  
export const TweetContext = React.createContext();
export const TweetContextProvider = ({ children }) => {
    const [tweetList, setTweetList] = useState([]);
    return (
        <TweetContext.Provider value={{ tweetList, setTweetList }}>
            {children}
        </TweetContext.Provider>
    );
};