import './comment.css';  // Styling for the Comment component

export const Comment = ({ author, body, date }) => {
  return (
    <div className="comment">
      <div className="comment-header">
        <strong>{author}</strong> <small>{date}</small>
      </div>
      <p className="comment-text">{body}</p>
    </div>
  );
};