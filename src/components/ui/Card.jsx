"use client"
import "../../styles/design-tokens.css"
import "./Card.css"

export const Card = ({
  variant = "recommendation",
  image,
  title,
  subtitle,
  badge,
  sensors = [],
  onBookmark,
  className = "",
  children,
}) => {
  return (
    <div className={`card card-${variant} ${className}`}>
      {image && (
        <div className="card-image-container">
          <img src={image || "/placeholder.svg"} alt={title} className="card-image" />
          {badge && (
            <div className="card-badge">
              <span className="card-badge-icon">⭐</span>
            </div>
          )}
        </div>
      )}

      <div className="card-content">
        {title && <div className="card-title">{title}</div>}
        {subtitle && <div className="card-subtitle">{subtitle}</div>}

        {sensors.length > 0 && (
          <div className="card-sensors">
            {sensors.map((sensor, index) => (
              <div key={index} className="card-sensor" style={{ backgroundColor: sensor.color }} />
            ))}
          </div>
        )}

        {onBookmark && (
          <button className="card-bookmark" onClick={onBookmark}>
            🔖
          </button>
        )}

        {children}
      </div>
    </div>
  )
}
