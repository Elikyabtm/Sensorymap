import { Icon } from "./Icon"
import "./MapMarker.css"

export const MapMarker = ({ type = "regular", imageUrl = "https://placehold.co/42x42", size = 42 }) => {
  const isCertified = type === "certified"

  return (
    <div className="map-marker" style={{ width: size, height: size, position: "relative" }}>
      <img
        className={`map-marker-image ${isCertified ? "certified" : "regular"}`}
        src={imageUrl || "/placeholder.svg"}
        alt="Map marker"
        style={{
          width: size,
          height: size,
          left: 0,
          top: 0,
          position: "absolute",
          background: isCertified ? "white" : "transparent",
          boxShadow: isCertified
            ? "0px 0px 10px rgba(2.78, 2.78, 2.78, 0.38)"
            : "0px 0px 10px rgba(33.48, 33.48, 33.48, 0.38)",
          borderRadius: 9999,
          border: isCertified
            ? "1.50px var(--components-pins-spots-certified-stroke) solid"
            : "1.50px var(--components-pins-spots-regular-stroke) solid",
        }}
      />

      {isCertified && (
        <div
          className="map-marker-badge"
          style={{
            width: 14.76,
            height: 14.76,
            left: size * 0.648,
            top: -1,
            position: "absolute",
            background: "var(--components-badge_certified-fill)",
            borderRadius: 1000,
            outline: "1px var(--components-badge_certified-stroke) solid",
            outlineOffset: "-1px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon name="star" size={9} color="white" />
        </div>
      )}
    </div>
  )
}

export default MapMarker
