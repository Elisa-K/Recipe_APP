import { useParams } from "react-router-dom";
import { useFetch } from "../utils/hooks/useFetch"
import { useEffect, useState } from "react";
import { findByType } from "../utils/functions/filter"
import Card from '../components/common/Card'
import Pagination from "../components/common/Pagination";

export default function DishType() {
    let { dish } = useParams();
    const { data, isLoading, error } = useFetch()
    const [recipes, setRecipes] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [paginatedData, setPaginatedData] = useState([])
    const [pageCount, setPageCount] = useState(0)
    const itemsPerPage = 3

    useEffect(() => {
        if (!isLoading) {
            setRecipes(findByType(data.recipes, dish))
            setCurrentPage(1)
        }
    }, [isLoading, dish])

    useEffect(() => {
        const firstIndex = (currentPage - 1) * itemsPerPage
        const lastIndex = firstIndex + itemsPerPage
        const currentData = recipes.slice(firstIndex, lastIndex)
        const nbPage = Math.ceil(recipes.length / itemsPerPage)
        setPaginatedData(currentData)
        setPageCount(nbPage)
    }, [recipes, currentPage])



    const nextPage = () => {
        console.log(currentPage)
        if (currentPage !== Math.ceil(recipes.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1)
        }

    };

    const previousPage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1)
        }

    };

    const MAPPED_TITLE = {
        'entree': 'Entrée',
        'platprincipal': 'Plat principal',
        'dessert': 'Dessert'
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
                <div className="row">

                    {paginatedData && paginatedData.map((recipe) => (
                        <div className="col-4 p-4" key={recipe.id}>
                            <Card recipe={recipe} />
                        </div>
                    ))}

                    <Pagination
                        currentPage={currentPage}
                        pageCount={pageCount}
                        onNextPage={nextPage}
                        onPreviousPage={previousPage}
                    />
                </div>
            )}

        </div>

    )
}