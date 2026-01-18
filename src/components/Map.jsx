"use client"

import { MapContainer, TileLayer, Marker, useMap, Circle, Polygon } from "react-leaflet"
import MarkerClusterGroup from "react-leaflet-cluster"
import L from "leaflet"
import { useEffect, forwardRef, useImperativeHandle, useState } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import placesData from "../data/places.json"
import { filterPlacesBySenses } from "../utils/senseFilters"
import { Icon } from "./ui"

const getCertifiedIconHtml = () => {
  return renderToStaticMarkup(<Icon name="certified" color="white" size={10} />)
}

const createMarkerIcon = (type, imageUrl) => {
  const isCertified = type === "certified"
  const borderColor = isCertified ? "#8FDA9C" : "white"

  const certifiedIconHtml = isCertified ? getCertifiedIconHtml() : ""

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
          background: #8FDA9C; 
          border-radius: 1000px; 
          outline: 1px #8FDA9C solid; 
          outline-offset: -1px;
          display: flex;
          justify-content: center;
          align-items: center;
        ">
          ${certifiedIconHtml}
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

const createPostMarkerIcon = (placeImageUrl, avatarUrl) => {
  const html = `
    <div style="width: 50px; height: 50px; position: relative;">
      <img 
        src="${placeImageUrl}" 
        style="
          width: 42px; 
          height: 42px; 
          position: absolute; 
          left: 0; 
          top: 8px; 
          box-shadow: 0px 0px 10px rgba(33, 33, 33, 0.38); 
          border-radius: 9999px; 
          border: 1.5px white solid;
          object-fit: cover;
        " 
      />
      <img 
        src="${avatarUrl}" 
        style="
          width: 24px; 
          height: 24px; 
          position: absolute; 
          right: 0; 
          top: 0; 
          box-shadow: 0px 2px 6px rgba(33, 33, 33, 0.3); 
          border-radius: 9999px; 
          border: 2px white solid;
          object-fit: cover;
        " 
      />
    </div>
  `

  return L.divIcon({
    className: "post-marker",
    html: html,
    iconSize: [50, 50],
    iconAnchor: [25, 29],
  })
}

const createEventMarkerIcon = (imageUrl) => {
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
          border: 1.5px white solid;
          object-fit: cover;
        " 
      />
    </div>
  `

  return L.divIcon({
    className: "event-marker",
    html: html,
    iconSize: [42, 42],
    iconAnchor: [21, 21],
  })
}

const createClusterCustomIcon = (cluster) => {
  const count = cluster.getChildCount()
  let size = 40
  let className = "cluster-small"

  if (count >= 10) {
    size = 50
    className = "cluster-medium"
  }
  if (count >= 20) {
    size = 60
    className = "cluster-large"
  }

  return L.divIcon({
    html: `<div class="cluster-marker ${className}">
      <span>${count}</span>
    </div>`,
    className: "custom-cluster-icon",
    iconSize: L.point(size, size, true),
  })
}

const generateBlobPoints = (centerLat, centerLng, baseRadius, irregularity = 0.4, numPoints = 12) => {
  const points = []
  const angleStep = (2 * Math.PI) / numPoints

  // Convertir le rayon en degrés (approximation)
  const radiusLat = baseRadius / 111000 // 1 degré latitude ≈ 111km
  const radiusLng = baseRadius / (111000 * Math.cos((centerLat * Math.PI) / 180))

  for (let i = 0; i < numPoints; i++) {
    const angle = i * angleStep
    // Variation aléatoire mais déterministe basée sur l'index
    const randomFactor = 1 + Math.sin(i * 2.5) * irregularity + Math.cos(i * 1.7) * irregularity * 0.5
    const lat = centerLat + radiusLat * randomFactor * Math.sin(angle)
    const lng = centerLng + radiusLng * randomFactor * Math.cos(angle)
    points.push([lat, lng])
  }

  return points
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

const Map = forwardRef(
  (
    {
      onMarkerClick,
      selectedSenses,
      selectedCategory,
      reports,
      onReportClick,
      activeTab = "discover",
      communityPosts = [],
      communityEvents = [],
      onPostClick,
      onEventClick,
    },
    ref,
  ) => {
    const paris = [48.8566, 2.3522]
    const [centerPosition, setCenterPosition] = useState(null)
    const [userLocation, setUserLocation] = useState(null)
    const [locationAccuracy, setLocationAccuracy] = useState(null)
    const [reportCircle, setReportCircle] = useState(null)

    const places = placesData

    let filteredPlaces = filterPlacesBySenses(places, selectedSenses || { light: false, sound: false, crowd: false })

    if (selectedCategory) {
      filteredPlaces = filteredPlaces.filter((place) => place.category === selectedCategory)
    }

    const showPlaceMarkers = activeTab === "discover"
    const showCommunityMarkers = activeTab === "community"

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
      setViewToPosition: (position) => {
        if (position && position.length === 2) {
          setCenterPosition(position)
        }
      },
      setReportCircle: (circleData) => {
        setReportCircle(circleData)
      },
      clearReportCircle: () => {
        setReportCircle(null)
      },
    }))

    return (
      <MapContainer center={paris} zoom={13} style={{ width: "100%", height: "100%" }} zoomControl={false}>
        <TileLayer
  url={`https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key=${import.meta.env.VITE_STADIA_API_KEY}`}
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

        {reportCircle && (
          <Circle
            center={[reportCircle.lat, reportCircle.lng]}
            radius={reportCircle.extent}
            pathOptions={{
              color: "transparent",
              fillColor: reportCircle.fillColor,
              fillOpacity: reportCircle.opacity,
              weight: 0,
            }}
            className="report-blob-preview"
          />
        )}

        {reports &&
          reports.map((report) => {
            const blobPoints = generateBlobPoints(report.location.lat, report.location.lng, report.extent, 0.35, 16)
            const opacity = 0.4 + (report.intensity / 100) * 0.4

            return (
              <Polygon
                key={report.id}
                positions={blobPoints}
                pathOptions={{
                  color: "transparent",
                  fillColor: "#7B9AE0",
                  fillOpacity: opacity,
                  weight: 0,
                  className: "report-blob-zone",
                }}
                eventHandlers={{
                  click: () => {
                    if (onReportClick) {
                      onReportClick(report)
                    }
                  },
                }}
              />
            )
          })}

        {showPlaceMarkers && (
          <MarkerClusterGroup
            chunkedLoading
            iconCreateFunction={createClusterCustomIcon}
            maxClusterRadius={60}
            spiderfyOnMaxZoom={true}
            showCoverageOnHover={false}
            zoomToBoundsOnClick={true}
            disableClusteringAtZoom={16}
          >
            {filteredPlaces.map((place) => (
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
          </MarkerClusterGroup>
        )}

        {showCommunityMarkers && communityPosts.length > 0 && (
          <MarkerClusterGroup
            chunkedLoading
            iconCreateFunction={createClusterCustomIcon}
            maxClusterRadius={50}
            spiderfyOnMaxZoom={true}
            showCoverageOnHover={false}
            zoomToBoundsOnClick={true}
            disableClusteringAtZoom={16}
          >
            {communityPosts.map((post) => (
              <Marker
                key={`post-${post.id}`}
                position={post.coordinates}
                icon={createPostMarkerIcon(
                  post.image || "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=100&h=100&fit=crop",
                  post.user.avatar,
                )}
                eventHandlers={{
                  click: () => {
                    setCenterPosition(post.coordinates)
                    if (onPostClick) {
                      onPostClick(post)
                    }
                  },
                }}
              />
            ))}
          </MarkerClusterGroup>
        )}

        {showCommunityMarkers && communityEvents.length > 0 && (
          <MarkerClusterGroup
            chunkedLoading
            iconCreateFunction={createClusterCustomIcon}
            maxClusterRadius={50}
            spiderfyOnMaxZoom={true}
            showCoverageOnHover={false}
            zoomToBoundsOnClick={true}
            disableClusteringAtZoom={16}
          >
            {communityEvents.map((event) => (
              <Marker
                key={`event-${event.id}`}
                position={event.coordinates}
                icon={createEventMarkerIcon(
                  event.image || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100&h=100&fit=crop",
                )}
                eventHandlers={{
                  click: () => {
                    setCenterPosition(event.coordinates)
                    if (onEventClick) {
                      onEventClick(event)
                    }
                  },
                }}
              />
            ))}
          </MarkerClusterGroup>
        )}
      </MapContainer>
    )
  },
)

Map.displayName = "Map"

export default Map
