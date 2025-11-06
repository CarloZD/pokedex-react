import { useEffect, useState } from "react";
import axios from "axios";

export default function Items() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favs") || "[]");
  });

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then(async (res) => {
        const results = res.data.results;
        const detailed = await Promise.all(
          results.map(async (p) => {
            const data = await axios.get(p.url);
            return {
              name: data.data.name,
              image: data.data.sprites.front_default,
              height: data.data.height,
              weight: data.data.weight
            };
          })
        );
        setPokemons(detailed);
        setLoading(false);
      });
  }, []);

  const toggleFav = (name) => {
    let updated;
    if (favorites.includes(name)) {
      updated = favorites.filter(f => f !== name);
      alert(`${name} eliminado de favoritos 💔`);
    } else {
      updated = [...favorites, name];
      alert(`${name} agregado a favoritos ❤️`);
    }
    setFavorites(updated);
    localStorage.setItem("favs", JSON.stringify(updated));
  };

  if (loading) return (
  <div className="d-flex justify-content-center mt-5">
    <div className="spinner-border text-danger" role="status">
      <span className="visually-hidden">Cargando...</span>
    </div>
  </div>
);

return (
  <div className="container mt-4">
    <h1 className="mb-4 text-center text-danger">🔍 Lista de Pokémon</h1>
    <div className="row">
      {pokemons.map((poke) => {
        const isFav = favorites.includes(poke.name);
        return (
          <div key={poke.name} className="col-md-3 col-sm-6 mb-4">
            <div className="card shadow-sm text-center p-3">
              <img src={poke.image} className="card-img-top mx-auto" style={{ width: "100px" }} />
              <div className="card-body">
                <h5 className="card-title text-capitalize">{poke.name}</h5>
                <p className="card-text">Altura: {poke.height}</p>
                <p className="card-text">Peso: {poke.weight}</p>
                <button
                  onClick={() => toggleFav(poke.name)}
                  className={`btn ${isFav ? "btn-outline-danger" : "btn-danger"}`}
                >
                  {isFav ? " Quitar" : " Favorito"}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);
}