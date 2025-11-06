// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=6");
        const data = await Promise.all(
          res.data.results.map(async (p) => {
            const details = await axios.get(p.url);
            return {
              name: details.data.name,
              image: details.data.sprites.other["official-artwork"].front_default,
              type: details.data.types[0].type.name,
            };
          })
        );
        setPokemons(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPokemons();
  }, []);

  return (
    <div className="container mt-5">
      {/* HERO */}
      <div className="text-center mb-5 p-4 bg-light rounded shadow-sm">
        <h1 className="display-4 fw-bold text-primary">Pokédex React</h1>
        <p className="lead text-muted">
          Explora y descubre a tus Pokémon favoritos con React y la PokéAPI.
        </p>
      </div>

      {/* LISTADO */}
      <div className="row justify-content-center">
        {pokemons.map((p) => (
          <div className="col-md-4 col-lg-3 mb-4" key={p.name}>
            <div
              className="card border-0 shadow-sm text-center h-100 hover-card"
              style={{ transition: "transform 0.2s" }}
            >
              <img
                src={p.image}
                className="card-img-top mx-auto"
                style={{ width: "120px", height: "120px", marginTop: "15px" }}
                alt={p.name}
              />
              <div className="card-body">
                <h5 className="card-title text-capitalize">{p.name}</h5>
                <span className="badge bg-info text-dark">{p.type}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
