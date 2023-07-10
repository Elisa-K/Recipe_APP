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

export function filterByTitleAndIngredient(data, keyword) {
  return data.filter((recipe) => {
    return (
      recipe.name.toLowerCase().includes(keyword.toLowerCase()) ||
      recipe.ingredients.some((ingredient) =>
        ingredient.name.toLowerCase().includes(keyword.toLowerCase())
      )
    )
  })
}

export function filterData(data, sortOption, filterTags) {
  const sortMethods = {
    dateAsc: {
      method: (a, b) => new Date(a.created_at) - new Date(b.created_at),
    },
    dateDesc: {
      method: (a, b) => new Date(b.created_at) - new Date(a.created_at),
    },
    prepTimeAsc: {
      method: (a, b) => a.prep_time + a.cook_time - (b.prep_time + b.cook_time),
    },
  }
  return filterResultByType(
    data.sort(sortMethods[sortOption].method),
    filterTags
  )
}
