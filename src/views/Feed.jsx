import CreateTweet from "../components/CreateTweet";
import LoadTweets from "../components/LoadTweets";

import './Feed.css';

function Feed() {
    return (
        <div className="container">
            <CreateTweet />
            <LoadTweets />
        </div>
    );
}

export default Feed;