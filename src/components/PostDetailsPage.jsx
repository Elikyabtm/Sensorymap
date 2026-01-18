"use client"

import { useState } from "react"
import { Icon } from "./ui"
import "../styles/PostDetailsPage.css"

export default function PostDetailsPage({ post, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(post?.likes || 3)
  const [showSensoryScore, setShowSensoryScore] = useState(false)
  const [comment, setComment] = useState("")

  if (!post) return null

  const images = post.images || [
    post.image || "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=500&fit=crop",
  ]

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1))
  }

  const getSenseLabel = (type, value) => {
    if (value <= 33) {
      if (type === "light") return "Peu lumineux"
      if (type === "sound") return "Peu bruyant"
      if (type === "crowd") return "Peu de monde"
    } else if (value <= 66) {
      if (type === "light") return "Luminosité modérée"
      if (type === "sound") return "Bruit modéré"
      if (type === "crowd") return "Affluence modérée"
    } else {
      if (type === "light") return "Très lumineux"
      if (type === "sound") return "Très bruyant"
      if (type === "crowd") return "Beaucoup de monde"
    }
  }

  const senses = {
    light: post.senses?.light || 25,
    sound: post.senses?.sound || 45,
    crowd: post.senses?.crowd || 20,
  }

  return (
    <div className="post-details-page">
      {/* Image carousel */}
      <div className="post-details-hero">
        <img
          src={images[currentImageIndex] || "/placeholder.svg"}
          alt={post.title}
          className="post-details-hero-image"
        />

        {/* Close button */}
        <button className="post-details-close" onClick={onClose}>
          <Icon name="close" size={24} color="#2A3556" />
        </button>

        {/* Carousel dots */}
        <div className="post-details-dots">
          {[0, 1, 2].map((index) => (
            <button
              key={index}
              className={`post-details-dot ${index === currentImageIndex ? "active" : ""}`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="post-details-content">
        {/* User info */}
        <div className="post-details-user-section">
          <div className="post-details-user">
            <img
              src={post.user?.avatar || "/placeholder.svg?height=48&width=48&query=woman pink hair avatar"}
              alt={post.user?.name}
              className="post-details-avatar"
            />
            <div className="post-details-user-info">
              <div className="post-details-user-row">
                <span className="post-details-username">@{post.user?.name || "user34"}</span>
                <span className="post-details-badge">EXPLORATEUR</span>
              </div>
            </div>
          </div>
          <span className="post-details-time">{post.time || "3 jours"}</span>
        </div>

        {/* Address */}
        <div className="post-details-address">
          <Icon name="position" size={16} color="#445E9A" />
          <span>{post.address || "17 avenue de la République, 75012 PARIS"}</span>
        </div>

        {/* Post content */}
        <p className="post-details-text">
          {post.content ||
            "Avoir un lieu aussi incluant et soucieux des personnes sensibles c'est une bénédiction.Avoir un lieu aussi incluant et soucieux des personnes sensibles c'est une bénédiction.Avoir un lieu aussi incluant et soucieux des personnes sensibles c'est une bénédiction."}
        </p>

        {/* Separator */}
        <div className="post-details-separator" />

        {/* Sensory score */}
        <div className="post-details-sensory-section">
          <button className="post-details-sensory-header" onClick={() => setShowSensoryScore(!showSensoryScore)}>
            <span className="post-details-sensory-title">Score sensoriel</span>
            <Icon name={showSensoryScore ? "chevronUp" : "chevronDown"} size={20} color="#2A3556" />
          </button>

          {showSensoryScore && (
            <div className="sense-bars-container">
              <div className="sense-bar-row">
                <div className="sense-bar-icon-wrapper">
                  <Icon name="light" size={24} color="#9A7AC1" />
                </div>
                <div className="sense-bar-content">
                  <p className="sense-bar-label">{getSenseLabel("light", senses.light)}</p>
                  <div className="sense-progress-bar">
                    <div className="sense-progress-bg" style={{ background: "rgba(154, 122, 193, 0.20)" }} />
                    <div
                      className="sense-progress-fill"
                      style={{
                        width: `${(100 - senses.light) * 2.77}px`,
                        background: "#9A7AC1",
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="sense-bar-row">
                <div className="sense-bar-icon-wrapper">
                  <Icon name="sound" size={24} color="#D77A4F" />
                </div>
                <div className="sense-bar-content">
                  <p className="sense-bar-label">{getSenseLabel("sound", senses.sound)}</p>
                  <div className="sense-progress-bar">
                    <div className="sense-progress-bg" style={{ background: "rgba(215, 122, 79, 0.20)" }} />
                    <div
                      className="sense-progress-fill"
                      style={{
                        width: `${(100 - senses.sound) * 2.77}px`,
                        background: "#D77A4F",
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="sense-bar-row">
                <div className="sense-bar-icon-wrapper">
                  <Icon name="crowd" size={24} color="#4FA1A1" />
                </div>
                <div className="sense-bar-content">
                  <p className="sense-bar-label">{getSenseLabel("crowd", senses.crowd)}</p>
                  <div className="sense-progress-bar">
                    <div className="sense-progress-bg" style={{ background: "rgba(79, 161, 161, 0.20)" }} />
                    <div
                      className="sense-progress-fill"
                      style={{
                        width: `${(100 - senses.crowd) * 2.77}px`,
                        background: "#4FA1A1",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="post-details-separator" />

        {/* Comments section */}
        <div className="post-details-comments-section">
          <h3 className="post-details-comments-title">Comments</h3>

          <div className="post-details-comments-list">
            {post.comments?.map((c) => (
              <div key={c.id} className="post-details-comment">
                <img src={c.avatar || "/placeholder.svg"} alt={c.user} className="post-details-comment-avatar" />
                <div className="post-details-comment-content">
                  <div className="post-details-comment-header">
                    <div className="post-details-comment-user-info">
                      <span className="post-details-comment-username">@{c.user}</span>
                      <span className="post-details-comment-time">{c.time}</span>
                    </div>
                    <button className="post-details-comment-menu">
                      <Icon name="dots" size={20} color="#2A3556" />
                    </button>
                  </div>
                  <p className="post-details-comment-text">{c.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="post-details-footer">
        <button className="post-details-like-btn" onClick={handleLike}>
          <Icon name={isLiked ? "fullheart" : "heart"} size={24} color="#445E9A" />
        </button>
        <span className="post-details-like-count">{likesCount}</span>

        <div className="post-details-comment-input">
          <input type="text" placeholder="Commentaire" value={comment} onChange={(e) => setComment(e.target.value)} />
        </div>
      </div>
    </div>
  )
}
