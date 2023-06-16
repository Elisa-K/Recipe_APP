import '../../styles/modal.css'

export default function ModalRecipe({ recipe }) {
    return (
        <div className="modal fade" id={`modalRecipe-${recipe.id}`} tabIndex="-1" aria-labelledby={`modalRecipe-${recipe.name}`} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                <div className="modal-content">
                    <div className='modal-header p-0' data-bs-theme="dark">
                        <div className='recipe-img'>
                            <img src={recipe.image} alt={recipe.name} />
                            <div className='recipe-title'>
                                <span className="badge text-bg-dark fs-6">{recipe.dish_type}</span>
                                <h1 className="modal-title text-light fw-bold" id={`modalRecipe-${recipe.name}`}>{recipe.name}</h1>
                                <span className="badge text-bg-light me-2"><i className="bi bi-person-fill"></i>{recipe.servings} pers.</span>
                                <span className="badge text-bg-light me-2"><i className="bi bi-hourglass-split"></i>{recipe.prep_time} min</span>
                                <span className="badge text-bg-light "><i className="bi bi-thermometer-half"></i>{recipe.cook_time} min</span>
                            </div>
                        </div>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">

                        <div className="recipe-ingredients">
                            <h3>Ingrédients</h3>
                            <ul>
                                {recipe.ingredients.map((ingredient, index) => (

                                    <li key={index}>{`${ingredient.name} ${ingredient.quantity.length !== 0 ? ': ' + ingredient.quantity : ''}`}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="recipe-instructions mt-4">
                            <h3>Préparation</h3>
                            <table className="table table-borderless">
                                <tbody>
                                    {recipe.instructions.map((instruction, index) => (
                                        <tr key={index}>
                                            <th className="fw-bold text-capitalize text-nowrap">{`étape ${index + 1}`}</th>
                                            <td>{instruction}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}