import { useFetch } from '../utils/hooks/useFetch'
import { useState, useEffect } from 'react'
import SearchBar from '../components/SearchBar'
import Card from '../components/common/Card'

export default function Search() {
  const { data, isLoading, error } = useFetch()
  const recipes = data.recipes
  const [keyword, setKeyword] = useState('')
  const [optionsTitle, setOptionsTitle] = useState([])
  const [optionsIngredient, setOptionsIngredient] = useState([])
  const [results, setResults] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  useEffect(() => {
    if (!isLoading) {
      let listNames = [...new Set(recipes.map((recipe) => recipe.name))].sort()

      let listIngredients = [
        ...new Set(
          [].concat(
            ...recipes.map((recipe) =>
              recipe.ingredients.map((ingredient) => ingredient.name)
            )
          )
        ),
      ].sort()
      setOptionsTitle(listNames)
      setOptionsIngredient(listIngredients)
    }
  }, [isLoading])

  const handleChange = (keyword) => {
    if (keyword.length > 0) {
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
    }
    setKeyword(keyword)
    filterData(keyword)
  }

  const handleSuggestionClick = (suggestion) => {
    setKeyword(suggestion)
    setShowSuggestions(false)
    filterData(suggestion.toLowerCase())
  }

  const filterData = (keyword) => {
    if (keyword === '') setResults([])
    else {
      const filterData = recipes?.filter((recipe) => {
        return (
          recipe.name.toLowerCase().includes(keyword.toLowerCase()) ||
          recipe.ingredients.some((ingredient) =>
            ingredient.name.toLowerCase().includes(keyword.toLowerCase())
          )
        )
      })
      setResults(filterData)
    }
  }

  if (error) {
    return <span>Erreur</span>
  }
  return (
    <div>
      <h1 className="text-center">Rechercher</h1>
      <SearchBar
        keyword={keyword}
        optionsTitle={optionsTitle}
        optionsIngredient={optionsIngredient}
        onChange={handleChange}
        onClickSuggestion={handleSuggestionClick}
        showSuggestions={showSuggestions}
      />
      {isLoading ? (
        <span>Loading</span>
      ) : (
        <div className="row mt-3">
          {results.length > 0 && (
            <div className="col-12 text-end">
              <span className="text-body-secondary">
                {`${results.length} ${
                  results.length > 1 ? 'résultats' : 'résultat'
                }`}
              </span>
            </div>
          )}
          {results.length > 0
            ? results.map((recipe) => (
                <div className="col-4 p-4" key={recipe.id}>
                  <Card recipe={recipe} />
                </div>
              ))
            : recipes.map((recipe) => (
                <div className="col-4 p-4" key={recipe.id}>
                  <Card recipe={recipe} />
                </div>
              ))}
        </div>
      )}
    </div>
  )
}
