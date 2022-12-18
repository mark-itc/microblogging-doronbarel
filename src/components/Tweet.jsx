import './Tweet.css';
function Tweet(props) {
    let date = new Date(props.date.toDate()).toLocaleString("en-GB", { hour12: false });
    console.log('avatar', typeof props.avatar === 'undefined')
    return (
        <div className="tweet">
            <div className="tweetDate">{date}</div>
            <div className="tweetUsername">{props.userName} <img className="avatar" src={typeof props.avatar !== 'undefined' ? props.avatar : 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Twitter-logo.svg'}/></div>
            <div className="tweetBody">
                {props.content}
            </div>
        </div>
    )
}
export default Tweet;