"use client"

import { useState } from "react"
import { Icon, Button } from "./ui"
import PlaceMenuModal from "./ui/PlaceMenuModal"
import EventSlotsPage from "./EventSlotsPage"
import EventChatPage from "./EventChatPage"
import "../styles/EventDetailsPage.css"

export default function EventDetailsPage({ event, onClose }) {
  const [isRegistered, setIsRegistered] = useState(event?.isUserRegistered || false)
  const [showSlotsPage, setShowSlotsPage] = useState(false)
  const [showChatPage, setShowChatPage] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)

  if (!event) return null

  const participantText = event.participants?.length > 2
    ? `${event.participants[0]?.name}, ${event.participants[1]?.name} et ${event.participants.length - 2} autres y vont`
    : event.participants?.map(p => p.name).join(", ") + " y vont"

  const handleParticipate = () => {
    setShowSlotsPage(true)
  }

  const handleAccessChat = () => {
    setShowChatPage(true)
  }

  const handleSlotSelect = (slot) => {
    setIsRegistered(true)
    setShowSlotsPage(false)
  }

  if (showSlotsPage) {
    return (
      <EventSlotsPage
        event={event}
        onClose={() => setShowSlotsPage(false)}
        onSlotSelect={handleSlotSelect}
      />
    )
  }

  if (showChatPage) {
    return (
      <EventChatPage
        event={event}
        onClose={() => setShowChatPage(false)}
      />
    )
  }

  return (
    <div className="event-details-page">
      <div className="event-details-image-container">
        <img src={event.image || "/placeholder.svg"} alt={event.title} className="event-details-image" />
        <div className="event-details-image-overlay" />
        <button className="event-details-close" onClick={onClose}>
          <Icon name="close" size={18} color="#2D3A40" />
        </button>
      </div>

      <div className="event-details-content">
        <div className="event-details-header">
          <div className="event-details-title-row">
            <h1 className="event-details-title">{event.title}</h1>
            <button className="event-details-menu">
              <Icon name="dots" size={22} color="#2D3A40" />
            </button>
          </div>
          <p className="event-details-date">{event.date}</p>
        </div>

        <div className="event-details-participants">
          <div className="event-details-avatars">
            {event.participants?.slice(0, 3).map((participant, index) => (
              <img
                key={participant.id}
                src={participant.avatar || "/placeholder.svg"}
                alt={participant.name}
                className="event-details-participant-avatar"
                style={{ marginLeft: index > 0 ? "-10px" : "0", zIndex: 3 - index }}
              />
            ))}
          </div>
          <span className="event-details-participants-text">{participantText}</span>
        </div>

        <div className="event-details-info-card">
          <div className="event-details-info-row">
            <Icon name="ping" size={27} color="#364A78" />
            <div className="event-details-info-text">
              <span className="event-details-info-primary">{event.address}</span>
              <span className="event-details-info-secondary">{event.district}</span>
            </div>
          </div>
          <div className="event-details-info-row">
            <Icon name="clock" size={27} color="#364A78" />
            <div className="event-details-info-text">
              <span className="event-details-info-primary">{event.date}</span>
              <span className="event-details-info-secondary">{event.timeSlot}</span>
            </div>
          </div>
          <div className="event-details-info-row">
            <Icon name="smile" size={27} color="#364A78" />
            <div className="event-details-info-text">
              <span className="event-details-info-primary">
                Accompagné par <span className="event-details-organizer">@{event.organizer?.name}</span>
              </span>
            </div>
          </div>
        </div>

        <p className="event-details-description">{event.description}</p>
      </div>

      <div className="event-details-footer">
        {isRegistered ? (
          <>
            <span className="event-details-registered-text">Tu es inscrite !</span>
            <Button
              variant="primary"
              size="large"
              onClick={handleAccessChat}
              iconLeft={<Icon name="message" size={18} color="white" />}
            >
              Accéder à la discussion
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="primary"
              size="large"
              onClick={handleParticipate}
              style={{ flex: 1 }}
            >
              Participer à la sortie
            </Button>
            <button className="event-details-share-btn" onClick={() => setShowShareMenu(true)}>
              <Icon name="share" size={29} color="#364A78" />
            </button>
          </>
        )}
      </div>

      <PlaceMenuModal
        isOpen={showShareMenu}
        onClose={() => setShowShareMenu(false)}
        place={{ name: event.title, website: "#" }}
      />
    </div>
  )
}
