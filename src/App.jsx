import { Link } from "react-router-dom";

function App() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-danger px-4">
      <Link className="navbar-brand fw-bold" to="/">PokeDex</Link>
      <div className="collapse navbar-collapse show">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Inicio</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/items">Pokémon</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contact">Contacto</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default App;
