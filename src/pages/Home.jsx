export default function Home() {
  return (
    <div className="container text-center mt-5">
      <div className="p-5 mb-4 bg-light rounded-3 shadow">
        <h1 className="display-4">PokeDex Explorer</h1>
        <p className="lead">
          Bienvenido a tu mini Pokédex hecha en React.  
          Explora los Pokémon, guarda tus favoritos y aprende sobre ellos.
        </p>
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png"
          alt="Pokéball"
          width="100"
        />
      </div>
    </div>
  );
}
