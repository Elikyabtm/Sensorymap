"use client"

import { useState } from "react"
import { Icon } from "./ui/Icon"
import { Button } from "./ui/Button"
import PlaceMenuModal from "./ui/PlaceMenuModal"
import ShareModal from "./ui/ShareModal"
import PlaceReviewFlow from "./PlaceReviewFlow"
import "../styles/PlaceDetailsPage.css"

export default function PlaceDetailsPage({ place, onClose, onOpenCertificationAbout }) {
  const now = new Date()
  const currentHour = now.getHours()
  const currentDay = now.getDay() === 0 ? 6 : now.getDay() - 1

  const [activeTab, setActiveTab] = useState("sens")
  const [timeSliderValue, setTimeSliderValue] = useState(currentHour)
  const [daySliderValue, setDaySliderValue] = useState(currentDay)
  const [showMenuModal, setShowMenuModal] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [showReviewFlow, setShowReviewFlow] = useState(false)
  const [isCertifiedCardExpanded, setIsCertifiedCardExpanded] = useState(false)

  if (!place) return null

  const fullDays = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]

  const getSliderBackground = (value, max) => {
    const percentage = (value / max) * 100
    return `linear-gradient(to right, #445E9A 0%, #445E9A ${percentage}%, #CCD7F0 ${percentage}%, #CCD7F0 100%)`
  }

  const handleReviewComplete = () => {
    setShowReviewFlow(false)
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

{place.type === "certified" && (
          <div className="place-certified-mascot">
            <div className="mascot-speech-bubble">On se sent bien ici</div>
            <div className="mascot-speech-tail">
              <svg width="19" height="22" viewBox="0 0 19 22" fill="none">
                <path d="M18.8 0L0 10.5L9.4 21.5L18.8 0Z" fill="#8FDA9C" />
              </svg>
            </div>
            <div className="mascot-icon-wrapper">
              <Icon name="certified" size={30} color="#204040" />
            </div>
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

        {place.type === "certified" && (
          <div className={`certified-card ${isCertifiedCardExpanded ? 'expanded' : ''}`}>
            <div className="certified-card-header">
              <div className="certified-card-text">
                <h3 className="certified-card-title">Lieu serein</h3>
                <p className="certified-card-description">
                  Ce lieu a ete evalue sur le terrain selon des criteres sensoriels et humains.
                </p>
              </div>
              <button 
                className="certified-card-toggle"
                onClick={() => setIsCertifiedCardExpanded(!isCertifiedCardExpanded)}
              >
                <Icon name={isCertifiedCardExpanded ? "chevronUp" : "plus"} size={20} color="#2A3556" />
              </button>
            </div>
            
            {isCertifiedCardExpanded && (
              <div className="certified-card-content">
                <div className="certified-criteria">
                  <div className="certified-criterion">
                    <div className="criterion-icon">
                      <div className="criterion-icon-bg">
                        <Icon name="moon" size={24} color="#4FA1A1" />
                      </div>
                      <div className="criterion-check">
                        <Icon name="check" size={10} color="white" />
                      </div>
                    </div>
                    <span className="criterion-label">Lumiere douce</span>
                  </div>
                  
                  <div className="certified-criterion">
                    <div className="criterion-icon">
                      <div className="criterion-icon-bg">
                        <Icon name="smile" size={24} color="#4FA1A1" />
                      </div>
                      <div className="criterion-check">
                        <Icon name="check" size={10} color="white" />
                      </div>
                    </div>
                    <span className="criterion-label">Personnel sensibilise</span>
                  </div>
                  
                  <div className="certified-criterion">
                    <div className="criterion-icon">
                      <div className="criterion-icon-bg">
                        <Icon name="bell" size={24} color="#4FA1A1" />
                      </div>
                      <div className="criterion-check">
                        <Icon name="check" size={10} color="white" />
                      </div>
                    </div>
                    <span className="criterion-label">Ambiance sonore maitrisee</span>
                  </div>
                </div>
                
                <button className="certified-learn-more" onClick={onOpenCertificationAbout}>En savoir plus</button>
              </div>
            )}
          </div>
        )}

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
                <h2 className="intensity-title">Intensite sensorielle</h2>
                <p className="intensity-subtitle">
                  {fullDays[daySliderValue]} a {timeSliderValue}h
                </p>
              </div>

              <div className="sense-bars-container">
                <div className="sense-bar-row">
                  <div className="sense-bar-icon-wrapper">
                    <Icon name="light" size={24} color="#9A7AC1" />
                  </div>
                  <div className="sense-bar-content">
                    <p className="sense-bar-label">Tres peu lumineux</p>
                    <div className="sense-progress-bar">
                      <div className="sense-progress-bg" style={{ background: "rgba(154, 122, 193, 0.20)" }} />
                      <div
                        className="sense-progress-fill"
                        style={{
                          width: `${100 - (place.senses?.light || 10)}%`,
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
                          width: `${100 - (place.senses?.sound || 10)}%`,
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
                          width: `${100 - (place.senses?.crowd || 10)}%`,
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
                  <div className="review-sense-bar-fill" style={{ width: "30%", background: "#9A7AC1" }} />
                </div>
                <div className="review-sense-bar" data-type="noise">
                  <div className="review-sense-bar-bg" style={{ background: "rgba(215, 122, 79, 0.20)" }} />
                  <div className="review-sense-bar-fill" style={{ width: "45%", background: "#D77A4F" }} />
                </div>
                <div className="review-sense-bar" data-type="crowd">
                  <div className="review-sense-bar-bg" style={{ background: "rgba(79, 161, 161, 0.20)" }} />
                  <div className="review-sense-bar-fill" style={{ width: "25%", background: "#4FA1A1" }} />
                </div>
              </div>

              <p className="review-text">
                Avoir un lieu aussi incluant et soucieux des personnes sensibles c'est une benediction.
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
          <Icon name="share" size={24} color="#203461" />
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
