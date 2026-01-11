"use client"

import { useState } from "react"
import { Icon } from "./ui/Icon"
import SenseBadge from "./ui/SenseBadge"
import "../styles/PlaceDetailsPage.css"

export default function PlaceDetailsPage({ place, onClose }) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [activeTab, setActiveTab] = useState("sens")
  const [timeSliderValue, setTimeSliderValue] = useState(15) // 15h par défaut
  const [daySliderValue, setDaySliderValue] = useState(4) // Vendredi = index 4

  if (!place) return null

  const days = ["lun", "mar", "mer", "jeu", "ven", "sam", "dim"]
  const currentDay = days[daySliderValue]

  // Convertir la valeur du slider (0-24h) en heure affichable
  const formatHour = (value) => {
    const hour = Math.floor(value)
    return `${hour} h`
  }

  // Fonction pour déterminer le niveau de sens (lower, low, medium, high)
  const getSenseLevel = (value) => {
    if (value <= 15) return "lower"
    if (value <= 30) return "low"
    if (value <= 60) return "medium"
    return "high"
  }

  // Fonction pour obtenir le label textuel du sens
  const getSenseLabel = (type, value) => {
    if (type === "light") {
      if (value <= 25) return "Peu lumineux"
      if (value <= 50) return "Assez lumineux"
      return "Très lumineux"
    }
    if (type === "sound") {
      if (value <= 25) return "Pas bruyant"
      if (value <= 50) return "Assez bruyant"
      return "Très bruyant"
    }
    if (type === "crowd") {
      if (value <= 25) return "Peu fréquenté"
      if (value <= 50) return "Moyennement fréquenté"
      return "Très fréquenté"
    }
  }

  return (
    <div className="place-details-page">
      {/* Image de couverture */}
      <div className="place-details-header-image">
        <img src={place.imageUrl || "/placeholder.svg?height=249&width=393"} alt={place.name} />

        {/* Bouton Favoris */}
        <button
          className="place-details-favorite-btn"
          onClick={() => setIsFavorite(!isFavorite)}
          aria-label="Ajouter aux favoris"
        >
          <Icon name={isFavorite ? "fullheart" : "heart"} size={28} color="#2D3A40" />
        </button>

        {/* Bouton Fermer */}
        <button className="place-details-close-btn" onClick={onClose} aria-label="Fermer">
          <Icon name="close" size={28} color="#2D3A40" />
        </button>
      </div>

      {/* Contenu scrollable */}
      <div className="place-details-content">
        {/* Titre et adresse */}
        <div className="place-details-info">
          <h1 className="place-details-name">{place.name}</h1>
          <div className="place-details-address">
            <Icon name="location" size={20} color="#5E5E5E" />
            <span>{place.address}</span>
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="place-details-actions">
          <button className="place-action-btn">
            <Icon name="contact" size={21} color="#272727" />
            <span>Contacter</span>
          </button>
          <button className="place-action-btn">
            <Icon name="web" size={21} color="#272727" />
            <span>Site web</span>
          </button>
          <button className="place-action-btn">
            <Icon name="share" size={21} color="#272727" />
            <span>Partager</span>
          </button>
        </div>

        {/* Onglets */}
        <div className="place-details-tabs">
          <button className={`place-tab ${activeTab === "sens" ? "active" : ""}`} onClick={() => setActiveTab("sens")}>
            Sens
          </button>
          <button
            className={`place-tab ${activeTab === "community" ? "active" : ""}`}
            onClick={() => setActiveTab("community")}
          >
            Communauté
          </button>
        </div>

        {/* Contenu des onglets */}
        {activeTab === "sens" && (
          <div className="place-details-sense-section">
            {/* Section intensité sensorielle */}
            <div className="sense-intensity-card">
              <div className="sense-intensity-header">
                <div className="sense-intensity-title-wrapper">
                  <h2 className="sense-intensity-title">Intensité sensorielle</h2>
                  <p className="sense-intensity-time">
                    {currentDay.charAt(0).toUpperCase() + currentDay.slice(1)} {formatHour(timeSliderValue)}
                  </p>
                </div>
                <button className="sense-evaluate-btn">Évaluer</button>
              </div>

              {/* Barres de sens */}
              <div className="sense-bars-list">
                {/* Lumière */}
                <div className="sense-bar-item">
                  <div className="sense-bar-icon">
                    <SenseBadge type="light" variant="description" size={28} />
                  </div>
                  <div className="sense-bar-info">
                    <p className="sense-bar-label">{getSenseLabel("light", place.senses.light)}</p>
                    <div className="sense-bar-wrapper">
                      <div className="sense-bar-bg" style={{ background: "#FAE2C5" }} />
                      <div
                        className="sense-bar-fill"
                        style={{
                          width: `${place.senses.light}%`,
                          background: "#E79A48",
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Son */}
                <div className="sense-bar-item">
                  <div className="sense-bar-icon">
                    <SenseBadge type="sound" variant="description" size={28} />
                  </div>
                  <div className="sense-bar-info">
                    <p className="sense-bar-label">{getSenseLabel("sound", place.senses.sound)}</p>
                    <div className="sense-bar-wrapper">
                      <div className="sense-bar-bg" style={{ background: "#D3EDED" }} />
                      <div
                        className="sense-bar-fill"
                        style={{
                          width: `${place.senses.sound}%`,
                          background: "#8DB8BE",
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Foule */}
                <div className="sense-bar-item">
                  <div className="sense-bar-icon">
                    <SenseBadge type="crowd" variant="description" size={28} />
                  </div>
                  <div className="sense-bar-info">
                    <p className="sense-bar-label">{getSenseLabel("crowd", place.senses.crowd)}</p>
                    <div className="sense-bar-wrapper">
                      <div className="sense-bar-bg" style={{ background: "#EDE9FB" }} />
                      <div
                        className="sense-bar-fill"
                        style={{
                          width: `${place.senses.crowd}%`,
                          background: "#A27DEB",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Slider heure */}
            <div className="time-slider-section">
              <div className="slider-label-container">
                <span className="slider-label">{formatHour(timeSliderValue)}</span>
              </div>
              <div className="slider-container">
                <Icon name="sun" size={21} color="#5E5E5E" />
                <input
                  type="range"
                  min="0"
                  max="23"
                  value={timeSliderValue}
                  onChange={(e) => setTimeSliderValue(Number(e.target.value))}
                  className="time-slider"
                />
                <Icon name="moon" size={21} color="#5E5E5E" />
              </div>
            </div>

            {/* Slider jour */}
            <div className="day-slider-section">
              <div className="slider-label-container">
                <span className="slider-label">{currentDay.charAt(0).toUpperCase() + currentDay.slice(1)}</span>
              </div>
              <div className="slider-container">
                <span className="day-label">lun</span>
                <input
                  type="range"
                  min="0"
                  max="6"
                  value={daySliderValue}
                  onChange={(e) => setDaySliderValue(Number(e.target.value))}
                  className="day-slider"
                />
                <span className="day-label">dim</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "community" && (
          <div className="place-details-community-section">
            <p style={{ padding: "20px", color: "#5E5E5E" }}>Contenu de la communauté à venir...</p>
          </div>
        )}
      </div>
    </div>
  )
}
