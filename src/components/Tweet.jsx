import './Tweet.css';

function Tweet(props) {
    return (
        <div className="tweet">
            <div className="tweetDate">{props.date}</div>
            <div className="tweetUsername">{props.userName}</div>
            <div className="tweetBody">
                {props.content}
            </div>
        </div>
    )
}

export default Tweet;