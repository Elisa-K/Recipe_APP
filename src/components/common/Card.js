export default function Card({ recipe }) {
    return (
        <div className="card m-2">
            <img className="card-img-top object-fit-cover" src={recipe.image} alt={recipe.title} height="200" />
            <div className="card-body">
                <h5 className="card-title">{recipe.name}</h5>
                <div className="card-text">
                    <div>
                        <span className="badge text-bg-dark">{recipe.dish_type}</span>
                    </div>
                    <span className="badge text-bg-light me-2"><i className="bi bi-person-fill"></i>{recipe.servings} pers.</span>
                    <span className="badge text-bg-light me-2"><i className="bi bi-hourglass-split"></i>{recipe.prep_time} min</span>
                    <span className="badge text-bg-light "><i className="bi bi-thermometer-half"></i>{recipe.cook_time} min</span>
                </div>
            </div>
        </div>
    )
}