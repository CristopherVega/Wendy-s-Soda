import { Link } from 'react-router-dom';
import logo from '../assets/Wendy\'s_Logo2.png';

function Header() {

    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-body-tertiary ">
                <div className="container-fluid">
                    <img src={logo} alt="Logo de la pagina " className='logo' />
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Mostrar navegación"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">

                                <Link className="nav-link text-white" to="/">Home</Link>
                            </li>
                            <li className="nav-item">

                                <Link className="nav-link text-white" to="/tipoCobros">Tipo cobro</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/Usuarios">Usuarios</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/Comida">Tipos de Comida</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/cobros">Cobros</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/Cuentas">Cuentas</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/Registros">Registro</Link>
                            </li>
                        </ul>
                    </div>

                </div>
            </nav>
        </header>

    )
}


export default Header;