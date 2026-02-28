function PeliculaList({ peliculas }) {
  return (
    <div style={{ marginTop: "30px" }}>
      <h2>🎬 Películas</h2>
      {peliculas.length === 0 ? (
        <p>No hay películas registradas</p>
      ) : (
        <ul>
          {peliculas.map(item => (
            <li key={item.id_musica_video}>
              {item.titulo} - {item.genero} - {item.director}
            </li>
          ))}
        </ul>
      )}

      
    </div>
  );
}

export default PeliculaList;