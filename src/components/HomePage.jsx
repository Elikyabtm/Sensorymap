"use client"

import { useState, useRef, useEffect } from "react"
import Map from "./Map"
import { Icon, PostModal, EventModal } from "./ui"
import Header from "./Header"
import PlaceModal from "./ui/PlaceModal"
import CommunityContent from "./CommunityContent"
import DiscoveryContent from "./DiscoveryContent"
import SenseModal from "./SenseModal"
import SearchPage from "./SearchPage"
import PlaceDetailsPage from "./PlaceDetailsPage"
import PostDetailsPage from "./PostDetailsPage"
import EventDetailsPage from "./EventDetailsPage"
import ReportModal from "./ReportModal"
import ProfilePage from "./ProfilePage"
import placesData from "../data/places.json"
import { mockPosts, mockEvents } from "../data/communityData"

export default function HomePage({ userSensoryProfile = [], onUpdateSensoryProfile }) {
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
  const [selectedCategory, setSelectedCategory] = useState(null)

  const [showPlaceDetails, setShowPlaceDetails] = useState(false)
  const [placeDetailsData, setPlaceDetailsData] = useState(null)

  const [showReportModal, setShowReportModal] = useState(false)
  const [userPosition, setUserPosition] = useState(null)
  const [reports, setReports] = useState([])
  const [selectedReport, setSelectedReport] = useState(null)
  const [showProfilePage, setShowProfilePage] = useState(false)

  const [selectedPost, setSelectedPost] = useState(null)
  const [showPostDetails, setShowPostDetails] = useState(false)
  const [postDetailsData, setPostDetailsData] = useState(null)

  const [selectedEvent, setSelectedEvent] = useState(null)
  const [showEventDetails, setShowEventDetails] = useState(false)
  const [eventDetailsData, setEventDetailsData] = useState(null)

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

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.log("[v0] Geolocation error:", error)
        },
      )
    }
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

    const updatedSenses = { ...selectedSenses, [sense]: !selectedSenses[sense] }
    const activeSenses = Object.keys(updatedSenses).filter((key) => updatedSenses[key])
    if (onUpdateSensoryProfile) {
      onUpdateSensoryProfile(activeSenses)
    }
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
  }

  const handleCategoryClick = (category) => {
    setSelectedCategory((prev) => (prev === category ? null : category))
  }

  const handleOpenPlaceDetails = (place) => {
    console.log("[v0] Opening place details:", place.name, "type:", place.type)
    setPlaceDetailsData(place)
    setShowPlaceDetails(true)
    setSelectedPlace(null)
  }

  const handleClosePlaceDetails = () => {
    setShowPlaceDetails(false)
    setPlaceDetailsData(null)
  }

  const handleOpenReport = () => {
    setShowReportModal(true)
  }

  const handleReportSubmit = (reportData) => {
    const newReport = {
      id: Date.now(),
      ...reportData,
      timestamp: new Date().toISOString(),
    }
    setReports((prev) => [...prev, newReport])
    setShowReportModal(false)
  }

  const handleReportClick = (report) => {
    setSelectedReport(report)
  }

  const handlePostClick = (post) => {
    setSelectedPost(post)
    setDrawerHeight(80)
  }

  const handleOpenPostDetails = (post) => {
    setPostDetailsData(post)
    setShowPostDetails(true)
    setSelectedPost(null)
  }

  const handleClosePostDetails = () => {
    setShowPostDetails(false)
    setPostDetailsData(null)
  }

  const handleEventClick = (event) => {
    setSelectedEvent(event)
    setDrawerHeight(80)
  }

  const handleOpenEventDetails = (event) => {
    setEventDetailsData(event)
    setShowEventDetails(true)
    setSelectedEvent(null)
  }

  const handleCloseEventDetails = () => {
    setShowEventDetails(false)
    setEventDetailsData(null)
  }

  return (
    <div className="home-page">
      {showProfilePage && (
        <ProfilePage
          onClose={() => setShowProfilePage(false)}
          sensoryProfile={userSensoryProfile}
          onUpdateProfile={onUpdateSensoryProfile}
        />
      )}
      {showPlaceDetails && <PlaceDetailsPage place={placeDetailsData} onClose={handleClosePlaceDetails} />}
      {showPostDetails && <PostDetailsPage post={postDetailsData} onClose={handleClosePostDetails} />}
      {showEventDetails && <EventDetailsPage event={eventDetailsData} onClose={handleCloseEventDetails} />}
      {showSearchPage && (
        <SearchPage
          onClose={() => setShowSearchPage(false)}
          places={places}
          onPlaceSelect={handlePlaceSelectFromSearch}
          onCategoryFilter={setSelectedCategory}
          selectedCategoryProp={selectedCategory}
        />
      )}
      <ReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        onSubmit={handleReportSubmit}
        userPosition={userPosition}
        mapRef={mapRef}
      />
      {selectedReport && (
        <div className="report-details-overlay" onClick={() => setSelectedReport(null)}>
          <div className="report-details-modal" onClick={(e) => e.stopPropagation()}>
            <button className="report-details-close" onClick={() => setSelectedReport(null)}>
              <Icon name="close" size={24} color="#2D3A40" />
            </button>
            <h3>Signalement</h3>
            <div className="report-details-content">
              <div className="report-details-triggers">
                <strong>Déclencheurs:</strong>
                <div className="report-details-badges">
                  {selectedReport.triggers.map((trigger) => (
                    <span key={trigger} className={`report-badge ${trigger}`}>
                      {trigger === "sound" ? "Bruit" : trigger === "light" ? "Lumière" : "Foule"}
                    </span>
                  ))}
                </div>
              </div>
              <p>
                <strong>Intensité:</strong>{" "}
                {selectedReport.intensity < 33 ? "Faible" : selectedReport.intensity < 66 ? "Moyen" : "Forte"}
              </p>
              <p>
                <strong>Étendue:</strong> {selectedReport.extent}m
              </p>
              {selectedReport.description && (
                <p>
                  <strong>Description:</strong> {selectedReport.description}
                </p>
              )}
              <p className="report-details-time">{new Date(selectedReport.timestamp).toLocaleString("fr-FR")}</p>
            </div>
          </div>
        </div>
      )}
      <div className="map-container">
        <Map
          ref={mapRef}
          onMarkerClick={handleMarkerClick}
          selectedSenses={selectedSenses}
          selectedCategory={selectedCategory}
          reports={reports}
          onReportClick={handleReportClick}
          activeTab={activeTab}
          communityPosts={mockPosts}
          communityEvents={mockEvents}
          onPostClick={handlePostClick}
          onEventClick={handleEventClick}
        />
        {selectedPlace && (
          <PlaceModal
            place={selectedPlace}
            onClose={() => setSelectedPlace(null)}
            onOpenDetails={handleOpenPlaceDetails}
          />
        )}
        {selectedPost && (
          <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} onOpenDetails={handleOpenPostDetails} />
        )}
        {selectedEvent && (
          <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} onOpenDetails={handleOpenEventDetails} />
        )}
      </div>
      <Header
        selectedSenses={selectedSenses}
        onBadgeClick={() => setShowSenseModal(true)}
        onProfileClick={() => setShowProfilePage(true)}
        onSearchClick={() => setShowSearchPage(true)}
      />
      <SenseModal
        isOpen={showSenseModal}
        onClose={() => setShowSenseModal(false)}
        selectedSenses={selectedSenses}
        onToggleSense={toggleSense}
        windowHeight={windowHeight}
      />
      {clampedHeight < windowHeight * 0.6 && !selectedPlace && !selectedPost && !selectedEvent && (
        <div className="map-controls" style={{ bottom: `${clampedHeight + 12}px` }}>
          <button className="recenter-button" onClick={handleRecenterMap}>
            <Icon name="position" size={24} color="#364A78" />
          </button>
          <button className="map-button alert-button" onClick={handleOpenReport}>
            <Icon name="warning" size={32} color="white" />
          </button>
        </div>
      )}
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
                Découvrir
              </button>
              <button
                className={`drawer-tab ${activeTab === "community" ? "active" : ""}`}
                onClick={() => setActiveTab("community")}
              >
                Communauté
              </button>
            </div>
            <div className="drawer-container">
              <div className="drawer-body">
                {activeTab === "discover" ? (
                  <DiscoveryContent
                    selectedSenses={selectedSenses}
                    selectedCategory={selectedCategory}
                    onCategoryClick={handleCategoryClick}
                  />
                ) : (
                  <CommunityContent
                    selectedSenses={selectedSenses}
                    selectedCategory={selectedCategory}
                    onCategoryClick={handleCategoryClick}
                    onEventClick={handleEventClick}
                    onPostClick={handlePostClick}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
