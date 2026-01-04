"use client"
import Icon from "./ui/Icon"
import "../styles/Header.css"

export default function Header({ selectedSenses, onBadgeClick, onProfileClick }) {
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

  const selectedSensesArray = Object.entries(selectedSenses).filter(([_, isSelected]) => isSelected)
  const badgeCount = selectedSensesArray.length

  return (
    <div className="header-container">
      {/* Barre de recherche */}
      <div className="search-bar">
        <div className="search-icon">
          <Icon name="search" size={25} color="var(--components-input-search_bar-placeholder, #4F70B5)" />
        </div>
        <input type="text" placeholder="Rechercher..." className="search-input" />
      </div>

      {/* Badges empilés */}
      {badgeCount > 0 && (
        <div className="badges-stack" style={{ width: `${40 + (badgeCount - 1) * 16}px` }} onClick={onBadgeClick}>
          {selectedSensesArray.map(([sense], displayIndex) => (
            <div
              key={sense}
              className="badge-item"
              style={{
                left: displayIndex * 16,
                zIndex: badgeCount - displayIndex,
              }}
            >
              <div className="badge-circle" style={{ background: badgeColors[sense] }}>
                <span>{senseConfig[sense].icon}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Icône de profil */}
      <div className="profile-icon" onClick={onProfileClick}>
        <div className="profile-circle">
          <Icon name="profile" size={20} color="var(--components-input-form_fields-default-placeholder, #4F70B5)" />
        </div>
      </div>
    </div>
  )
}
