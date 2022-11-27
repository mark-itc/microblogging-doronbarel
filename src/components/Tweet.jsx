import './Tweet.css';

function Tweet(props) {
    return (
        <div className="tweet">
            <div className="tweetDate">{props.date}</div>
            <div className="tweetUsername">{props.username}</div>
            <div className="tweetBody">
                {props.tweet}
            </div>
        </div>
    )
}

export default Tweet;