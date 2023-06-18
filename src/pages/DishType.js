import { useParams } from "react-router-dom";
import { useFetch } from "../utils/hooks/useFetch"
import { useEffect, useState } from "react";
import { findByType } from "../utils/functions/filter"
import Card from '../components/common/Card'
// import Pagination from "../components/common/Pagination";

export default function DishType() {
    let { dish } = useParams();
    const { data, isLoading, error } = useFetch()
    const [recipes, setRecipes] = useState([])
    // const [currentPage, setCurrentPage] = useState(1)
    // const [paginatedData, setPaginatedData] = useState([])
    // const [pageCount, setPageCount] = useState(0)
    const itemsPerPage = 3

    useEffect(() => {
        const dataFilter = async () => setRecipes(await findByType(data?.recipes, dish))

        // const lastIndex = currentPage * itemsPerPage;
        // const firstIndex = lastIndex - itemsPerPage
        // const currentData = data?.recipes.slice(firstIndex, lastIndex)
        // const nbPage = Math.ceil(data?.recipes.length / itemsPerPage)
        // setPaginatedData(currentData)
        // setPageCount(nbPage)
        dataFilter()
    }, [data?.recipes, dish])

    // const nextPage = () => {
    //     setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(recipes.length / itemsPerPage)));
    // };

    // const previousPage = () => {
    //     setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    // };

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

                    {recipes && recipes.map((recipe) => (
                        <div className="col-4 p-4" key={recipe.id}>
                            <Card recipe={recipe} />
                        </div>
                    ))}

                    {/* <Pagination
                        currentPage={currentPage}
                        pageCount={pageCount}
                        onNextPage={nextPage}
                        onPreviousPage={previousPage}
                    /> */}
                </div>
            )}

        </div>

    )
}