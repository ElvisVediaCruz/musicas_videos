function MusicaList({ musicas }) {
  return (
    <div>
      <h2>🎵 Música</h2>

      {musicas.length === 0 ? (
        <p>No hay música registrada</p>
      ) : (
        <ul>
          {musicas.map(item => (
            <li key={item.id_musica_video}>
              {item.titulo} - {item.genero} - {item.artista}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MusicaList;