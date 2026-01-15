"use client"

import { useState } from "react"
import { Icon } from "./Icon"
import "./PlaceModal.css"

export const PlaceModal = ({ place, onClose, onOpenDetails }) => {
  const [isFavorite, setIsFavorite] = useState(false)

  if (!place) return null

  const isCertified = place.type === "certified"

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite)
  }

  const handleModalClick = (e) => {
    // Ne pas ouvrir si on clique sur le bookmark ou le bouton de fermeture
    if (e.target.closest(".place-modal-bookmark") || e.target.closest(".place-modal-overlay")) {
      return
    }
    if (onOpenDetails) {
      onOpenDetails(place)
    }
  }

  return (
    <>
      <div className="place-modal-overlay" onClick={onClose} />

      <div className="place-modal-wrapper">
        <div className="place-modal" onClick={handleModalClick} style={{ cursor: "pointer" }}>
          <div style={{ position: "relative", width: "143px", height: "100%" }}>
            <img src={place.imageUrl || "/placeholder.svg"} alt={place.name} className="place-modal-image" />
          </div>

          <div className="place-modal-content">
            <div className="place-modal-header">
              <h3 className="place-modal-title">{place.name}</h3>
            </div>

            <div style={{ display: "flex", alignItems: "flex-end", gap: "12px", width: "100%" }}>
              <div className="place-modal-senses">
                {/* Sound */}
                <div className="sense-indicator">
                  <div className="sense-icon">
                    <Icon name="sound" size={18} color="#E79A48" />
                  </div>
                  <div className="sense-bar-container">
                    <div className="sense-bar-bg" style={{ background: "rgba(245, 197, 139, 0.50)" }} />
                    <div
                      className="sense-bar-fill"
                      style={{
                        width: `${(place.senses.light / 100) * 90}px`,
                        background: "#E79A48",
                      }}
                    />
                  </div>
                </div>

                {/* Crowd */}
                <div className="sense-indicator">
                  <div className="sense-icon">
                    <Icon name="crowd" size={18} color="#8DB8BE" />
                  </div>
                  <div className="sense-bar-container">
                    <div className="sense-bar-bg" style={{ background: "rgba(168, 218, 220, 0.50)" }} />
                    <div
                      className="sense-bar-fill"
                      style={{
                        width: `${(place.senses.sound / 100) * 90}px`,
                        background: "#8DB8BE",
                      }}
                    />
                  </div>
                </div>

                {/* Light */}
                <div className="sense-indicator">
                  <div className="sense-icon">
                    <Icon name="light" size={18} color="#A27DEB" />
                  </div>
                  <div className="sense-bar-container">
                    <div className="sense-bar-bg" style={{ background: "rgba(220, 211, 246, 0.50)" }} />
                    <div
                      className="sense-bar-fill"
                      style={{
                        width: `${(place.senses.crowd / 100) * 90}px`,
                        background: "#A27DEB",
                      }}
                    />
                  </div>
                </div>
              </div>

              <button className="place-modal-bookmark" aria-label="Sauvegarder" onClick={handleFavoriteClick}>
                <Icon name={isFavorite ? "fullheart" : "heart"} size={20} color="#2D3A40" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PlaceModal
