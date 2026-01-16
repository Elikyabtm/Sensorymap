"use client"

import { useState } from "react"
import { Icon, Button, SenseBadge } from "./ui"
import "../styles/ProfilePage.css"

const generateSensoryDescription = (senses) => {
  if (senses.length === 0) return "Aucune sensibilité sélectionnée"

  const senseNames = {
    light: "lumières vives",
    sound: "sons",
    crowd: "foule",
  }

  const selectedNames = senses.map((s) => senseNames[s]).filter(Boolean)

  if (selectedNames.length === 1) {
    return `Tu es plus sensible aux ${selectedNames[0]}. Tes lieux préférés sont souvent calmes et adaptés à ta sensibilité.`
  } else if (selectedNames.length === 2) {
    return `Tu es plus sensible aux ${selectedNames[0]} et aux ${selectedNames[1]}. Tes lieux préférés sont souvent calmes, à lumière douce.`
  } else {
    return `Tu es sensible aux lumières vives, aux sons et à la foule. Tes lieux préférés sont souvent calmes, à lumière douce et peu fréquentés.`
  }
}

export default function ProfilePage({ onClose, sensoryProfile = [], onUpdateProfile }) {
  const [userProfile] = useState({
    username: "@soft_waves",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    contributions: 12,
    posts: 2,
    badge: "EXPLORATEUR",
    favorites: [
      {
        id: 1,
        name: "Rooftop Nation",
        location: "Rooftop Nation",
        image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=200&h=200&fit=crop",
      },
    ],
    events: [
      {
        id: 1,
        title: "Intitulé de la sortie",
        date: "Samedi 8 janvier",
        time: "11h00",
        with: "Julia @heyjulia02",
        image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=200&h=200&fit=crop",
      },
    ],
  })

  const sensoryDescription = generateSensoryDescription(sensoryProfile)

  return (
    <div className="profile-page">
      {/* Header */}
      <div className="profile-header">
        <button className="profile-back-button" onClick={onClose}>
          <Icon name="arrowLeft" size={30} color="#2A3556" />
        </button>
        <h1 className="profile-title">Profil</h1>
        <button className="profile-settings-button">
          <Icon name="settings" size={30} color="#2A3556" />
        </button>
      </div>

      {/* Content */}
      <div className="profile-content">
        {/* User Card */}
        <div className="profile-user-card">
          <img src={userProfile.avatar || "/placeholder.svg"} alt="Avatar" className="profile-avatar" />
          <div className="profile-user-info">
            <div className="profile-username">{userProfile.username}</div>
            <div className="profile-stats">
              <span>{userProfile.contributions} contributions</span>
              <div className="profile-stats-divider" />
              <span>{userProfile.posts} posts</span>
            </div>
            <div className="profile-badge">
              <span>{userProfile.badge}</span>
            </div>
          </div>
        </div>

        {/* Sensory Profile Card */}
        <div className="profile-sensory-card">
          <h2 className="profile-sensory-title">Mon profil sensoriel</h2>
          <div className="profile-sensory-content">
            <div className="profile-sense-badges">
              {sensoryProfile.length > 0 ? (
                sensoryProfile.map((sense) => <SenseBadge key={sense} type={sense} variant="sansContour" size={46} />)
              ) : (
                <p style={{ color: "#727272", fontSize: "14px" }}>Aucune sensibilité sélectionnée</p>
              )}
            </div>
            <p className="profile-sensory-description">{sensoryDescription}</p>
            <Button variant="secondary" fullWidth>
              Modifier mon profil sensoriel
            </Button>
          </div>
        </div>

        {/* Favorites Section */}
        <div className="profile-section">
          <div className="profile-section-header">
            <h3>Mes favoris</h3>
            <button className="profile-see-all">Voir tous</button>
          </div>
          {userProfile.favorites.map((fav) => (
            <div key={fav.id} className="profile-card">
              <img src={fav.image || "/placeholder.svg"} alt={fav.name} className="profile-card-image" />
              <div className="profile-card-content">
                <div className="profile-card-title">{fav.name}</div>
                <div className="profile-card-subtitle">{fav.location}</div>
              </div>
              <Icon name="arrowRight" size={24} color="#2A3556" />
            </div>
          ))}
        </div>

        {/* Events Section */}
        <div className="profile-section">
          <div className="profile-section-header">
            <h3>Mes sorties</h3>
            <button className="profile-see-all">Voir tous</button>
          </div>
          {userProfile.events.map((event) => (
            <div key={event.id} className="profile-card">
              <img src={event.image || "/placeholder.svg"} alt={event.title} className="profile-card-image" />
              <div className="profile-card-content">
                <div className="profile-card-date">
                  <span>{event.date}</span>
                  <div className="profile-card-dot" />
                  <span>{event.time}</span>
                </div>
                <div className="profile-card-title">{event.title}</div>
                <div className="profile-card-subtitle">Avec {event.with}</div>
              </div>
              <Icon name="arrowRight" size={24} color="#2A3556" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
