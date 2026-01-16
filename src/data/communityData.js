export const mockPosts = [
  {
    id: 1,
    user: { username: "user34", avatar: "/placeholder.svg?height=40&width=40" },
    place: "Restaurant indien",
    coordinates: [48.8606, 2.3376], // Près du Canal Saint-Martin
    senses: { light: 30, sound: 60, crowd: 45 },
    content: "Avoir un lieu aussi incluant et soucieux des personnes sensibles c'est une bénédiction.",
    images: [
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
    ],
    likes: 12,
    comments: 3,
    time: "3 jours",
  },
  {
    id: 2,
    user: { username: "julia_food", avatar: "/placeholder.svg?height=40&width=40" },
    place: "Café Lumière",
    coordinates: [48.8529, 2.3499], // Près de Bastille
    senses: { light: 20, sound: 40, crowd: 30 },
    content: "Un endroit parfait pour travailler au calme. L'ambiance est douce et apaisante.",
    images: ["/placeholder.svg?height=200&width=300", "/placeholder.svg?height=200&width=300"],
    likes: 8,
    comments: 2,
    time: "5 jours",
  },
]

export const mockEvents = [
  {
    id: 1,
    date: "17 oct.",
    title: "Brunch au calme",
    place: "Restaurant indien",
    coordinates: [48.864, 2.3522], // Près de République
    senses: ["light", "sound", "crowd"],
    participants: 5,
  },
  {
    id: 2,
    date: "20 oct.",
    title: "Exposition d'art",
    place: "Musée tranquille",
    coordinates: [48.8584, 2.2945], // Près de la Tour Eiffel
    senses: ["light", "crowd"],
    participants: 8,
  },
  {
    id: 3,
    date: "25 oct.",
    title: "Café lecture",
    place: "Bibliothèque cosy",
    coordinates: [48.8534, 2.3488], // Près du Marais
    senses: ["sound", "crowd"],
    participants: 3,
  },
]
