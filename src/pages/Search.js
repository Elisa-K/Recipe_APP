import { useFetch } from '../utils/hooks/useFetch'
import { useState, useEffect, useMemo, useCallback } from 'react'
import { filterResultByType } from '../utils/functions/filter'
import SearchBar from '../components/SearchBar'
import Card from '../components/common/Card'
import FilterCheckbox from '../components/common/FilterCheckbox'
import Pagination from '../components/common/Pagination'

export default function Search() {
  const { data, isLoading, error } = useFetch()
  const recipes = data.recipes
  const [keyword, setKeyword] = useState('')
  const [optionsTitle, setOptionsTitle] = useState([])
  const [optionsIngredient, setOptionsIngredient] = useState([])
  const [results, setResults] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [filterTags, setFilterTags] = useState([])
  const [sortOption, setSortOption] = useState('dateDesc')
  // const [filteredData, setFilteredData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [paginatedData, setPaginatedData] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [maxPageLimit, setMaxPageLimit] = useState(2)
  const [minPageLimit, setMinPageLimit] = useState(0)
  const itemsPerPage = 6
  const pageNumberLimit = 2

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

  // Trie des résultats
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

  // Filtre des résultats
  const filteredData = useMemo(
    () =>
      filterResultByType(
        results.sort(sortMethods[sortOption].method),
        filterTags
      ),
    [filterTags, results, sortOption]
  )

  useEffect(() => {
    const firstIndex = (currentPage - 1) * itemsPerPage
    const lastIndex = firstIndex + itemsPerPage
    const currentData = filteredData.slice(firstIndex, lastIndex)
    const nbPage = Math.ceil(filteredData.length / itemsPerPage)
    setPaginatedData(currentData)
    setPageCount(nbPage)
  }, [filteredData, currentPage])

  // Pagination
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const nextPage = () => {
    if (currentPage + 1 > maxPageLimit) {
      setMaxPageLimit(maxPageLimit + pageNumberLimit)
      setMinPageLimit(minPageLimit + pageNumberLimit)
    }
    setCurrentPage((prev) => prev + 1)
  }

  const previousPage = () => {
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageLimit(maxPageLimit - pageNumberLimit)
      setMinPageLimit(minPageLimit - pageNumberLimit)
    }
    setCurrentPage((prev) => prev - 1)
  }

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
      setCurrentPage(1)
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
    setCurrentPage(1)
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
              {paginatedData.map((recipe) => (
                <div className="col-4 p-4" key={recipe.id}>
                  <Card recipe={recipe} />
                </div>
              ))}
              <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                pageCount={pageCount}
                minPageLimit={minPageLimit}
                maxPageLimit={maxPageLimit}
                paginate={paginate}
                onNextPage={nextPage}
                onPreviousPage={previousPage}
              />
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
