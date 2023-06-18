import { useFetch } from "../utils/hooks/useFetch"
import { useState } from "react"
import SearchBar from "../components/SearchBar"
import Card from '../components/common/Card'

export default function Search() {
    const { data, isLoading, error } = useFetch()
    const recipes = data.recipes
    const [keyword, setKeyword] = useState("")
    const [results, setResults] = useState([])

    const handleChange = (keyword) => {
        let lowerCase = keyword.toLowerCase()
        setKeyword(lowerCase)

        filterData(lowerCase)
    }

    const filterData = (keyword) => {
        if (keyword === "") setResults([])
        else {
            const filterData = recipes?.filter((recipe) => {
                return (
                    recipe.name.toLowerCase().includes(keyword) ||
                    recipe.ingredients.some(ingredient => ingredient.name.toLowerCase().includes(keyword))
                )
            })

            console.log(filterData)
            setResults(filterData)
        }
    }


    if (error) {
        return <span>Erreur</span>
    }
    return (
        <div>
            <h1 className="text-center">Rechercher</h1>
            <SearchBar keyword={keyword} onChange={handleChange} />
            {isLoading ? (
                <span>Loading</span>
            ) : (
                <div className="row">
                    {results && results.map((recipe) => (
                        <div className="col-4 p-4" key={recipe.id}>
                            <Card recipe={recipe} />
                        </div>
                    ))}

                </div>
            )}

        </div>

    )
}