'use client';

import "./PostCard.css"

export function PostCard({ post, onClick }) {
  const { title, description, image, author, avatar, time } = post

  return (
    <div className="post-card" onClick={onClick}>
      <div className="post-card-image">
        <img src={image || "/placeholder.svg"} alt={title} />
        <div className="post-card-image-overlay" />
      </div>
      
      <div className="post-card-content">
        <div className="post-card-text">
          <h4 className="post-card-title">{title}</h4>
          <p className="post-card-description">{description}</p>
        </div>
        
        <div className="post-card-footer">
          <div className="post-card-author">
            <div className="post-card-avatar">
              <img src={avatar || "/placeholder.svg"} alt={author} />
            </div>
            <span className="post-card-username">@{author}</span>
          </div>
          <span className="post-card-time">{time}</span>
        </div>
      </div>
    </div>
  )
}
