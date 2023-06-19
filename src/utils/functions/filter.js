
export function findByType(data, filter) {
    return data.filter(
        (recipe) => recipe.dish_type.toLowerCase().replace(/\s/g, "").normalize('NFD').replace(/[\u0300-\u036f]/g, '') === filter
    )
}
