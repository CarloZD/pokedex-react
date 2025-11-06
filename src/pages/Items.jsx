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

  if (loading) return <p style={{ textAlign: "center" }}>⏳ Cargando pokémones...</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h1>🔍 Lista de Pokémon</h1>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
        gap: "1rem"
      }}>
        {pokemons.map((poke) => {
          const isFav = favorites.includes(poke.name);
          return (
            <div key={poke.name} style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "1rem",
              textAlign: "center"
            }}>
              <img src={poke.image} alt={poke.name} width={100} />
              <h3 style={{ textTransform: "capitalize" }}>{poke.name}</h3>
              <p>Altura: {poke.height}</p>
              <p>Peso: {poke.weight}</p>
              <button onClick={() => toggleFav(poke.name)}>
                {isFav ? " Quitar" : " Favorito"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
