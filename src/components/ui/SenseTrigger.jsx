import SenseBadge from "./SenseBadge"
import "./SenseTrigger.css"

const SenseTrigger = ({ type, label, selected, onClick, ...props }) => {
  const senseConfig = {
    light: {
      bgColor: selected ? "#C8BFD8" : "transparent",
      strokeColor: selected ? "#8B7BB5" : "transparent",
      textColor: "#2A3556",
    },
    sound: {
      bgColor: selected ? "#EFCFC0" : "transparent",
      strokeColor: selected ? "#C67B52" : "transparent",
      textColor: "#2A3556",
    },
    crowd: {
      bgColor: selected ? "#B0D5D5" : "transparent",
      strokeColor: selected ? "#5A9E9E" : "transparent",
      textColor: "#2A3556",
    },
  }

  const config = senseConfig[type]

  return (
    <button
      className="sense-trigger"
      data-selected={selected}
      onClick={onClick}
      style={{
        background: config.bgColor,
        border: `2px solid ${config.strokeColor}`,
      }}
      {...props}
    >
      <div className="sense-icon-container">
        <SenseBadge type={type} variant="sansContour" size={59} />
      </div>
      <div className="sense-label" style={{ color: config.textColor }}>
        {label}
      </div>
    </button>
  )
}

export default SenseTrigger
