'use client';

import { useState } from "react"
import Icon from "./ui/Icon"
import "./SettingsPage.css"

export default function SettingsPage({ onClose, onOpenCertificationAbout }) {
  const [user] = useState({
    username: "@soft_waves",
    avatar: "/woman-pink-hair-avatar.jpg",
    badge: "EXPLORATEUR",
  })

  const sections = [
    {
      title: "Profil et compte",
      showProfile: true,
      items: [
        { label: "Modifier mes informations", action: "edit-profile" },
        { label: "Connexion et sécurité", action: "security" },
        { label: "Confidentialité", action: "privacy" },
      ],
    },
    {
      title: "Préférences et personnalisation",
      items: [
        { label: "Customiser mon interface", icon: "settings", action: "customize" },
        { label: "Mes préférences sensorielles", action: "sensory" },
        { label: "Notifications", action: "notifications" },
      ],
    },
    {
      title: "Communauté et participation",
      items: [
        { label: "Mes contributions", action: "contributions" },
        { label: "Sorties organisées", action: "events" },
        { label: "Règles de la communauté", action: "rules" },
      ],
    },
    {
      title: "Aide et compréhension",
      items: [
        { label: "Comprendre l'application", icon: "mail", action: "understand" },
        { label: "Notre label Serein", icon: "mail", action: "label-serein" },
        { label: "Centre d'aide", icon: "mail", action: "help" },
      ],
    },
    {
      title: "Information et légal",
      items: [
        { label: "À propos", icon: "mail", action: "about" },
        { label: "Partenaires et label", icon: "mail", action: "partners" },
        { label: "Mentions légales et confidentialité", icon: "mail", action: "legal" },
      ],
    },
  ]

  const handleItemClick = (action) => {
    if (action === "label-serein" && onOpenCertificationAbout) {
      onOpenCertificationAbout()
    }
  }

  return (
    <div className="settings-page">
      <header className="settings-header">
        <button className="settings-back-button" onClick={onClose}>
          <Icon name="arrowLeft" size={24} color="#2A3556" />
        </button>
        <h1 className="settings-title">Mes réglages</h1>
        <div className="settings-header-spacer" />
      </header>

      <div className="settings-content">
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="settings-section">
            <h2 className="settings-section-title">{section.title}</h2>
            <div className="settings-section-card">
              {section.showProfile && (
                <div className="settings-profile">
                  <div className="settings-profile-avatar-wrapper">
                    <img src={user.avatar || "/placeholder.svg"} alt={user.username} className="settings-profile-avatar" />
                    <button className="settings-profile-edit-avatar">
                      <Icon name="edit" size={12} color="#364A78" />
                    </button>
                  </div>
                  <div className="settings-profile-info">
                    <span className="settings-profile-username">{user.username}</span>
                    <span className="settings-profile-badge">{user.badge}</span>
                  </div>
                </div>
              )}
              {section.items.map((item, itemIndex) => (
                <button
                  key={itemIndex}
                  className="settings-item"
                  onClick={() => handleItemClick(item.action)}
                >
                  {item.icon && (
                    <Icon name={item.icon} size={20} color="#445E9A" />
                  )}
                  <span className="settings-item-label">{item.label}</span>
                  <Icon name="arrowRight" size={20} color="#364A78" />
                </button>
              ))}
            </div>
          </div>
        ))}

        <div className="settings-actions">
          <button className="settings-logout-button">
            <Icon name="logout" size={20} color="#364A78" />
            <span>Me déconnecter</span>
          </button>
          <button className="settings-delete-button">
            Supprimer mon compte
          </button>
        </div>
      </div>

      <footer className="settings-footer">
        <p className="settings-footer-text">© 2026 — Nuance</p>
        <p className="settings-footer-text">
          Un service soutenu par la FFPP — Fédération Française des Psychologues et de Psychologie
        </p>
        <div className="settings-footer-logo">
          <Icon name="logo" size={32} color="white" />
        </div>
      </footer>
    </div>
  )
}
