"use client"

import { Icon } from "./Icon"
import "./PlaceModal.css"

export const PlaceModal = ({ place, onClose }) => {
  if (!place) return null

  const isCertified = place.type === "certified"

  return (
    <>
      {/* Overlay transparent pour fermer au clic */}
      <div className="place-modal-overlay" onClick={onClose} />

      {/* Modal content */}
      <div className="place-modal-wrapper">
        <div className="place-modal">
          {/* Image du lieu */}
          <img src={place.imageUrl || "/placeholder.svg"} alt={place.name} className="place-modal-image" />

          {/* Contenu à droite */}
          <div className="place-modal-content">
            {/* Nom du lieu */}
            <div className="place-modal-header">
              <h3 className="place-modal-title">{place.name}</h3>
            </div>

            {/* Indicateurs de sens */}
            <div className="place-modal-senses">
              {/* Light */}
              <div className="sense-indicator">
                <div className="sense-icon">
                  <Icon name="warning" size={24} color="#000000" />
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

              {/* Sound */}
              <div className="sense-indicator">
                <div className="sense-icon">
                  <Icon name="sound" size={24} color="#000000" />
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

              {/* Crowd */}
              <div className="sense-indicator">
                <div className="sense-icon">
                  <Icon name="crowd" size={24} color="#000000" />
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

            {/* Bouton bookmark en position absolute */}
            <button className="place-modal-bookmark" aria-label="Sauvegarder">
              <Icon name="circle" size={13} color="#2D3A40" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default PlaceModal
