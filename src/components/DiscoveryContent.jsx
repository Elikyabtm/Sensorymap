"use client"

import { Icon, Card } from "./ui"
import placesData from "../data/places.json"
import { filterPlacesBySenses } from "../utils/senseFilters"

export default function DiscoveryContent({ selectedSenses, selectedCategory, onCategoryClick, onPlaceClick }) {
  const filteredPlaces = filterPlacesBySenses(
    placesData,
    selectedSenses || { light: false, sound: false, crowd: false },
  ).filter((place) => !selectedCategory || place.category === selectedCategory)

  const certifiedPlaces = filteredPlaces.filter((place) => place.type === "certified")
  const regularPlaces = filteredPlaces.filter((place) => place.type !== "certified")

  const categories = [
    { name: "Restaurant", icon: "restaurant", label: "Restos" },
    { name: "Café", icon: "cafe", label: "Cafés" },
    { name: "Musée", icon: "museum", label: "Expos" },
    { name: "Bar", icon: "bar", label: "Bars" },
    { name: "Parc", icon: "park", label: "Parcs" },
    { name: "Bibliothèque", icon: "library", label: "Bibl." },
  ]

  const lists = [
    { id: 1, title: "Restaurants calmes du 10", superscript: "e", design: "dark" },
    { id: 2, title: "Les meilleures pizza à Paris", superscript: "", design: "medium", icon: "pizza" },
    { id: 3, title: "Où sortir le week-end", superscript: "", design: "light", icon: "disco" },
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
            <span className="filter-label">{cat.label}</span>
          </div>
        ))}
      </div>

      {/* Section Les recommandations de l'equipe (certifies) */}
      {certifiedPlaces.length > 0 && (
        <div className="carousel-section">
          <div className="carousel-header">
            <h3 className="carousel-title">Les recommandations de l'équipe</h3>
            <Icon name="arrowRight" size={20} color="#2A3556" />
          </div>
          <div className="carousel-cards">
            {certifiedPlaces.map((place) => (
              <Card
                key={place.id}
                variant="certified"
                image={place.image}
                title={place.name}
                senses={place.senses}
                onClick={() => onPlaceClick && onPlaceClick(place)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Section Listes */}
      <div className="carousel-section">
        <div className="carousel-header">
          <h3 className="carousel-title">Listes</h3>
          <Icon name="arrowRight" size={20} color="#2A3556" />
        </div>
        <div className="carousel-cards">
          {lists.map((list) => (
            <div key={list.id} className={`list-card list-card-${list.design}`}>
              <div className="list-card-shadow" />
              <div className="list-card-main">
                <div className="list-card-decorations">
                  {list.design === "dark" && (
                    <>
                      <svg className="list-card-spiral spiral-1" width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <path d="M14 2C14 2 5 5 5 14C5 19 8 22 14 22C20 22 23 19 23 14C23 9 20 7 16 7C12 7 10 10 10 14C10 17 12 19 14 19C16 19 17 17 17 15C17 13 16 12 15 12C14 12 13 13 13 14" stroke="rgba(255,255,255,0.32)" strokeWidth="2" strokeLinecap="round" fill="none"/>
                      </svg>
                      <svg className="list-card-spiral spiral-2" width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <path d="M14 2C14 2 5 5 5 14C5 19 8 22 14 22C20 22 23 19 23 14C23 9 20 7 16 7C12 7 10 10 10 14C10 17 12 19 14 19C16 19 17 17 17 15C17 13 16 12 15 12C14 12 13 13 13 14" stroke="rgba(255,255,255,0.20)" strokeWidth="2" strokeLinecap="round" fill="none"/>
                      </svg>
                      <svg className="list-card-spiral spiral-3" width="39" height="39" viewBox="0 0 39 39" fill="none">
                        <path d="M19.5 2C19.5 2 7 6 7 19.5C7 27 11 31 19.5 31C28 31 32 27 32 19.5C32 12 28 9 22 9C16 9 13 13 13 19.5C13 25 17 27 19.5 27C23 27 25 24 25 21C25 18 23 16 21 16C19 16 18 17 18 19" stroke="rgba(255,255,255,0.47)" strokeWidth="2" strokeLinecap="round" fill="none"/>
                      </svg>
                    </>
                  )}
                  {list.design === "medium" && (
                    <div className="list-card-icon">
                      <Icon name="pizza" size={60} color="#364A78" />
                    </div>
                  )}
                  {list.design === "light" && (
                    <>
                      <svg className="list-card-icon disco" width="55" height="55" viewBox="0 0 55 55" fill="none">
                        <circle cx="27.5" cy="27.5" r="20" stroke="#364A78" strokeWidth="2.5" fill="none"/>
                        <path d="M27.5 7.5C27.5 7.5 20 15 20 27.5C20 40 27.5 47.5 27.5 47.5" stroke="#364A78" strokeWidth="2"/>
                        <path d="M27.5 7.5C27.5 7.5 35 15 35 27.5C35 40 27.5 47.5 27.5 47.5" stroke="#364A78" strokeWidth="2"/>
                        <path d="M10 20H45M10 35H45M7.5 27.5H47.5" stroke="#364A78" strokeWidth="2"/>
                      </svg>
                      <div className="list-card-stars">
                        <span className="star star-1">+</span>
                        <span className="star star-2">+</span>
                        <span className="star star-3">+</span>
                        <span className="star star-4">+</span>
                        <span className="star star-5">+</span>
                      </div>
                    </>
                  )}
                </div>
                <div className="list-card-content">
                  <span className="list-card-title">
                    {list.title}
                    {list.superscript && <sup>{list.superscript}</sup>}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section Proche de toi */}
      <div className="carousel-section">
        <div className="carousel-header">
          <h3 className="carousel-title">Proche de toi</h3>
          <Icon name="arrowRight" size={20} color="#2A3556" />
        </div>
        <div className="carousel-cards">
          {regularPlaces.slice(0, 6).map((place) => (
            <Card
              key={place.id}
              variant="normal"
              image={place.image}
              title={place.name}
              senses={place.senses}
            
              onClick={() => onPlaceClick && onPlaceClick(place)}
            />
          ))}
        </div>
      </div>
    </>
  )
}
