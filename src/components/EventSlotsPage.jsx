"use client"

import { useState } from "react"
import { Icon, Button } from "./ui"
import CreateEventFlow from "./CreateEventFlow"
import "../styles/EventSlotsPage.css"

export default function EventSlotsPage({ event, onClose, onSlotSelect }) {
  const [showCreateFlow, setShowCreateFlow] = useState(false)

  if (!event) return null

  const handleSlotClick = (slot) => {
    if (onSlotSelect) {
      onSlotSelect(slot)
    }
  }

  const handleCreateEvent = () => {
    setShowCreateFlow(true)
  }

  const handleCreateComplete = () => {
    setShowCreateFlow(false)
    if (onSlotSelect) {
      onSlotSelect({ id: "new", date: "Nouvelle sortie", time: "À venir" })
    }
  }

  if (showCreateFlow) {
    return (
      <CreateEventFlow
        event={event}
        onClose={() => setShowCreateFlow(false)}
        onComplete={handleCreateComplete}
      />
    )
  }

  return (
    <div className="event-slots-page">
      <div className="event-slots-header">
        <button className="event-slots-back" onClick={onClose}>
          <Icon name="arrowLeft" size={30} color="#2A3556" />
        </button>
        <h1 className="event-slots-title">Title</h1>
        <div className="event-slots-spacer" />
      </div>

      <div className="event-slots-content">
        {event.slots?.map((slot) => (
          <div
            key={slot.id}
            className="event-slot-card"
            onClick={() => handleSlotClick(slot)}
          >
            <div className="event-slot-info">
              <div className="event-slot-datetime">
                <span className="event-slot-date">{slot.date}</span>
                <span className="event-slot-dot" />
                <span className="event-slot-time">{slot.time}</span>
              </div>
              <span className="event-slot-organizer">Avec Julia {slot.organizer}</span>
            </div>
            <div className="event-slot-participants">
              <div className="event-slot-avatars">
                {slot.participants?.slice(0, 3).map((name, index) => (
                  <img
                    key={index}
                    src={`/woman-${['pink-hair', 'blonde', 'blue-hair'][index % 3]}-avatar.jpg`}
                    alt={name}
                    className="event-slot-avatar"
                    style={{ marginLeft: index > 0 ? "-10px" : "0", zIndex: 3 - index }}
                  />
                ))}
              </div>
              <span className="event-slot-participants-text">
                {slot.participants?.length > 2
                  ? `${slot.participants[0]}, ${slot.participants[1]} et ${slot.participants.length - 2} autres y vont`
                  : slot.participants?.join(", ") + " y vont"}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="event-slots-footer">
        <Button
          variant="primary"
          size="large"
          iconLeft={<Icon name="plus" size={18} color="white" />}
          style={{ width: "100%" }}
          onClick={handleCreateEvent}
        >
          Créer une sortie
        </Button>
      </div>
    </div>
  )
}
