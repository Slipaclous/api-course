import { Link } from "react-router-dom";

const Navbar=(props)=>{
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">Api-Platform React</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/customers">Clients</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/invoices">Factures</Link>
            </li>
          
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
                <Link to="" className="nav-link">Inscription</Link>
            </li>
            <li className="nav-item">
                <Link to="" className="btn btn-success mx-2">Connexion</Link>
            </li>
            <li className="nav-item">
                <Link to="" className="btn mx-2 btn-danger">Déconeexion</Link>
            </li>
          </ul>
        </div>
      </nav>
    )
}
export default Navbar;