"use client"

import { useState, useRef, useEffect } from "react"
import Map from "./Map"
import { Icon } from "./ui"
import Header from "./Header"
import PlaceModal from "./ui/PlaceModal"
import CommunityContent from "./CommunityContent"
import DiscoveryContent from "./DiscoveryContent"
import SenseModal from "./SenseModal"
import SearchPage from "./SearchPage"
import placesData from "../data/places.json"

export default function HomePage() {
  const [drawerHeight, setDrawerHeight] = useState(80)
  const [isDragging, setIsDragging] = useState(false)
  const [windowHeight, setWindowHeight] = useState(window.innerHeight)
  const startYRef = useRef(null)
  const startHeightRef = useRef(null)
  const drawerRef = useRef(null)

  const [selectedSenses, setSelectedSenses] = useState({ light: true, sound: true, crowd: true })
  const [showSenseModal, setShowSenseModal] = useState(false)
  const [activeTab, setActiveTab] = useState("discover")

  const [selectedPlace, setSelectedPlace] = useState(null)
  const [showSearchPage, setShowSearchPage] = useState(false)

  const mapRef = useRef(null)

  const places = placesData

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

  const maxDrawerHeight = windowHeight * 0.85
  const clampedHeight = drawerHeight

  const handleRecenterMap = () => {
    if (mapRef.current) {
      mapRef.current.recenterToUserLocation()
    }
  }

  const handleMarkerClick = (place) => {
    setSelectedPlace(place)
    setDrawerHeight(80)
  }

  const handlePlaceSelectFromSearch = (place) => {
    setSelectedPlace(place)
    setDrawerHeight(80)
    // Optionally zoom to the place on the map
    if (mapRef.current && place.coordinates) {
      // Map component will handle the zoom via centerPosition
    }
  }

  const showMapControls = !selectedPlace && clampedHeight < windowHeight * 0.6

  return (
    <div className="home-page">
      {showSearchPage && (
        <SearchPage
          onClose={() => setShowSearchPage(false)}
          places={places}
          onPlaceSelect={handlePlaceSelectFromSearch}
        />
      )}

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
        onSearchClick={() => setShowSearchPage(true)}
      />

      <SenseModal
        isOpen={showSenseModal}
        onClose={() => setShowSenseModal(false)}
        selectedSenses={selectedSenses}
        onToggleSense={toggleSense}
        windowHeight={windowHeight}
      />

      {/* Map controls */}
      {showMapControls && (
        <div className="map-controls" style={{ bottom: `${clampedHeight + 12}px` }}>
          <button className="recenter-button" onClick={handleRecenterMap}>
            <Icon name="position" size={24} color="#364A78" />
          </button>
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

            <div className="drawer-container">
              {/* Filters scrollable horizontalement */}
              <div className="drawer-filters">
                {[1, 2, 3, 4, 5, 6].map((index) => (
                  <div key={index} className="filter-item">
                    <div className="filter-circle">
                      <div className="filter-icon">+</div>
                    </div>
                    <div className="filter-label">Label</div>
                  </div>
                ))}
              </div>

              {/* Scrollable body content */}
              <div className="drawer-body">
                {activeTab === "discover" ? <DiscoveryContent /> : <CommunityContent />}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
