"use client"

import { useState } from "react"
import { Icon } from "./ui/Icon"
import { Button } from "./ui/Button"
import PlaceMenuModal from "./ui/PlaceMenuModal"
import ShareModal from "./ui/ShareModal"
import PlaceReviewFlow from "./PlaceReviewFlow"
import "../styles/PlaceDetailsPage.css"

export default function PlaceDetailsPage({ place, onClose }) {
  const now = new Date()
  const currentHour = now.getHours()
  const currentDay = now.getDay() === 0 ? 6 : now.getDay() - 1

  const [activeTab, setActiveTab] = useState("sens")
  const [timeSliderValue, setTimeSliderValue] = useState(currentHour)
  const [daySliderValue, setDaySliderValue] = useState(currentDay)
  const [showMenuModal, setShowMenuModal] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [showReviewFlow, setShowReviewFlow] = useState(false)

  if (!place) return null

  const days = ["lun", "mar", "mer", "jeu", "ven", "sam", "dim"]
  const fullDays = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]

  const getSliderBackground = (value, max) => {
    const percentage = (value / max) * 100
    return `linear-gradient(to right, #445E9A 0%, #445E9A ${percentage}%, #CCD7F0 ${percentage}%, #CCD7F0 100%)`
  }

  const handleReviewComplete = () => {
    setShowReviewFlow(false)
    console.log("[v0] Review completed")
  }

  if (showReviewFlow) {
    return <PlaceReviewFlow place={place} onClose={() => setShowReviewFlow(false)} onComplete={handleReviewComplete} />
  }

  return (
    <div className="place-details-page">
      <div className="place-details-hero">
        <img
          src={place.imageUrl || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80"}
          alt={place.name}
          className="place-details-hero-image"
        />

        {place.certified && (
          <div className="place-certified-badge">
            <div className="certified-icon-wrapper">
              <svg width="30" height="40" viewBox="0 0 30 40" fill="none">
                <path d="M15 0L20 10L30 12L22 20L24 30L15 25L6 30L8 20L0 12L10 10L15 0Z" fill="#204040" />
              </svg>
            </div>
            <div className="certified-speech-tail">
              <svg width="19" height="21" viewBox="0 0 19 21" fill="none">
                <path d="M0 0L19 10.5L9.5 21L0 0Z" fill="#A6DDAF" />
              </svg>
            </div>
            <div className="certified-badge-text">On est bien ici</div>
          </div>
        )}

        <button className="place-close-button" onClick={onClose}>
          <Icon name="close" size={24} color="#2A3556" />
        </button>
      </div>

      <div className="place-details-body">
        <div className="place-header-section">
          <div className="place-title-wrapper">
            <div className="place-title-row">
              <h1 className="place-title">{place.name}</h1>
              <button className="place-menu-button" onClick={() => setShowMenuModal(true)}>
                <Icon name="dots" color="#2A3556" />
              </button>
            </div>

            <div className="place-address-row">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="8.75" r="1.25" stroke="#727272" strokeWidth="1.5" />
                <path
                  d="M10 17.5C10 17.5 16.25 13.125 16.25 8.75C16.25 5.02 13.73 2.5 10 2.5C6.27 2.5 3.75 5.02 3.75 8.75C3.75 13.125 10 17.5 10 17.5Z"
                  stroke="#727272"
                  strokeWidth="1.5"
                />
              </svg>
              <span className="place-address">{place.address}</span>
            </div>
          </div>
        </div>

        <div className="place-tabs">
          <button
            className={`place-tab ${activeTab === "sens" ? "place-tab-active" : ""}`}
            onClick={() => setActiveTab("sens")}
          >
            Sens
          </button>
          <button
            className={`place-tab ${activeTab === "avis" ? "place-tab-active" : ""}`}
            onClick={() => setActiveTab("avis")}
          >
            Avis
          </button>
        </div>

        {activeTab === "sens" && (
          <div className="place-sens-content">
            <div className="sensory-intensity-card">
              <div className="intensity-header">
                <h2 className="intensity-title">Intensité sensorielle</h2>
                <p className="intensity-subtitle">
                  {fullDays[daySliderValue]} à {timeSliderValue}h
                </p>
              </div>

              <div className="sense-bars-container">
                <div className="sense-bar-row">
                  <div className="sense-bar-icon-wrapper">
                    <Icon name="light" size={24} color="#9A7AC1" />
                  </div>
                  <div className="sense-bar-content">
                    <p className="sense-bar-label">Peu lumineux</p>
                    <div className="sense-progress-bar">
                      <div className="sense-progress-bg" style={{ background: "rgba(154, 122, 193, 0.20)" }} />
                      <div
                        className="sense-progress-fill"
                        style={{
                          width: `${(place.senses?.light || 10) * 2.77}px`,
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
                    <p className="sense-bar-label">Peu bruyant</p>
                    <div className="sense-progress-bar">
                      <div className="sense-progress-bg" style={{ background: "rgba(215, 122, 79, 0.20)" }} />
                      <div
                        className="sense-progress-fill"
                        style={{
                          width: `${(place.senses?.sound || 10) * 2.77}px`,
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
                    <p className="sense-bar-label">Peu de monde</p>
                    <div className="sense-progress-bar">
                      <div className="sense-progress-bg" style={{ background: "rgba(79, 161, 161, 0.20)" }} />
                      <div
                        className="sense-progress-fill"
                        style={{
                          width: `${(place.senses?.crowd || 10) * 2.77}px`,
                          background: "#4FA1A1",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="sliders-section">
                <div className="slider-group">
                  <div className="slider-label-row">
                    <span className="slider-label">{timeSliderValue}h</span>
                  </div>
                  <div className="slider-with-icons">
                    <Icon name="sun" size={24} color="#2A3556" />
                    <div className="slider-track-container">
                      <input
                        type="range"
                        min="0"
                        max="23"
                        value={timeSliderValue}
                        onChange={(e) => setTimeSliderValue(Number(e.target.value))}
                        className="custom-slider"
                        style={{
                          background: getSliderBackground(timeSliderValue, 23),
                        }}
                      />
                    </div>
                    <Icon name="moon" size={24} color="#2A3556" />
                  </div>
                </div>

                <div className="slider-group">
                  <div className="slider-label-row">
                    <span className="slider-label">{fullDays[daySliderValue]}</span>
                  </div>
                  <div className="slider-with-labels">
                    <span className="slider-day-label">lun</span>
                    <div className="slider-track-container slider-with-stops">
                      <input
                        type="range"
                        min="0"
                        max="6"
                        value={daySliderValue}
                        onChange={(e) => setDaySliderValue(Number(e.target.value))}
                        className="custom-slider"
                        style={{
                          background: getSliderBackground(daySliderValue, 6),
                        }}
                      />
                      <div className="slider-stops">
                        {[0, 1, 2, 3, 4, 5, 6].map((stop) => (
                          <div key={stop} className={`slider-stop ${stop === 0 ? "slider-stop-active" : ""}`} />
                        ))}
                      </div>
                    </div>
                    <span className="slider-day-label">dim</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "avis" && (
          <div className="place-avis-content">
            <div className="review-post">
              <div className="review-header">
                <div className="review-user-section">
                  <div className="review-avatar">
                    <img src="https://i.pravatar.cc/35?img=1" alt="User avatar" />
                  </div>
                  <div className="review-user-info">
                    <span className="review-username">@user34</span>
                    <div className="review-badge">EXPLORATEUR</div>
                  </div>
                </div>
                <span className="review-date">3 jours</span>
              </div>

              <div className="review-sense-bars">
                <div className="review-sense-bar" data-type="light">
                  <div className="review-sense-bar-bg" style={{ background: "rgba(154, 122, 193, 0.20)" }} />
                  <div className="review-sense-bar-fill" style={{ width: "7.98px", background: "#9A7AC1" }} />
                </div>
                <div className="review-sense-bar" data-type="noise">
                  <div className="review-sense-bar-bg" style={{ background: "rgba(215, 122, 79, 0.20)" }} />
                  <div className="review-sense-bar-fill" style={{ width: "7.98px", background: "#D77A4F" }} />
                </div>
                <div className="review-sense-bar" data-type="crowd">
                  <div className="review-sense-bar-bg" style={{ background: "rgba(79, 161, 161, 0.20)" }} />
                  <div className="review-sense-bar-fill" style={{ width: "7.98px", background: "#4FA1A1" }} />
                </div>
              </div>

              <p className="review-text">
                Avoir un lieu aussi incluant et soucieux des personnes sensibles c'est une bénédiction.
              </p>

              <div className="review-images">
                <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200&q=80" alt="Review 1" />
                <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200&q=80" alt="Review 2" />
                <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200&q=80" alt="Review 3" />
              </div>

              <div className="review-actions">
                <div className="review-actions-left">
                  <button className="review-action-button">
                    <Icon name="heart" size={25} color="#2A3556" />
                    <span>12</span>
                  </button>
                  <button className="review-action-button">
                    <Icon name="comment" size={25} color="#2A3556" />
                    <span>7</span>
                  </button>
                </div>
                <button className="review-menu-button">
                  <Icon name="dots" size={22} color="#2A3556" />
                </button>
              </div>
            </div>

            <div className="review-post">
              <div className="review-header">
                <div className="review-user-section">
                  <div className="review-avatar">
                    <img src="https://i.pravatar.cc/35?img=2" alt="User avatar" />
                  </div>
                  <div className="review-user-info">
                    <span className="review-username">@user34</span>
                    <div className="review-badge">EXPLORATEUR</div>
                  </div>
                </div>
                <span className="review-date">3 jours</span>
              </div>

              <div className="review-sense-bars">
                <div className="review-sense-bar" data-type="light">
                  <div className="review-sense-bar-bg" style={{ background: "rgba(154, 122, 193, 0.20)" }} />
                  <div className="review-sense-bar-fill" style={{ width: "7.98px", background: "#9A7AC1" }} />
                </div>
                <div className="review-sense-bar" data-type="noise">
                  <div className="review-sense-bar-bg" style={{ background: "rgba(215, 122, 79, 0.20)" }} />
                  <div className="review-sense-bar-fill" style={{ width: "7.98px", background: "#D77A4F" }} />
                </div>
                <div className="review-sense-bar" data-type="crowd">
                  <div className="review-sense-bar-bg" style={{ background: "rgba(79, 161, 161, 0.20)" }} />
                  <div className="review-sense-bar-fill" style={{ width: "7.98px", background: "#4FA1A1" }} />
                </div>
              </div>

              <p className="review-text">
                Avoir un lieu aussi incluant et soucieux des personnes sensibles c'est une bénédiction.
              </p>

              <div className="review-images">
                <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200&q=80" alt="Review 1" />
                <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200&q=80" alt="Review 2" />
                <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200&q=80" alt="Review 3" />
              </div>

              <div className="review-actions">
                <div className="review-actions-left">
                  <button className="review-action-button">
                    <Icon name="heart" size={25} color="#2A3556" />
                    <span>12</span>
                  </button>
                  <button className="review-action-button">
                    <Icon name="comment" size={25} color="#2A3556" />
                    <span>7</span>
                  </button>
                </div>
                <button className="review-menu-button">
                  <Icon name="dots" size={22} color="#2A3556" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="place-footer">
        <Button variant="primary" fullWidth onClick={() => setShowReviewFlow(true)}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 3V13M3 8H13" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span>Partager mon ressenti</span>
          </div>
        </Button>
        <button className="btn-share-icon" onClick={() => setShowShareModal(true)}>
          <Icon name="share" size={24} color="var(--components-input-form_fields-default-placeholder, #203461ff)" />
        </button>
      </div>
      <PlaceMenuModal isOpen={showMenuModal} onClose={() => setShowMenuModal(false)} place={place} />
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        shareUrl={`https://sensorymap.app/place/${place.id}`}
      />
    </div>
  )
}
