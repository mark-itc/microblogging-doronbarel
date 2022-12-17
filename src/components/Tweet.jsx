import './Tweet.css';
function Tweet(props) {
    let date = new Date(props.date.toDate()).toLocaleString("en-GB", { hour12: false });
    return (
        <div className="tweet">
            <div className="tweetDate">{date}</div>
            <div className="tweetUsername">{props.userName}</div>
            <div className="tweetBody">
                {props.content}
            </div>
        </div>
    )
}
export default Tweet;