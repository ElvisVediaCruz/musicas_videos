import { useState } from "react";

function PeliculaPlayer({ peliculas }) {
  const [selected, setSelected] = useState(null);

  return (
    <div>
      <h2>Películas</h2>

      <ul>
        {peliculas.map((pelicula) => (
          <li key={pelicula.id}>
            <button onClick={() => setSelected(pelicula)}>
              {pelicula.titulo}
            </button>
          </li>
        ))}
      </ul>

      {selected && (
        <div>
          <h3>Reproduciendo: {selected.nombre}</h3>
          <video controls width="600">
            <source src={`http://localhost:3000/${selected.rutaAlmacenamiento.replace(/\\/g, "/")}`} type="video/mp4" />
            Tu navegador no soporta video.
          </video>
        </div>
      )}
    </div>
  );
}

export default PeliculaPlayer;