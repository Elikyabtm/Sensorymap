"use client"

import { Icon } from "./ui"
import placesData from "../data/places.json"
import { filterPlacesBySenses } from "../utils/senseFilters"

export default function CommunityContent({ selectedSenses, selectedCategory, onCategoryClick }) {
  const filteredPlaces = filterPlacesBySenses(
    placesData,
    selectedSenses || { light: false, sound: false, crowd: false },
  ).filter((place) => !selectedCategory || place.category === selectedCategory)

  const certifiedPlaces = filteredPlaces.filter((place) => place.type === "certified")

  const getSenseBarWidth = (value) => {
    return Math.max(10, 90 - value * 0.9)
  }

  const categories = [
    { name: "Café", icon: "cafe" }, // TODO: remplacer par vraie icône café
    { name: "Restaurant", icon: "restaurant" }, // TODO: remplacer par vraie icône restaurant
    { name: "Musée", icon: "museum" }, // TODO: remplacer par vraie icône musée
    { name: "Parc", icon: "park" }, // TODO: remplacer par vraie icône parc
    { name: "Bibliothèque", icon: "library" }, // TODO: remplacer par vraie icône librairie
    { name: "Bar", icon: "bar" },
  ]

  return (
    <>
      <div className="drawer-filters">
        {categories.map((cat) => (
          <div key={cat.name} className="filter-item">
            <button
              className={`filter-circle ${selectedCategory === cat.name ? "active" : ""}`}
              onClick={() => onCategoryClick(cat.name)}
            >
              <Icon name={cat.icon} size={36} color={selectedCategory === cat.name ? "white" : "#364A78"} />
            </button>
            <span className="filter-label">{cat.name}</span>
          </div>
        ))}
      </div>
      {/* End of correction */}

      {/* Section Sorties à venir */}
      <div className="carousel-section">
        <div className="carousel-header">
          <h3 className="carousel-title">Sorties à venir</h3>
          <Icon name="arrowRight" size={20} color="#2A3556" />
        </div>
        <div className="carousel-cards">
          {[1, 2, 3].map((i) => (
            <div key={i} className="event-card">
              <div className="event-date">17 oct.</div>
              <div className="event-title">Restaurant indien</div>
              <div className="event-badges">
                <div className="event-badge" style={{ backgroundColor: "#B597F6" }}>
                  <Icon name="light" size={14} color="white" />
                </div>
                <div className="event-badge" style={{ backgroundColor: "#BEDC9E" }}>
                  <Icon name="sound" size={14} color="white" />
                </div>
                <div className="event-badge" style={{ backgroundColor: "#FFA576" }}>
                  <Icon name="crowd" size={14} color="white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section Les recommandations de l'équipe */}
      <div className="carousel-section">
        <div className="carousel-header">
          <h3 className="carousel-title">Les recommandations de l'équipe</h3>
          <Icon name="arrowRight" size={20} color="#2A3556" />
        </div>
        <div className="carousel-cards">
          {certifiedPlaces.slice(0, 2).map((place) => (
            <div key={place.id} className="recommendation-card">
              <div
                className="recommendation-image"
                style={{
                  backgroundImage: `url(${place.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="certified-badge">
                  <Icon name="certified" size={16} color="white" />
                </div>
              </div>
              <div className="recommendation-content">
                <div className="recommendation-title">{place.name}</div>
                <div className="recommendation-footer">
                  <div className="recommendation-indicators">
                    <div
                      className="recommendation-indicator"
                      style={{ backgroundColor: "#B597F6", width: `${getSenseBarWidth(place.senses.light)}px` }}
                    />
                    <div
                      className="recommendation-indicator"
                      style={{ backgroundColor: "#BEDC9E", width: `${getSenseBarWidth(place.senses.sound)}px` }}
                    />
                    <div
                      className="recommendation-indicator"
                      style={{ backgroundColor: "#FFA576", width: `${getSenseBarWidth(place.senses.crowd)}px` }}
                    />
                  </div>
                  <button className="recommendation-bookmark">
                    <Icon name="heart" size={18} color="rgba(255, 255, 255, 0.7)" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section Derniers posts */}
      <div className="carousel-section">
        <div className="carousel-header">
          <h3 className="carousel-title">Derniers posts</h3>
          <Icon name="arrowRight" size={20} color="#2A3556" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", padding: "0 16px" }}>
          {[1, 2].map((i) => (
            <div key={i} className="post-item">
              <div className="post-image" />
              <div className="post-content">
                <div>
                  <div className="post-title">Titre du post</div>
                  <div className="post-description">Description ici</div>
                </div>
                <div className="post-time">Il y a 2min</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section Les recommandations de l'équipe (répétée) */}
      <div className="carousel-section">
        <div className="carousel-header">
          <h3 className="carousel-title">Les recommandations de l'équipe</h3>
          <Icon name="arrowRight" size={20} color="#2A3556" />
        </div>
        <div className="carousel-cards">
          {certifiedPlaces.slice(2, 4).map((place) => (
            <div key={place.id} className="recommendation-card">
              <div
                className="recommendation-image"
                style={{
                  backgroundImage: `url(${place.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="certified-badge">
                  <Icon name="certified" size={16} color="white" />
                </div>
              </div>
              <div className="recommendation-content">
                <div className="recommendation-title">{place.name}</div>
                <div className="recommendation-footer">
                  <div className="recommendation-indicators">
                    <div
                      className="recommendation-indicator"
                      style={{ backgroundColor: "#B597F6", width: `${getSenseBarWidth(place.senses.light)}px` }}
                    />
                    <div
                      className="recommendation-indicator"
                      style={{ backgroundColor: "#BEDC9E", width: `${getSenseBarWidth(place.senses.sound)}px` }}
                    />
                    <div
                      className="recommendation-indicator"
                      style={{ backgroundColor: "#FFA576", width: `${getSenseBarWidth(place.senses.crowd)}px` }}
                    />
                  </div>
                  <button className="recommendation-bookmark">
                    <Icon name="heart" size={18} color="rgba(255, 255, 255, 0.7)" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
