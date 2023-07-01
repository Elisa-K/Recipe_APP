import { useFetch } from '../utils/hooks/useFetch'
import { useState, useEffect } from 'react'
import { filterResultByType } from '../utils/functions/filter'
import SearchBar from '../components/SearchBar'
import Card from '../components/common/Card'
import FilterCheckbox from '../components/common/FilterCheckbox'

export default function Search() {
  const { data, isLoading, error } = useFetch()
  const recipes = data.recipes
  const [keyword, setKeyword] = useState('')
  const [optionsTitle, setOptionsTitle] = useState([])
  const [optionsIngredient, setOptionsIngredient] = useState([])
  const [results, setResults] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [filterTags, setFilterTags] = useState([])
  const [sortOption, setSortOption] = useState('dateAsc')

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
      setResults(recipes)
    }
  }, [isLoading])

  // Barre de recherche
  const handleChange = (keyword) => {
    if (keyword.length > 0) {
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
    }
    setKeyword(keyword)
    searchData(keyword)
  }

  const handleSuggestionClick = (suggestion) => {
    setKeyword(suggestion)
    setShowSuggestions(false)
    searchData(suggestion.toLowerCase())
  }

  // Recherche par titre ou ingrédient
  const searchData = (keyword) => {
    if (keyword === '') setResults(recipes)
    else {
      const filterData = recipes.filter((recipe) => {
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

  // Sélection des filtres
  const filterHandler = (event) => {
    if (event.target.checked) {
      setFilterTags([...filterTags, event.target.value])
    } else {
      setFilterTags(
        filterTags.filter((filterTag) => filterTag !== event.target.value)
      )
    }
  }

  // Filtrage des résultats de recherche
  const filteredData = filterResultByType(results, filterTags)

  // Triage des résultats
  results.sort((a, b) => {
    if (sortOption === 'dateAsc') {
      return new Date(a.created_at) - new Date(b.created_at)
    } else if (sortOption === 'dateDesc') {
      return new Date(b.created_at) - new Date(a.created_at)
    } else if (sortOption === 'prepTimeAsc') {
      return a.prep_time + a.cook_time - (b.prep_time + b.cook_time)
    }
    return 0
  })

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
      <div className="row border p-2 m-3">
        <div className="filter-box col-6">
          <span className="d-block fw-bold">Filtrer par :</span>
          <FilterCheckbox
            value="entree"
            title="Entrée"
            onChange={filterHandler}
          />
          <FilterCheckbox
            value="platprincipal"
            title="Plat principal"
            onChange={filterHandler}
          />
          <FilterCheckbox
            value="dessert"
            title="Dessert"
            onChange={filterHandler}
          />
        </div>
        <div className="sort-box col-6">
          <span className="fw-bold">Trier par :</span>
          <select
            className="form-select"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="dateAsc">Recettes les plus récentes</option>
            <option value="dateDesc">Recettes les plus anciennes</option>
            <option value="prepTimeAsc">Recettes les plus rapides</option>
          </select>
        </div>
      </div>
      {isLoading ? (
        <span>Loading</span>
      ) : (
        <div className="results-box">
          {filteredData.length > 0 ? (
            <div className="row mt-3">
              <div className="col-12 text-end">
                <span className="text-body-secondary">
                  {`${filteredData.length} ${
                    filteredData.length > 1 ? 'résultats' : 'résultat'
                  }`}
                </span>
              </div>
              {filteredData.map((recipe) => (
                <div className="col-4 p-4" key={recipe.id}>
                  <Card recipe={recipe} />
                </div>
              ))}
            </div>
          ) : (
            <div className="row m-3">
              <div className="col-12">
                <h2>Aucun résultat</h2>
              </div>
            </div>
          )}
          {}
        </div>
      )}
    </div>
  )
}
