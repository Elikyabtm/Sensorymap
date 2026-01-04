"use client"

import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet"
import L from "leaflet"
import { useEffect, forwardRef, useImperativeHandle, useState } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import MapMarker from "./ui/MapMarker"

// (optionnel) si tu veux un marker custom comme tu faisais
const createMarkerIcon = (type, imageUrl) => {
  return L.divIcon({
    className: "custom-map-marker",
    html: renderToStaticMarkup(<MapMarker type={type} imageUrl={imageUrl} />),
    iconSize: [42, 42],
    iconAnchor: [21, 21],
  })
}

function MapController({ centerPosition }) {
  const map = useMap()

  useEffect(() => {
    if (centerPosition) {
      map.flyTo(centerPosition, 15, {
        duration: 1.5,
      })
    }
  }, [centerPosition, map])

  return null
}

const Map = forwardRef(({ onMarkerClick }, ref) => {
  const paris = [48.8566, 2.3522]
  const [centerPosition, setCenterPosition] = useState(null)

  const places = [
    {
      id: 1,
      name: "Restaurant indien",
      position: paris,
      type: "certified",
      imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=400&fit=crop",
      senses: {
        light: 70,
        sound: 45,
        crowd: 85,
      },
    },
    {
      id: 2,
      name: "Cafe de Paris",
      position: [48.8466, 2.3422],
      type: "regular",
      imageUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=300&h=400&fit=crop",
      senses: {
        light: 60,
        sound: 30,
        crowd: 40,
      },
    },
  ]

  useImperativeHandle(ref, () => ({
    recenterToUserLocation: () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords
            setCenterPosition([latitude, longitude])
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

      {places.map((place) => (
        <Marker
          key={place.id}
          position={place.position}
          icon={createMarkerIcon(place.type, place.imageUrl)}
          eventHandlers={{
            click: () => {
              setCenterPosition(place.position)
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
