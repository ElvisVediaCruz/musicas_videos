import { useState, useRef, useEffect } from "react";
import "./muisca.css";

const playlist = [
  {
    id: 1,
    title: "Noche de Verano",
    artist: "Luna Azul",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: 2,
    title: "Caminos del Sol",
    artist: "Los Viajeros",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    id: 3,
    title: "Melodía del Mar",
    artist: "Costa Brava",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
];

function MusicPlayer2() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const audioRef = useRef(null);
  const currentSong = playlist[currentSongIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }, [isPlaying, currentSongIndex]);

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    setProgress((audio.currentTime / audio.duration) * 100);
  };

  const handleProgressChange = (e) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    audio.currentTime = (e.target.value / 100) * audio.duration;
    setProgress(e.target.value);
  };

  const handleEnded = () => {
    setCurrentSongIndex((prev) => (prev + 1) % playlist.length);
  };

  return (
    <div className="player-container">
      <div className="player-card">
        <h2 className="player-title">Mi Música</h2>

        <div className={`vinyl ${isPlaying ? "spin" : ""}`}>
          <div className="vinyl-center"></div>
        </div>

        <div className="song-info">
          <h3>{currentSong.title}</h3>
          <p>{currentSong.artist}</p>
        </div>

        <input
          type="range"
          value={progress}
          onChange={handleProgressChange}
          className="progress-bar"
        />

        <div className="controls">
          <button onClick={() =>
            setCurrentSongIndex((prev) =>
              prev === 0 ? playlist.length - 1 : prev - 1
            )
          }>
            ⏮
          </button>

          <button
            className="play-btn"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? "⏸" : "▶"}
          </button>

          <button onClick={() =>
            setCurrentSongIndex((prev) => (prev + 1) % playlist.length)
          }>
            ⏭
          </button>
        </div>

        <div className="playlist">
          {playlist.map((song, index) => (
            <div
              key={song.id}
              className={`playlist-item ${
                index === currentSongIndex ? "active" : ""
              }`}
              onClick={() => setCurrentSongIndex(index)}
            >
              {song.title}
            </div>
          ))}
        </div>

        <audio
          ref={audioRef}
          src={currentSong.url}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
        />
      </div>
    </div>
  );
}


const styles = {
  container: {
    padding: "0px",
    backgroundColor: "#0f172a",
    minHeight: "100vh",
    color: "white",

    // --- AJUSTE PARA SIDEBAR FIXED ---
    width: "calc(100% - 240px)",
    boxSizing: "border-box",
  },
};

export default MusicPlayer2;