"use client"

import { useState } from "react"
import { ProgressBar } from "./ui"
import { Button } from "./ui"
import { Icon } from "./ui"
import { SenseBadge } from "./ui"
import { Typography } from "./ui"
import "../styles/PlaceReviewFlow.css"

export default function PlaceReviewFlow({ place, onClose, onComplete }) {
  const [step, setStep] = useState(1)
  const [ambiance, setAmbiance] = useState(50)
  const [senseValues, setSenseValues] = useState({
    sound: 50,
    crowd: 50,
    light: 50,
  })
  const [comment, setComment] = useState("")

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1)
    } else {
      onComplete?.()
    }
  }

  const handleSkipComment = () => {
    setStep(4)
  }

  const handleSenseChange = (senseType, value) => {
    setSenseValues((prev) => ({
      ...prev,
      [senseType]: value,
    }))
  }

  const getSliderBackground = (value) => {
    const percentage = value
    return `linear-gradient(to right, #445E9A 0%, #445E9A ${percentage}%, #CCD7F0 ${percentage}%, #CCD7F0 100%)`
  }

  const getAmbianceText = (value) => {
    if (value < 20) return "Comment t'es-tu senti dans ce lieu ? Très apaisant"
    if (value < 40) return "Comment t'es-tu senti dans ce lieu ? Plutôt calme"
    if (value < 60) return "Comment t'es-tu senti dans ce lieu ? Ambiance équilibrée"
    if (value < 80) return "Comment t'es-tu senti dans ce lieu ? Plutôt animé"
    return "Comment t'es-tu senti dans ce lieu ? Très stimulant"
  }

  const getAmbianceLabel = (value) => {
    if (value < 20) return "Ambiance très apaisante"
    if (value < 40) return "Ambiance calme"
    if (value < 60) return "Ambiance équilibrée"
    if (value < 80) return "Ambiance animée"
    return "Ambiance très stimulante"
  }

  return (
    <div className="place-review-flow">
      {/* Header avec bouton fermer */}
      <div className="review-flow-header">
        <div style={{ width: 30, height: 30 }} />
        <button onClick={onClose} className="review-close-button">
          <Icon name="close" size={18} color="#364A78" />
        </button>
      </div>

      {/* Barre de progression */}
      <div className="review-progress-container">
        <ProgressBar progress={(step / 4) * 100} />
      </div>

      {/* Contenu selon l'étape */}
      <div className="review-content">
        {step === 1 && (
          <div className="review-step">
            <div className="review-step-header">
              <Typography variant="h2" style={{ color: "#2A3556" }}>
                Comment t'es-tu senti dans ce lieu ?
              </Typography>
              <Typography variant="body" style={{ color: "#4B4B4B", marginTop: 12 }}>
                Aide la communauté à mieux comprendre ce lieu selon ton ressenti.
              </Typography>
            </div>

            <div className="ambiance-slider-section">
              <div className="ambiance-label">{getAmbianceLabel(ambiance)}</div>
              <div className="slider-container">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={ambiance}
                  onChange={(e) => setAmbiance(Number(e.target.value))}
                  className="ambiance-slider"
                  style={{ background: getSliderBackground(ambiance) }}
                />
                <div className="slider-labels">
                  <span>Apaisant</span>
                  <span>Stimulant</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="review-step">
            <div className="review-step-header">
              <Typography variant="h2" style={{ color: "#2A3556" }}>
                Parle-nous de ton expérience sensorielle
              </Typography>
              <Typography variant="body" style={{ color: "#4B4B4B", marginTop: 12 }}>
                Choisis les éléments sensoriels que tu veux décrire
              </Typography>
            </div>

            <div className="sense-sliders-section">
              {/* Bruit */}
              <div
                className="sense-slider-card"
                style={{
                  background: "rgba(215, 122, 79, 0.05)",
                  border: "1px solid rgba(215, 122, 79, 0.20)",
                }}
              >
                <div className="sense-slider-header">
                  <SenseBadge type="sound" variant="contour" size={40} />
                  <Typography variant="body" weight="500" style={{ color: "#141B31" }}>
                    Bruit
                  </Typography>
                </div>
                <div className="sense-slider-row">
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      background: "#D77A4F",
                      borderRadius: "100%",
                      flexShrink: 0,
                    }}
                  />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={senseValues.sound}
                    onChange={(e) => handleSenseChange("sound", Number(e.target.value))}
                    className="sense-slider"
                    style={{ background: getSliderBackground(senseValues.sound) }}
                  />
                </div>
              </div>

              {/* Foule */}
              <div
                className="sense-slider-card"
                style={{
                  background: "rgba(79, 161, 161, 0.05)",
                  border: "1px solid rgba(79, 161, 161, 0.20)",
                }}
              >
                <div className="sense-slider-header">
                  <SenseBadge type="crowd" variant="contour" size={40} />
                  <Typography variant="body" weight="500" style={{ color: "#141B31" }}>
                    Foule
                  </Typography>
                </div>
                <div className="sense-slider-row">
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      background: "#4FA1A1",
                      borderRadius: "100%",
                      flexShrink: 0,
                    }}
                  />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={senseValues.crowd}
                    onChange={(e) => handleSenseChange("crowd", Number(e.target.value))}
                    className="sense-slider"
                    style={{ background: getSliderBackground(senseValues.crowd) }}
                  />
                </div>
              </div>

              {/* Lumière */}
              <div
                className="sense-slider-card"
                style={{
                  background: "rgba(154, 122, 193, 0.05)",
                  border: "1px solid rgba(154, 122, 193, 0.20)",
                }}
              >
                <div className="sense-slider-header">
                  <SenseBadge type="light" variant="contour" size={40} />
                  <Typography variant="body" weight="500" style={{ color: "#141B31" }}>
                    Lumière
                  </Typography>
                </div>
                <div className="sense-slider-row">
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      background: "#9A7AC1",
                      borderRadius: "100%",
                      flexShrink: 0,
                    }}
                  />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={senseValues.light}
                    onChange={(e) => handleSenseChange("light", Number(e.target.value))}
                    className="sense-slider"
                    style={{ background: getSliderBackground(senseValues.light) }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="review-step">
            <div className="review-step-header">
              <Typography variant="h2" style={{ color: "#2A3556" }}>
                Souhaites-tu ajouter un ressenti ou un conseil ?
              </Typography>
            </div>

            <div className="comment-section">
              <div className="comment-field">
                <Typography variant="body" weight="500" style={{ color: "#364A78", marginBottom: 8 }}>
                  Title
                </Typography>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Champs texte..."
                  className="comment-textarea"
                />
              </div>

              <button onClick={handleSkipComment} className="skip-link">
                Passer cette étape
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="review-step">
            <div className="review-step-header">
              <Typography variant="h2" style={{ color: "#2A3556" }}>
                Merci !
              </Typography>
              <Typography variant="body" style={{ color: "#4B4B4B", marginTop: 12 }}>
                Ta contribution aide la communauté à mieux se repérer.
              </Typography>
            </div>
          </div>
        )}
      </div>

      {/* Bouton Suivant */}
      <div className="review-footer">
        <Button variant="primary" fullWidth onClick={handleNext}>
          {step === 4 ? "Retourner à la fiche de lieu" : "Suivant"}
        </Button>
      </div>
    </div>
  )
}
