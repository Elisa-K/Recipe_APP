import { useParams } from 'react-router-dom'
import { useFetch } from '../utils/hooks/useFetch'
import { useEffect, useState } from 'react'
import { findByType } from '../utils/functions/filter'
import PaginatedData from '../components/PaginatedData'

export default function DishType() {
  let { dish } = useParams()
  const { data, isLoading, error } = useFetch()
  const [recipes, setRecipes] = useState([])

  const itemsPerPage = 6

  useEffect(() => {
    if (!isLoading) {
      setRecipes(findByType(data.recipes, dish))
    }
  }, [isLoading, dish])

  const MAPPED_TITLE = {
    entree: 'Entrée',
    platprincipal: 'Plat principal',
    dessert: 'Dessert',
  }

  if (error) {
    return <span>Erreur</span>
  }

  return (
    <div>
      <h1 className="text-center">{(dish && MAPPED_TITLE[dish]) || null}</h1>
      {isLoading ? (
        <span>Loading</span>
      ) : (
        recipes.length > 0 && (
          <PaginatedData data={recipes} itemsPerPage={itemsPerPage} />
        )
      )}
    </div>
  )
}
