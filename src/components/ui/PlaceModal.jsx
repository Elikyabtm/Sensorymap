import { useState } from "react"
import { Icon } from "./Icon"
import "./PlaceModal.css"

export const PlaceModal = ({ place, onClose, onOpenDetails }) => {
  const [isFavorite, setIsFavorite] = useState(false)

  if (!place) return null

  const isCertified = place.type === "certified"

  const handleFavoriteClick = (e) => {
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  const handleModalClick = (e) => {
    if (e.target.closest(".place-modal-bookmark") || e.target.closest(".place-modal-overlay")) {
      return
    }
    if (onOpenDetails) {
      onOpenDetails(place)
    }
  }

  const handleLearnMoreClick = (e) => {
    e.stopPropagation()

  }

  return (
    <>
      <div className="place-modal-overlay" onClick={onClose} />

      <div className="place-modal-wrapper">
        <div 
          className={`place-modal ${isCertified ? 'place-modal-certified' : ''}`} 
          onClick={handleModalClick}
        >
          <div className="place-modal-image-container">
            <img 
              src={place.imageUrl || place.image || "/placeholder.svg"} 
              alt={place.name} 
              className="place-modal-image" 
            />
            <div className="place-modal-image-overlay" />
            
            {isCertified && (
              <div className="place-modal-badge">
                <Icon name="certified" size={17} color="#204040" />
                <span className="place-modal-badge-text">Lieu serein</span>
              </div>
            )}
          </div>

          <div className="place-modal-content">
            <div className="place-modal-header">
              <h3 className="place-modal-title">{place.name}</h3>
            </div>

            <div className="place-modal-footer">
              <div className="place-modal-senses">
                {/* Light */}
                <div className="sense-row">
                  <div className="sense-icon">
                    <Icon name="light" size={18} color="#9A7AC1" />
                  </div>
                  <div className="sense-bar-wrapper">
                    <div className="sense-bar-bg sense-bar-light" />
                    <div 
                      className="sense-bar-fill sense-bar-light-fill" 
                      style={{ width: `${Math.max(8, (place.senses?.light || 10) / 100 * 92)}px` }}
                    />
                  </div>
                </div>

                {/* Noise/Sound */}
                <div className="sense-row">
                  <div className="sense-icon">
                    <Icon name="sound" size={18} color="#D77A4F" />
                  </div>
                  <div className="sense-bar-wrapper">
                    <div className="sense-bar-bg sense-bar-noise" />
                    <div 
                      className="sense-bar-fill sense-bar-noise-fill" 
                      style={{ width: `${Math.max(8, (place.senses?.sound || 10) / 100 * 92)}px` }}
                    />
                  </div>
                </div>

                {/* Crowd */}
                <div className="sense-row">
                  <div className="sense-icon">
                    <Icon name="crowd" size={18} color="#4FA1A1" />
                  </div>
                  <div className="sense-bar-wrapper">
                    <div className="sense-bar-bg sense-bar-crowd" />
                    <div 
                      className="sense-bar-fill sense-bar-crowd-fill" 
                      style={{ width: `${Math.max(8, (place.senses?.crowd || 10) / 100 * 92)}px` }}
                    />
                  </div>
                </div>
              </div>

              <button 
                className="place-modal-bookmark" 
                aria-label="Sauvegarder" 
                onClick={handleFavoriteClick}
              >
                <Icon 
                  name={isFavorite ? "fullheart" : "heart"} 
                  size={21} 
                  color="#5D82CF" 
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PlaceModal
