export default function SearchBar({ keyword, onChange }) {
    return (
        <div className="row">
            <div className="col-8 m-auto">
                <input
                    type="text"
                    className="form-control"
                    placeholder={"Recherche par type ou par ingrédient"}
                    key="search-bar"
                    value={keyword}
                    onChange={(e) => onChange(e.target.value)}
                />
            </div>
        </div>
    )
}