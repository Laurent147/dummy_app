import './card.css';

export const Card = ({ title, content, children }) => {
  return (
    <div className="card">
      {title && <h3 className="card-title">{title}</h3>}
      {content && <p className="card-content">{content}</p>}
      {children && <div className="card-body">{children}</div>}
    </div>
  );
};