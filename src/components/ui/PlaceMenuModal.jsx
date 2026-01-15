"use client"

import { Icon } from "./Icon"
import "../../styles/PlaceMenuModal.css"

export default function PlaceMenuModal({ isOpen, onClose, place }) {
  if (!isOpen) return null

  const menuItems = [
    { icon: "search", label: "Voir plus de détails", action: () => console.log("Voir détails") },
    { icon: "mail", label: "Contacter l'établissement", action: () => console.log("Contacter") },
    { icon: "web", label: "Visiter le site internet", action: () => window.open(place?.website, "_blank") },
    { icon: "position", label: "Y aller", action: () => console.log("Y aller") },
    { icon: "warning", label: "Signaler une erreur", action: () => console.log("Signaler erreur"), noBorder: true },
  ]

  return (
    <div className="place-menu-overlay" onClick={onClose}>
      <div className="place-menu-modal" onClick={(e) => e.stopPropagation()}>
        <div className="place-menu-list">
          {menuItems.map((item, index) => (
            <div key={index} className="place-menu-item-wrapper">
              <button className="place-menu-item" onClick={item.action}>
                <Icon name={item.icon} size={26} color="#445E9A" />
                <span className="place-menu-item-label">{item.label}</span>
                <Icon name="arrowRight" size={24} color="#445E9A" />
              </button>
              {!item.noBorder && <div className="place-menu-divider" />}
            </div>
          ))}
        </div>
        <div style={{ width: "292px", height: "21px", background: "#FAFBFE" }} />
      </div>
    </div>
  )
}
