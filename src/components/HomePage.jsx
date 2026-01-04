"use client"

import { useState, useRef, useEffect } from "react"
import Map from "./Map"
import { SenseTrigger, Typography, Icon } from "./ui"
import Header from "./Header"
import PlaceModal from "./ui/PlaceModal"

export default function HomePage() {
  const [drawerHeight, setDrawerHeight] = useState(80) // Position initiale du drawer à 80px (seulement les tabs visibles)
  const [isDragging, setIsDragging] = useState(false)
  const [windowHeight, setWindowHeight] = useState(window.innerHeight)
  const startYRef = useRef(null)
  const startHeightRef = useRef(null)
  const drawerRef = useRef(null)

  const [senseModalHeight, setSenseModalHeight] = useState(0)
  const [isSenseModalDragging, setIsSenseModalDragging] = useState(false)
  const senseModalRef = useRef(null)
  const senseStartYRef = useRef(null)
  const senseStartHeightRef = useRef(null)

  const [selectedSenses, setSelectedSenses] = useState({ light: true, sound: true, crowd: true })
  const [showSenseModal, setShowSenseModal] = useState(false)
  const [activeTab, setActiveTab] = useState("discover")

  const [selectedPlace, setSelectedPlace] = useState(null)

  const mapRef = useRef(null)

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handlePointerDown = (e) => {
    setIsDragging(true)
    startYRef.current = e.clientY
    startHeightRef.current = drawerHeight
    e.target.setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e) => {
    if (!isDragging) return
    const deltaY = startYRef.current - e.clientY
    const maxHeight = windowHeight * 0.85
    const newHeight = Math.max(80, Math.min(maxHeight, startHeightRef.current + deltaY))
    setDrawerHeight(newHeight)
  }

  const handlePointerUp = (e) => {
    setIsDragging(false)
    if (e.target.hasPointerCapture(e.pointerId)) {
      e.target.releasePointerCapture(e.pointerId)
    }
  }

  const toggleSense = (sense) => {
    setSelectedSenses((prev) => ({
      ...prev,
      [sense]: !prev[sense],
    }))
  }

  const senseConfig = {
    light: { label: "Lumière", color: "#b597f6", icon: "⚡" },
    sound: { label: "Bruit", color: "#90c359", icon: "👂" },
    crowd: { label: "Foule", color: "#ff8d60", icon: "👥" },
  }

  const badgeColors = {
    light: "var(--components-sensory-badges-default-light-surface, #9A7AC1)",
    sound: "var(--components-sensory-badges-default-noise-surface, #4FA1A1)",
    crowd: "var(--components-sensory-badges-default-crowd-surface, #D77A4F)",
  }

  const maxDrawerHeight = windowHeight * 0.85
  const clampedHeight = Math.max(80, Math.min(maxDrawerHeight, drawerHeight))

  const handleSenseModalPointerDown = (e) => {
    setIsSenseModalDragging(true)
    senseStartYRef.current = e.clientY
    senseStartHeightRef.current = senseModalHeight
    e.target.setPointerCapture(e.pointerId)
  }

  const handleSenseModalPointerMove = (e) => {
    if (!isSenseModalDragging) return
    const deltaY = senseStartYRef.current - e.clientY
    const minHeight = 280
    const maxHeight = windowHeight * 0.85
    const newHeight = Math.max(minHeight, Math.min(maxHeight, senseStartHeightRef.current + deltaY))
    setSenseModalHeight(newHeight)
  }

  const handleSenseModalPointerUp = (e) => {
    setIsSenseModalDragging(false)
    if (e.target.hasPointerCapture(e.pointerId)) {
      e.target.releasePointerCapture(e.pointerId)
    }
  }

  useEffect(() => {
    if (showSenseModal) {
      setSenseModalHeight(280)
    } else {
      setSenseModalHeight(0)
    }
  }, [showSenseModal])

  const overlayOpacity = Math.min((senseModalHeight / (windowHeight * 0.85)) * 0.6, 0.6)

  const handleRecenterMap = () => {
    if (mapRef.current) {
      mapRef.current.recenterToUserLocation()
    }
  }

  const handleMarkerClick = (place) => {
    setSelectedPlace(place)
    setDrawerHeight(80)
  }

  return (
    <div className="home-page">
      {/* Map background */}
      <div className="map-container">
        <Map ref={mapRef} onMarkerClick={handleMarkerClick} />
        {selectedPlace && <PlaceModal place={selectedPlace} onClose={() => setSelectedPlace(null)} />}
      </div>

      {/* Header */}
      <Header
        selectedSenses={selectedSenses}
        onBadgeClick={() => setShowSenseModal(true)}
        onProfileClick={() => {
          /* TODO: ouvrir profil */
        }}
      />

      {/* Sense Modal Drawer */}
      {showSenseModal && (
        <div>
          <div
            className="sense-modal-overlay"
            style={{ background: `rgba(0, 0, 0, ${overlayOpacity})` }}
            onClick={() => setShowSenseModal(false)}
          />

          <div
            ref={senseModalRef}
            className="sense-modal-drawer-figma"
            style={{ height: `${senseModalHeight}px` }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle draggable */}
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                paddingTop: "12px",
                paddingBottom: "12px",
                cursor: "grab",
                touchAction: "none",
              }}
              onPointerDown={handleSenseModalPointerDown}
              onPointerMove={handleSenseModalPointerMove}
              onPointerUp={handleSenseModalPointerUp}
              onPointerCancel={handleSenseModalPointerUp}
            >
              <div
                style={{
                  width: "40px",
                  height: "0px",
                  outline: "2.50px var(--components-bottom_sheets-handle, #979797) solid",
                  outlineOffset: "-1.25px",
                }}
              ></div>
            </div>

            {/* Header avec titre et bouton fermer */}
            <div
              style={{
                alignSelf: "stretch",
                justifyContent: "space-between",
                alignItems: "center",
                display: "flex",
                paddingLeft: "20px",
                paddingRight: "20px",
                paddingBottom: "12px",
              }}
            >
              <div style={{ width: "11.25px", height: "22.50px", opacity: 0 }} />
              <Typography variant="h3" weight="bold" color="primary">
                Ce que je veux éviter
              </Typography>
              <div
                onClick={() => setShowSenseModal(false)}
                style={{
                  width: "35px",
                  height: "35px",
                  padding: "12px",
                  background: "var(--components-button-exit-default-fill, #E4EAF7)",
                  borderRadius: "1000px",
                  outline: "1px var(--components-button-exit-default-stroke, rgba(255, 255, 255, 0)) solid",
                  outlineOffset: "-1px",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                  display: "flex",
                  cursor: "pointer",
                }}
              >
                <Icon name="close" size={18} color="#2f2f2f" />
              </div>
            </div>

            {/* Scrollable content */}
            <div
              style={{
                alignSelf: "stretch",
                paddingLeft: "20px",
                paddingRight: "20px",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: "12px",
                display: "flex",
                overflowY: "auto",
                flex: 1,
              }}
            >
              {/* Section SenseTrigger */}
              <div
                style={{
                  alignSelf: "stretch",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  gap: "18px",
                  display: "flex",
                }}
              >
                <SenseTrigger type="light" selected={selectedSenses.light} onClick={() => toggleSense("light")} />
                <SenseTrigger type="sound" selected={selectedSenses.sound} onClick={() => toggleSense("sound")} />
                <SenseTrigger type="crowd" selected={selectedSenses.crowd} onClick={() => toggleSense("crowd")} />
              </div>

              {/* Section légende des triggers */}
              <div
                style={{
                  alignSelf: "stretch",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  gap: "22px",
                  display: "flex",
                }}
              >
                <Typography variant="h4" weight="bold" color="primary" style={{ alignSelf: "stretch" }}>
                  Titre de légende des triggers
                </Typography>

                <div
                  style={{
                    alignSelf: "stretch",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    gap: "18px",
                    display: "flex",
                  }}
                >
                  {/* Lumière */}
                  <div
                    style={{
                      alignSelf: "stretch",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      gap: "16px",
                      display: "flex",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        width: "59px",
                        height: "59px",
                        position: "relative",
                        boxShadow: "1px 2px 2px rgba(0, 0, 0, 0.15)",
                      }}
                    >
                      <div
                        style={{
                          width: "59px",
                          height: "59px",
                          left: 0,
                          top: 0,
                          position: "absolute",
                          background: "#B597F6",
                          borderRadius: "9999px",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          fontSize: "32px",
                        }}
                      >
                        ⚡
                      </div>
                    </div>
                    <div
                      style={{
                        flex: "1 1 0",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "4px",
                        display: "inline-flex",
                      }}
                    >
                      <Typography variant="body" weight="semibold" color="primary" style={{ alignSelf: "stretch" }}>
                        Lumières
                      </Typography>
                      <Typography variant="body" weight="regular" color="primary" style={{ alignSelf: "stretch" }}>
                        Description du trigger lumière
                      </Typography>
                    </div>
                    <div
                      style={{
                        width: "100%",
                        height: "0",
                        position: "absolute",
                        bottom: "-9px",
                        left: 0,
                        outline: "1px var(--components-divider-color, #AFC0E6) solid",
                        outlineOffset: "-0.50px",
                      }}
                    ></div>
                  </div>

                  {/* Ligne de séparation */}
                  <div
                    style={{
                      alignSelf: "stretch",
                      height: "0px",
                      outline: "0.50px var(--components-bottom_sheets-text-divider, #AFC0E6) solid",
                      outlineOffset: "-0.25px",
                    }}
                  ></div>

                  {/* Bruit */}
                  <div
                    style={{
                      alignSelf: "stretch",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      gap: "16px",
                      display: "flex",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        width: "59px",
                        height: "59px",
                        position: "relative",
                        boxShadow: "1px 2px 2px rgba(0, 0, 0, 0.15)",
                      }}
                    >
                      <div
                        style={{
                          width: "59px",
                          height: "59px",
                          left: 0,
                          top: 0,
                          position: "absolute",
                          background: "#90C359",
                          borderRadius: "9999px",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          fontSize: "32px",
                        }}
                      >
                        👂
                      </div>
                    </div>
                    <div
                      style={{
                        flex: "1 1 0",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "4px",
                        display: "inline-flex",
                      }}
                    >
                      <Typography variant="body" weight="semibold" color="primary" style={{ alignSelf: "stretch" }}>
                        Bruit
                      </Typography>
                      <Typography variant="body" weight="regular" color="primary" style={{ alignSelf: "stretch" }}>
                        Description du trigger bruit
                      </Typography>
                    </div>
                    <div
                      style={{
                        width: "100%",
                        height: "0",
                        position: "absolute",
                        bottom: "-9px",
                        left: 0,
                        outline: "1px var(--components-divider-color, #AFC0E6) solid",
                        outlineOffset: "-0.50px",
                      }}
                    ></div>
                  </div>

                  {/* Ligne de séparation */}
                  <div
                    style={{
                      alignSelf: "stretch",
                      height: "0px",
                      outline: "0.50px var(--components-bottom_sheets-text-divider, #AFC0E6) solid",
                      outlineOffset: "-0.25px",
                    }}
                  ></div>

                  {/* Foule */}
                  <div
                    style={{
                      alignSelf: "stretch",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      gap: "16px",
                      display: "flex",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        width: "59px",
                        height: "59px",
                        position: "relative",
                        boxShadow: "1px 2px 2px rgba(0, 0, 0, 0.15)",
                      }}
                    >
                      <div
                        style={{
                          width: "59px",
                          height: "59px",
                          left: 0,
                          top: 0,
                          position: "absolute",
                          background: "#FF8D60",
                          borderRadius: "9999px",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          fontSize: "32px",
                        }}
                      >
                        👥
                      </div>
                    </div>
                    <div
                      style={{
                        flex: "1 1 0",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "4px",
                        display: "inline-flex",
                      }}
                    >
                      <Typography variant="body" weight="semibold" color="primary" style={{ alignSelf: "stretch" }}>
                        Foule
                      </Typography>
                      <Typography variant="body" weight="regular" color="primary" style={{ alignSelf: "stretch" }}>
                        Description du trigger foule
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>

              {/* Spacer en bas */}
              <div style={{ width: "292px", height: "39px" }} />
            </div>
          </div>
        </div>
      )}

      {/* Map controls */}
      {!selectedPlace && (
        <div className="map-controls">
          <button className="recenter-button" onClick={handleRecenterMap}>
            <Icon name="position" size={24} color="#364A78" />
          </button>
          {/* </CHANGE> */}
          <button className="map-button alert-button">
            <Icon name="warning" size={32} color="white" />
          </button>
        </div>
      )}

      {/* Drawer */}
      {!showSenseModal && (
        <div ref={drawerRef} className="drawer" style={{ height: `${clampedHeight}px` }}>
          <div
            className="drawer-handle"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            style={{ touchAction: "none" }}
          >
            <div className="drawer-handle-bar"></div>
          </div>

          {/* Tabs section */}
          <div className="drawer-view">
            <div className="drawer-tabs">
              <button
                className={`drawer-tab ${activeTab === "discover" ? "active" : ""}`}
                onClick={() => setActiveTab("discover")}
              >
                Discover
              </button>
              <button
                className={`drawer-tab ${activeTab === "community" ? "active" : ""}`}
                onClick={() => setActiveTab("community")}
              >
                Community
              </button>
            </div>

            {/* Container avec filtres et body */}
            <div className="drawer-container">
              {/* Filters scrollable horizontalement */}
              <div className="drawer-filters">
                {[1, 2, 3, 4, 5, 6].map((index) => (
                  <div key={index} className="filter-item">
                    <div className="filter-circle">
                      <div className="filter-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M12 5v14M5 12h14" stroke="#2f2f2f" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </div>
                    </div>
                    <span className="filter-label">Label</span>
                  </div>
                ))}
              </div>

              {/* Body scrollable verticalement */}
              <div className="drawer-body">
                {/* Section: Les recommandations de l'équipe */}
                <div className="carousel-section">
                  <div className="carousel-header">
                    <h3 className="carousel-title">Les recommandations de l'équipe</h3>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M7.5 15L12.5 10L7.5 5"
                        stroke="#2f2f2f"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="carousel-cards">
                    {[1, 2, 3].map((index) => (
                      <div key={index} className="spot-card">
                        <div className="spot-image">
                          <div className="spot-badge">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
                              <path d="M10 1l2.5 6.5L19 8l-5 4.5L15.5 19 10 15l-5.5 4L6 12.5 1 8l6.5-.5L10 1z" />
                            </svg>
                          </div>
                        </div>
                        <div className="spot-content">
                          <div className="spot-info">
                            <h4 className="spot-title">Musée du quai</h4>
                          </div>
                          <div className="spot-footer">
                            <div className="sensory-datavis">
                              <div className="datavis-bar" style={{ background: "#B597F6" }}></div>
                              <div className="datavis-bar" style={{ background: "#BEDC9E" }}></div>
                              <div className="datavis-bar" style={{ background: "#FF8D60" }}></div>
                            </div>
                            <button className="spot-bookmark">
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M3 2h10v12l-5-3-5 3V2z" stroke="white" strokeWidth="1.5" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section: Listes */}
                <div className="carousel-section">
                  <div className="carousel-header">
                    <h3 className="carousel-title">Listes</h3>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M7.5 15L12.5 10L7.5 5"
                        stroke="#2f2f2f"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="carousel-cards">
                    {[1, 2, 3, 4].map((index) => (
                      <div key={index} className="list-item">
                        <img src="/calm-restaurant-park.jpg" alt="Liste" className="list-bg-image" />
                        <div className="list-overlay">
                          <p className="list-text">
                            Restaurants calmes du 10<sup>e</sup>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section: Les recommandations de l'équipe (répétée) */}
                <div className="carousel-section">
                  <div className="carousel-header">
                    <h3 className="carousel-title">Les recommandations de l'équipe</h3>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M7.5 15L12.5 10L7.5 5"
                        stroke="#2f2f2f"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="carousel-cards">
                    {[1, 2, 3].map((index) => (
                      <div key={index} className="spot-card">
                        <div className="spot-image">
                          <div className="spot-badge">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
                              <path d="M10 1l2.5 6.5L19 8l-5 4.5L15.5 19 10 15l-5.5 4L6 12.5 1 8l6.5-.5L10 1z" />
                            </svg>
                          </div>
                        </div>
                        <div className="spot-content">
                          <div className="spot-info">
                            <h4 className="spot-title">Musée du quai</h4>
                          </div>
                          <div className="spot-footer">
                            <div className="sensory-datavis">
                              <div className="datavis-bar" style={{ background: "#B597F6" }}></div>
                              <div className="datavis-bar" style={{ background: "#BEDC9E" }}></div>
                              <div className="datavis-bar" style={{ background: "#FF8D60" }}></div>
                            </div>
                            <button className="spot-bookmark">
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M3 2h10v12l-5-3-5 3V2z" stroke="white" strokeWidth="1.5" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section: Les recommandations de l'équipe (encore une fois) */}
                <div className="carousel-section">
                  <div className="carousel-header">
                    <h3 className="carousel-title">Les recommandations de l'équipe</h3>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M7.5 15L12.5 10L7.5 5"
                        stroke="#2f2f2f"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="carousel-cards">
                    {[1, 2, 3].map((index) => (
                      <div key={index} className="spot-card">
                        <div className="spot-image">
                          <div className="spot-badge">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
                              <path d="M10 1l2.5 6.5L19 8l-5 4.5L15.5 19 10 15l-5.5 4L6 12.5 1 8l6.5-.5L10 1z" />
                            </svg>
                          </div>
                        </div>
                        <div className="spot-content">
                          <div className="spot-info">
                            <h4 className="spot-title">Musée du quai</h4>
                          </div>
                          <div className="spot-footer">
                            <div className="sensory-datavis">
                              <div className="datavis-bar" style={{ background: "#B597F6" }}></div>
                              <div className="datavis-bar" style={{ background: "#BEDC9E" }}></div>
                              <div className="datavis-bar" style={{ background: "#FF8D60" }}></div>
                            </div>
                            <button className="spot-bookmark">
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M3 2h10v12l-5-3-5 3V2z" stroke="white" strokeWidth="1.5" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
