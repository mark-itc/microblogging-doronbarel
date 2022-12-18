import CreateTweet from "../components/CreateTweet";
import LoadTweets from "../components/LoadTweets";
import Login from "../components/Login";
import { auth } from '../firebase';
import './Feed.css';
function Feed() {
    return (
        <div className="container">
            {auth.currentUser !== null && (
                <>
                    <CreateTweet />
                    <LoadTweets />
                </>
            )}
            {auth.currentUser === null && (
                <>
                    <Login />
                </>
            )}
        </div>
    );
}
export default Feed;