import { useFetch } from '../utils/hooks/useFetch'
import Card from '../components/common/Card'

export default function Home() {
  const { data, isLoading, error } = useFetch()
  const recipes = data.recipes

  if (error) {
    return <span>Erreur</span>
  }
  return (
    <div>
      <h1 className="text-center">Les dernières recettes</h1>
      {isLoading ? (
        <span>Loading</span>
      ) : (
        <div className="row">
          {recipes &&
            recipes.slice(0, 10).map((recipe) => (
              <div className="col-xs-12 col-sm-6 col-lg-4 p-4" key={recipe.id}>
                <Card recipe={recipe} />
              </div>
            ))}
        </div>
      )}
    </div>
  )
}
