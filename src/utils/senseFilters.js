export function filterPlacesBySenses(places, selectedSenses) {
  // Count how many senses are selected
  const activeSenses = Object.entries(selectedSenses)
    .filter(([_, isSelected]) => isSelected)
    .map(([sense, _]) => sense)

  const senseCount = activeSenses.length

  // If no senses selected, show all places
  if (senseCount === 0) {
    return places
  }

  return places.filter((place) => {
    const senseValues = activeSenses.map((sense) => place.senses[sense])

    if (senseCount === 1) {
      // Case A: 1 sense selected - show places where sense ��� 35%
      return senseValues[0] <= 35
    } else if (senseCount === 2) {
      // Case B: 2 senses selected
      // Both senses must be ≤ 40% AND at least one must be ≤ 25%
      const allBelow40 = senseValues.every((val) => val <= 40)
      const atLeastOneBelow25 = senseValues.some((val) => val <= 25)
      return allBelow40 && atLeastOneBelow25
    } else if (senseCount === 3) {
      // Case C: 3 senses selected
      // All 3 must be ≤ 45% AND average must be ≤ 30%
      const allBelow45 = senseValues.every((val) => val <= 45)
      const average = senseValues.reduce((sum, val) => sum + val, 0) / senseValues.length
      return allBelow45 && average <= 30
    }

    return true
  })
}
