import { Icon } from "./index"
import "./EventModal.css"

export default function EventModal({ event, onClose, onOpenDetails }) {
  if (!event) return null

  const handleModalClick = () => {
    if (onOpenDetails) {
      onOpenDetails(event)
    }
  }

  return (
    <div className="event-modal" onClick={handleModalClick}>
      <div className="event-modal-image">
        <img src={event.image || "/placeholder.svg"} alt={event.title} />
      </div>
      <div className="event-modal-content">
        <h3 className="event-modal-title">{event.title}</h3>
        <p className="event-modal-description">Cette sortie accompagnée propose une découverte progressive d’un espace public en petit groupe.</p>
        <div className="event-modal-footer">
          <div className="event-modal-user">
            <img
              src={event.organizer?.avatar || "/woman-avatar.jpg"}
              alt={event.organizer?.name || "user"}
              className="event-modal-avatar"
            />
            <span className="event-modal-username">@{event.organizer?.name || "user34"}</span>
          </div>
          <span className="event-modal-time">{event.date}</span>
        </div>
      </div>
    </div>
  )
}
