import { useFetch } from '../utils/hooks/useFetch'
import { useState, useEffect, useMemo } from 'react'
import {
  filterByTitleAndIngredient,
  filterData,
} from '../utils/functions/filter'
import SearchBar from '../components/SearchBar'
import FilterCheckbox from '../components/common/FilterCheckbox'
import PaginatedData from '../components/PaginatedData'

export default function Search() {
  const { data, isLoading, error } = useFetch()
  const recipes = data.recipes
  // barre de recherche + autocomplétion
  const [keyword, setKeyword] = useState('')
  const [optionsTitle, setOptionsTitle] = useState([])
  const [optionsIngredient, setOptionsIngredient] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [results, setResults] = useState([])
  // filtre et tri
  const [filterTags, setFilterTags] = useState([])
  const [sortOption, setSortOption] = useState('dateDesc')
  // pagination
  const itemsPerPage = 6

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

  // Filtre des résultats
  const filteredData = useMemo(
    () => filterData(results, sortOption, filterTags),
    [filterTags, results, sortOption]
  )

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
      const filterData = filterByTitleAndIngredient(recipes, keyword)
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
        onClickOutside={() => setShowSuggestions(false)}
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
            <option value="dateDesc">Recettes les plus récentes</option>
            <option value="dateAsc">Recettes les plus anciennes</option>
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
              {
                <PaginatedData
                  data={filteredData}
                  itemsPerPage={itemsPerPage}
                />
              }
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
