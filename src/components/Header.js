import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <nav className="navbar navbar-expand-lg flex-lg-column">

            <h1 className='navbar-brand'>Recipe App</h1>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className='collapse navbar-collapse justify-content-center' id='navbarNav'>
                <ul className='navbar-nav'>
                    <li className='nav-item'>
                        <Link to="/" className='nav-link'>Accueil</Link>
                    </li>
                    <li className='nav-item dropdown'>
                        <Link to="#" role='button' data-bs-toggle='dropdown' className='nav-link dropdown-toggle'>Type de plat</Link>
                        <ul className='dropdown-menu'>
                            <li>
                                <Link to="type/entree" className='dropdown-item'>Entrée</Link>
                            </li>
                            <li>
                                <Link to="type/platprincipal" className='dropdown-item'>Plat principal</Link>
                            </li>
                            <li>
                                <Link to="type/dessert" className='dropdown-item'>Dessert</Link>
                            </li>
                        </ul>
                    </li>
                    <li className='nav-item'>
                        <Link to="/search" className='nav-link'><i class="bi bi-search"></i> Recherche</Link>
                    </li>
                </ul>
            </div>
        </nav >

    )
}