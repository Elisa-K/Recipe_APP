import '../styles/search.css'

export default function SearchBar({
  keyword,
  onChange,
  onClickSuggestion,
  showSuggestions,
  optionsTitle,
  optionsIngredient,
}) {
  const suggestionsTitle = optionsTitle.filter((option) =>
    option.toLowerCase().includes(keyword.toLowerCase())
  )
  const suggestionsIngredient = optionsIngredient.filter((option) =>
    option.toLowerCase().includes(keyword.toLowerCase())
  )

  return (
    <div className="row">
      <div className="col-8 m-auto">
        <div className="search-bar">
          <input
            type="text"
            className="form-control"
            placeholder={'Recherche par type ou par ingrédient'}
            key="search-bar"
            value={keyword}
            onChange={(e) => onChange(e.target.value)}
          />

          {showSuggestions && (
            <ul className="autocomplete">
              {suggestionsTitle.length === 0 &&
              suggestionsIngredient.length === 0 ? (
                <span className="text-body-secondary">Aucun résultat</span>
              ) : (
                ''
              )}
              {suggestionsTitle.length > 0 && (
                <span className="fw-bold">Titre recette</span>
              )}
              {suggestionsTitle.map((suggestion) => (
                <li
                  onClick={() => onClickSuggestion(suggestion)}
                  key={suggestion}
                >
                  {suggestion}
                </li>
              ))}
              {suggestionsIngredient.length > 0 && (
                <span className="fw-bold">Ingrédients</span>
              )}
              {suggestionsIngredient.map((suggestion) => (
                <li
                  onClick={() => onClickSuggestion(suggestion)}
                  key={suggestion}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
