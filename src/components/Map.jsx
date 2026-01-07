"use client"

import { MapContainer, TileLayer, Marker, useMap, Circle } from "react-leaflet"
import L from "leaflet"
import { useEffect, forwardRef, useImperativeHandle, useState } from "react"
import placesData from "../data/places.json"

const createMarkerIcon = (type, imageUrl) => {
  const isCertified = type === "certified"
  const borderColor = isCertified ? "#9D9064" : "white"

  const html = `
    <div style="width: 42px; height: 42px; position: relative;">
      <img 
        src="${imageUrl}" 
        style="
          width: 42px; 
          height: 42px; 
          position: absolute; 
          left: 0; 
          top: 0; 
          box-shadow: 0px 0px 10px rgba(33, 33, 33, 0.38); 
          border-radius: 9999px; 
          border: 1.5px ${borderColor} solid;
          object-fit: cover;
        " 
      />
      ${
        isCertified
          ? `
        <div style="
          width: 14.76px; 
          height: 14.76px; 
          left: 27.24px; 
          top: -1px; 
          position: absolute; 
          background: #9D9064; 
          border-radius: 1000px; 
          outline: 1px #9D9064 solid; 
          outline-offset: -1px;
          display: flex;
          justify-content: center;
          align-items: center;
        ">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="white">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
      `
          : ""
      }
    </div>
  `

  return L.divIcon({
    className: "custom-map-marker",
    html: html,
    iconSize: [42, 42],
    iconAnchor: [21, 21],
  })
}

const createUserLocationIcon = () => {
  const html = `
    <div style="width: 20px; height: 20px; position: relative;">
      <div style="
        width: 20px; 
        height: 20px; 
        background: #4285F4; 
        border-radius: 50%; 
        border: 3px solid white;
        box-shadow: 0 0 10px rgba(66, 133, 244, 0.5);
      "></div>
    </div>
  `

  return L.divIcon({
    className: "user-location-marker",
    html: html,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  })
}

function MapController({ centerPosition }) {
  const map = useMap()

  useEffect(() => {
    if (centerPosition) {
      map.flyTo(centerPosition, 15, {
        duration: 2,
        easeLinearity: 0.25,
      })
    }
  }, [centerPosition, map])

  return null
}

const Map = forwardRef(({ onMarkerClick }, ref) => {
  const paris = [48.8566, 2.3522]
  const [centerPosition, setCenterPosition] = useState(null)
  const [userLocation, setUserLocation] = useState(null)
  const [locationAccuracy, setLocationAccuracy] = useState(null)

  const places = placesData

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords
          const userPos = [latitude, longitude]
          setUserLocation(userPos)
          setLocationAccuracy(accuracy)
          setCenterPosition(userPos)
        },
        (error) => {
          console.error("Error getting initial location:", error)
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        },
      )

      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords
          setUserLocation([latitude, longitude])
          setLocationAccuracy(accuracy)
        },
        (error) => {
          console.error("Error watching location:", error)
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        },
      )

      return () => {
        navigator.geolocation.clearWatch(watchId)
      }
    }
  }, [])

  useImperativeHandle(ref, () => ({
    recenterToUserLocation: () => {
      if (userLocation) {
        setCenterPosition(userLocation)
      } else if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords
            const userPos = [latitude, longitude]
            setUserLocation(userPos)
            setCenterPosition(userPos)
          },
          (error) => {
            console.error("Error getting location:", error)
            alert("Impossible d'obtenir votre position. Veuillez vérifier les permissions.")
          },
        )
      } else {
        alert("La géolocalisation n'est pas supportée par votre navigateur.")
      }
    },
  }))

  return (
    <MapContainer center={paris} zoom={13} style={{ width: "100%", height: "100%" }} zoomControl={false}>
      <TileLayer
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        maxZoom={20}
      />
      <MapController centerPosition={centerPosition} />

      {userLocation && (
        <>
          {locationAccuracy && (
            <Circle
              center={userLocation}
              radius={locationAccuracy}
              pathOptions={{
                fillColor: "#4285F4",
                fillOpacity: 0.1,
                color: "#4285F4",
                weight: 1,
                opacity: 0.3,
              }}
            />
          )}
          <Marker position={userLocation} icon={createUserLocationIcon()} />
        </>
      )}

      {places.map((place) => (
        <Marker
          key={place.id}
          position={place.coordinates}
          icon={createMarkerIcon(place.type, place.image)}
          eventHandlers={{
            click: () => {
              setCenterPosition(place.coordinates)
              if (onMarkerClick) {
                onMarkerClick(place)
              }
            },
          }}
        />
      ))}
    </MapContainer>
  )
})

Map.displayName = "Map"

export default Map
