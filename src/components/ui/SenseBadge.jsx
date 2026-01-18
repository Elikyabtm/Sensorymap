import { Icon } from "./Icon"
import "./SenseBadge.css"

const SenseBadge = ({ type, variant = "sansContour", size = 32 }) => {
  const senseConfig = {
    light: {
      circleColor: "#8B7BB5",
      iconName: "light",
    },
    sound: {
      circleColor: "#C67B52",
      iconName: "sound",
    },
    crowd: {
      circleColor: "#5A9E9E",
      iconName: "crowd",
    },
  }

  const config = senseConfig[type]
  if (!config) return null

  const iconSize = Math.round(size * 0.55)

  if (variant === "contour") {
    return (
      <div
        className="sense-badge sense-badge-contour"
        style={{
          width: size,
          height: size,
          backgroundColor: config.circleColor,
          borderColor: "white",
        }}
      >
        <Icon name={config.iconName} size={iconSize} color="white" />
      </div>
    )
  }

  // sansContour (default)
  return (
    <div
      className="sense-badge sense-badge-sans-contour"
      style={{
        width: size,
        height: size,
        backgroundColor: config.circleColor,
      }}
    >
      <Icon name={config.iconName} size={iconSize} color="white" />
    </div>
  )
}

export default SenseBadge
