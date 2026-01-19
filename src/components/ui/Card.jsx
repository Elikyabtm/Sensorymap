import { useState } from "react"
import { Icon } from "./Icon"
import "./Card.css"

export const Card = ({
  variant = "normal", // "normal" ou "certified"
  image,
  title,
  senses = { light: 25, sound: 25, crowd: 25 },
  isFavorite = false,
  onFavoriteClick,
  onClick,
  className = "",
}) => {
  const [favorite, setFavorite] = useState(isFavorite)

  const handleFavoriteClick = (e) => {
    e.stopPropagation()
    setFavorite(!favorite)
    if (onFavoriteClick) {
      onFavoriteClick(!favorite)
    }
  }

  // Calcule la hauteur de la barre de remplissage (max 30px)
  const getSenseHeight = (value) => {
    return Math.max(3, (value / 100) * 30)
  }

  return (
    <div className={`place-card ${variant === "certified" ? "place-card-certified" : ""} ${className}`} onClick={onClick}>
      {/* Zone image */}
      <div className="place-card-image-container">
        <img 
          src={image || "/placeholder.svg"} 
          alt={title} 
          className="place-card-image" 
        />
        <div className="place-card-image-overlay" />
        
        {/* Badge Lieu serein pour version certified */}
        {variant === "certified" && (
          <div className="place-card-badge">
            <Icon name="certified" size={17} color="#204040" />
            <span className="place-card-badge-text">Lieu serein</span>
          </div>
        )}
      </div>

      {/* Zone contenu */}
      <div className="place-card-content">
        <div className="place-card-title">{title}</div>
        
        <div className="place-card-footer">
          {/* Barres sensorielles verticales */}
          <div className="place-card-senses">
            {/* Lumiere - violet */}
            <div className="place-card-sense-bar">
              <div className="place-card-sense-bg sense-light-bg" />
              <div 
                className="place-card-sense-fill sense-light-fill" 
                style={{ height: `${getSenseHeight(senses.light)}px` }}
              />
            </div>
            
            {/* Bruit - orange */}
            <div className="place-card-sense-bar">
              <div className="place-card-sense-bg sense-sound-bg" />
              <div 
                className="place-card-sense-fill sense-sound-fill" 
                style={{ height: `${getSenseHeight(senses.sound)}px` }}
              />
            </div>
            
            {/* Foule - turquoise */}
            <div className="place-card-sense-bar">
              <div className="place-card-sense-bg sense-crowd-bg" />
              <div 
                className="place-card-sense-fill sense-crowd-fill" 
                style={{ height: `${getSenseHeight(senses.crowd)}px` }}
              />
            </div>
          </div>

          {/* Bouton favori */}
          <button className={`place-card-favorite ${favorite ? "active" : ""}`} onClick={handleFavoriteClick}>
            <Icon name={favorite ? "fullheart" : "heart"} size={21} color={favorite ? "#5165bdff" : "#5D82CF"} />
          </button>
        </div>
      </div>
    </div>
  )
}
