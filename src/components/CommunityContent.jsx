"use client"

import "../styles/CommunityContent.css"
import { Icon } from "./ui"
import { EventCard } from "./ui/EventCard"
import { PostCard } from "./ui/PostCard"
import { mockPosts, mockEvents } from "../data/communityData"

export default function CommunityContent({ selectedSenses, selectedCategory, onCategoryClick, onEventClick, onPostClick }) {
  const categories = [
    { name: "Restos", icon: "restaurant" },
    { name: "Cafés", icon: "cafe" },
    { name: "Expos", icon: "museum" },
    { name: "Bars", icon: "bar" },
    { name: "Parcs", icon: "park" },
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

      {/* Section Sorties à venir */}
      <div className="carousel-section">
        <div className="carousel-header">
          <h3 className="carousel-title">Sorties à venir</h3>
          <Icon name="arrowRight" size={20} color="#2A3556" />
        </div>
        <div className="carousel-cards">
          {mockEvents.map((event) => (
            <EventCard 
              key={event.id} 
              event={event} 
              onClick={() => onEventClick && onEventClick(event)} 
            />
          ))}
        </div>
      </div>

      {/* Section Derniers posts */}
      <div className="carousel-section">
        <div className="carousel-header">
          <h3 className="carousel-title">Derniers posts</h3>
          <Icon name="arrowRight" size={20} color="#2A3556" />
        </div>
        <div className="community-posts-list">
          {mockPosts.map((post) => (
            <PostCard 
              key={post.id} 
              post={post} 
              onClick={() => onPostClick && onPostClick(post)} 
            />
          ))}
        </div>
      </div>
    </>
  )
}
