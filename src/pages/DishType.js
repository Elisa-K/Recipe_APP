import { useParams } from "react-router-dom";
import { useFetch } from "../utils/hooks/useFetch"
import { useEffect, useState } from "react";
import Card from '../components/common/Card'

export default function DishType() {
    let { dish } = useParams();
    const { data, isLoading, error } = useFetch()
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        let results = data.recipes?.filter(
            (recipe) => recipe.dish_type.toLowerCase().replace(/\s/g, "").normalize('NFD').replace(/[\u0300-\u036f]/g, '') === dish
        )

        setRecipes(results)
    }, [data.recipes, dish])

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

                </div>
            )}

        </div>

    )
}