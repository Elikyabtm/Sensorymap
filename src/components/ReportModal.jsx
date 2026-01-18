"use client"

import { useState, useEffect } from "react"
import "../styles/ReportModal.css"
import Icon from "./ui/Icon"
import { Button } from "./ui/Button"

const ReportModal = ({ isOpen, onClose, onSubmit, userPosition, mapRef }) => {
  const [step, setStep] = useState(1)
  const [location, setLocation] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [when, setWhen] = useState("now")
  const [selectedTriggers, setSelectedTriggers] = useState([])
  const [intensity, setIntensity] = useState(50)
  const [description, setDescription] = useState("")
  const [extent, setExtent] = useState(100) // meters

  useEffect(() => {
    if (!location || !mapRef?.current) return

    // Calculate circle color based on intensity
    const opacity = 0.2 + (intensity / 100) * 0.3
    const color = `rgba(54, 74, 120, ${opacity})`

    // Update circle via Map ref
    if (mapRef.current.setReportCircle) {
      mapRef.current.setReportCircle({
        lat: location.lat,
        lng: location.lng,
        extent: extent,
        fillColor: color,
        opacity: opacity,
      })
    }

    return () => {
      if (mapRef?.current?.clearReportCircle) {
        mapRef.current.clearReportCircle()
      }
    }
  }, [location, extent, intensity, mapRef])

  const handleUseCurrentLocation = () => {
    console.log("[v0] Use current location clicked")
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("[v0] Got position:", position.coords)
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          setLocation(pos)

          // Center map on user location using exposed method
          if (mapRef?.current?.setViewToPosition) {
            console.log("[v0] Centering map on position")
            mapRef.current.setViewToPosition([pos.lat, pos.lng])
          } else {
            console.log("[v0] mapRef.current.setViewToPosition not available")
          }

          setTimeout(() => {
            setStep(2)
          }, 500)
        },
        (error) => {
          console.error("[v0] Geolocation error:", error)
          alert(`Impossible d'obtenir votre position: ${error.message}`)
        },
      )
    } else {
      alert("La géolocalisation n'est pas supportée par votre navigateur.")
    }
  }

  const handleSearchAddress = async () => {
    if (!searchQuery.trim()) return

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`,
      )
      const data = await response.json()

      if (data.length > 0) {
        const pos = {
          lat: Number.parseFloat(data[0].lat),
          lng: Number.parseFloat(data[0].lon),
        }
        setLocation(pos)
        if (mapRef?.current?.setViewToPosition) {
          mapRef.current.setViewToPosition([pos.lat, pos.lng])
        }
        setStep(2)
      } else {
        alert("Adresse non trouvée. Veuillez essayer une autre recherche.")
      }
    } catch (error) {
      console.error("Geocoding error:", error)
      alert("Erreur lors de la recherche de l'adresse.")
    }
  }

  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchAddress()
    }
  }

  const handleToggleTrigger = (trigger) => {
    setSelectedTriggers((prev) => (prev.includes(trigger) ? prev.filter((t) => t !== trigger) : [...prev, trigger]))
  }

  const handleContinue = () => {
    if (step < 6) {
      setStep(step + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit({
        location,
        when,
        triggers: selectedTriggers,
        intensity,
        description,
        extent,
      })
    }
    resetForm()
  }

  const resetForm = () => {
    setStep(1)
    setLocation(null)
    setSearchQuery("")
    setWhen("now")
    setSelectedTriggers([])
    setIntensity(50)
    setDescription("")
    setExtent(100)
    if (mapRef?.current?.clearReportCircle) {
      mapRef.current.clearReportCircle()
    }
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  if (!isOpen) return null

  const getIntensityLabel = (value) => {
    if (value < 33) return "Faible"
    if (value < 66) return "Moyen"
    return "Forte"
  }

  return (
    <div className="report-modal-overlay">
      <div className="report-modal">
        <div className="report-modal-header">
          {step > 1 && (
            <button className="report-back-btn" onClick={handleBack}>
              <Icon name="arrowLeft" color="#2D3A40" size={24} />
            </button>
          )}
          <h2>Signaler une zone</h2>
          <button className="report-close-btn" onClick={handleClose}>
            <Icon name="close" size={24} color="#2D3A40" />
          </button>
        </div>

        <div className="report-modal-content">
          {/* Step 1: Location */}
          {step === 1 && (
            <>
              <div className="report-search-bar">
                <Icon name="search" color="#9E9E9E" size={20} />
                <input
                  type="text"
                  placeholder="Entre une adresse..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleSearchKeyPress}
                />
              </div>

              <Button
                variant="primary"
                fullWidth
                onClick={handleUseCurrentLocation}
                style={{
                  marginTop: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <Icon name="position" color="#FFFFFF" size={24} />
                Use current location
              </Button>

              <button className="report-manual-btn">Délimiter manuellement sur la carte</button>
            </>
          )}

          {/* Step 2: When */}
          {step === 2 && (
            <>
              <h3 className="report-question">Quand ?</h3>

              <div className="report-radio-group">
                <label className="report-radio">
                  <input
                    type="radio"
                    name="when"
                    value="now"
                    checked={when === "now"}
                    onChange={(e) => setWhen(e.target.value)}
                  />
                  <span>En ce moment</span>
                </label>

                <label className="report-radio">
                  <input
                    type="radio"
                    name="when"
                    value="less-hour"
                    checked={when === "less-hour"}
                    onChange={(e) => setWhen(e.target.value)}
                  />
                  <span>Il y a moins d'une heure</span>
                </label>

                <label className="report-radio">
                  <input
                    type="radio"
                    name="when"
                    value="earlier"
                    checked={when === "earlier"}
                    onChange={(e) => setWhen(e.target.value)}
                  />
                  <span>Plus tôt dans la journée</span>
                </label>

                <button className="report-calendar-btn">
                  <Icon name="calendar" color="#2D3A40" size={24} />
                  <span>Autre</span>
                </button>
              </div>

              <Button variant="primary" fullWidth onClick={handleContinue} style={{ marginTop: "24px" }}>
                Signaler
              </Button>
            </>
          )}

          {/* Step 3: Triggers */}
          {step === 3 && (
            <>
              <h3 className="report-question">Quels déclencheurs veux-tu signaler ?</h3>

              <div className="report-triggers">
                <button
                  className={`report-trigger ${selectedTriggers.includes("sound") ? "active" : ""}`}
                  onClick={() => handleToggleTrigger("sound")}
                >
                  <div className="report-trigger-circle">
                    <Icon name="sound" color={selectedTriggers.includes("sound") ? "#FFFFFF" : "#FF8D60"} size={32} />
                  </div>
                  <span>Bruit</span>
                </button>

                <button
                  className={`report-trigger ${selectedTriggers.includes("crowd") ? "active" : ""}`}
                  onClick={() => handleToggleTrigger("crowd")}
                >
                  <div className="report-trigger-circle">
                    <Icon name="crowd" color={selectedTriggers.includes("crowd") ? "#FFFFFF" : "#5A9E9E"} size={32} />
                  </div>
                  <span>Foule</span>
                </button>

                <button
                  className={`report-trigger ${selectedTriggers.includes("light") ? "active" : ""}`}
                  onClick={() => handleToggleTrigger("light")}
                >
                  <div className="report-trigger-circle">
                    <Icon name="light" color={selectedTriggers.includes("light") ? "#FFFFFF" : "#B597F6"} size={32} />
                  </div>
                  <span>Lumières</span>
                </button>
              </div>

              <Button
                variant="primary"
                fullWidth
                onClick={handleContinue}
                disabled={selectedTriggers.length === 0}
                style={{ marginTop: "24px" }}
              >
                Continuer
              </Button>
            </>
          )}

          {/* Step 4: Intensity */}
          {step === 4 && (
            <>
              <h3 className="report-question">Quelle intensité?</h3>

              <div className="report-slider-container">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={intensity}
                  onChange={(e) => setIntensity(Number.parseInt(e.target.value))}
                  className="report-slider"
                />
                <div className="report-slider-labels">
                  <span>Faible</span>
                  <span>Moyen</span>
                  <span>Forte</span>
                </div>
              </div>

              <Button variant="primary" fullWidth onClick={handleContinue} style={{ marginTop: "24px" }}>
                Continuer
              </Button>
            </>
          )}

          {/* Step 5: Description */}
          {step === 5 && (
            <>
              <h3 className="report-question">Tu veux ajouter une description ?</h3>

              <textarea
                className="report-textarea"
                placeholder="Champs texte..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="6"
              />

              <Button variant="primary" fullWidth onClick={handleContinue} style={{ marginTop: "24px" }}>
                Continuer
              </Button>
            </>
          )}

          {/* Step 6: Extent */}
          {step === 6 && (
            <>
              <h3 className="report-question">Quelle est l'étendue de la zone ?</h3>

              <div className="report-slider-container">
                <input
                  type="range"
                  min="50"
                  max="500"
                  value={extent}
                  onChange={(e) => setExtent(Number.parseInt(e.target.value))}
                  className="report-slider"
                />
                <div className="report-extent-value">{extent}m</div>
              </div>

              <Button variant="primary" fullWidth onClick={handleContinue} style={{ marginTop: "24px" }}>
                Continuer
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ReportModal
