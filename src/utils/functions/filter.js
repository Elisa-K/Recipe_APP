export function findByType(data, filter) {
  return data.filter(
    (recipe) =>
      recipe.dish_type
        .toLowerCase()
        .replace(/\s/g, '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') === filter
  )
}

export function filterResultByType(data, filterTags) {
  return data.filter((recipe) => {
    if (filterTags.length === 0) return true
    else
      return filterTags.includes(
        recipe.dish_type
          .toLowerCase()
          .replace(/\s/g, '')
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
      )
  })
}
