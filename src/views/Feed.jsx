import CreateTweet from "../components/CreateTweet";
import LoadTweets from "../components/LoadTweets";
import './Feed.css';

function Feed() {
    function fetchMoreTweets() {
        console.log('fetching more now');
    }
    return (
        <div className="container">
            <CreateTweet />
            <LoadTweets />
        </div>
    );
}

export default Feed;