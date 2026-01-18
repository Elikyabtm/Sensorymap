'use client';

import "./EventCard.css"

export function EventCard({ event, onClick }) {
  const { title, date, image, participants = [] } = event

  return (
    <div className="event-card" onClick={onClick}>
      <div className="event-card-image">
        <img src={image || "/placeholder.svg"} alt={title} />
        <div className="event-card-overlay" />
      </div>
      
      <div className="event-card-date">
        <span>{date}</span>
      </div>
      
      <div className="event-card-content">
        <h4 className="event-card-title">{title}</h4>
        
        {participants.length > 0 && (
          <div className="event-card-participants">
            {participants.slice(0, 3).map((participant, index) => (
              <div 
                key={index} 
                className="event-card-avatar"
                style={{ marginLeft: index > 0 ? -8 : 0, zIndex: 3 - index }}
              >
                <img src={participant.avatar || "/placeholder.svg"} alt={participant.name || "Participant"} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
