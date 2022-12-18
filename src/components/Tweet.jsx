import './Tweet.css';
function Tweet(props) {
    const date = new Date(props.date.toDate()).toLocaleString("en-GB", { hour12: false });
    const defaultAvatar = 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Twitter-logo.svg';
    return (
        <div className="tweet">
            <div className="tweetDate">{date}</div>
            <div className="tweetUsername">{props.userName} <img className="avatar" src={typeof props.avatar !== 'undefined' ? props.avatar : defaultAvatar}/></div>
            <div className="tweetBody">
                {props.content}
            </div>
        </div>
    )
}
export default Tweet;