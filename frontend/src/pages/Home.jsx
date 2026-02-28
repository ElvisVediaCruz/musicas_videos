import "../styles/dashboard.css";
function Home() {
  return <h1>Bienvenido al sistema</h1>;
}
export default Home;


/*

import { useState, useRef, useEffect } from 'react';

const playlist = [
  { id: 1, title: 'Noche de Verano', artist: 'Luna Azul', duration: 234, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 2, title: 'Caminos del Sol', artist: 'Los Viajeros', duration: 198, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { id: 3, title: 'Melodía del Mar', artist: 'Costa Brava', duration: 267, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
];

function MusicPlayer (){
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(70);

  const audioRef = useRef(null);
  const currentSong = playlist[currentSongIndex];

  // Actualizar progreso
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', nextSong);
    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', nextSong);
    };
  }, [currentSongIndex]);

  // Manejar Play/Pause
  useEffect(() => {
  const audio = audioRef.current;
  if (!audio) return;   // 🔥 protección

  if (isPlaying) {
    audio.play().catch(() => setIsPlaying(false));
  } else {
    audio.pause();
  }
}, [isPlaying, currentSongIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const nextSong = () => {
    setCurrentSongIndex((prev) => (prev + 1) % playlist.length);
    setProgress(0);
  };

  const prevSong = () => {
    if (currentTime > 3) {
      audioRef.current.currentTime = 0;
    } else {
      setCurrentSongIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    }
  };

  const handleProgressChange = (e) => {
    const newTime = (e.target.value / 100) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
    setProgress(e.target.value);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center justify-center h-full bg-slate-950 p-6">
      <div className="w-full max-w-md bg-slate-900/50 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-2xl border border-slate-800">
        
        {/* Header con Ecualizador Animado }
        <div className="text-center mb-8">
          <h1 className="text-white text-2xl font-bold mb-3">Mi Música</h1>
          <div className="flex justify-center items-end gap-1 h-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`w-1 bg-orange-500 rounded-full transition-all duration-300 ${isPlaying ? 'animate-bounce' : 'h-2'}`}
                style={{ animationDelay: `${i * 0.1}s`, height: isPlaying ? '100%' : '8px' }}
              />
            ))}
          </div>
        </div>

        {/* Disco de Vinilo }
        <div className="relative flex justify-center mb-10">
          <div className={`w-52 h-52 rounded-full bg-gradient-to-br from-slate-700 to-black shadow-[0_0_50px_rgba(249,115,22,0.2)] flex items-center justify-center relative overflow-hidden transition-transform duration-1000 ${isPlaying ? 'rotate-infinite animate-[spin_3s_linear_infinite]' : ''}`}>
            <div className="absolute inset-2 rounded-full border border-slate-800/50"></div>
            <div className="absolute inset-8 rounded-full border border-slate-800/50"></div>
            <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center z-10 shadow-inner">
              <div className="w-3 h-3 bg-slate-900 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Info de la canción }
        <div className="text-center mb-8">
          <h2 className="text-white text-xl font-semibold truncate">{currentSong.title}</h2>
          <p className="text-slate-400">{currentSong.artist}</p>
        </div>

        {/* Barra de Progreso }
        <div className="mb-8">
          <input
            type="range"
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
            value={progress}
            onChange={handleProgressChange}
          />
          <div className="flex justify-between text-xs text-slate-500 mt-2">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(audioRef.current?.duration || currentSong.duration)}</span>
          </div>
        </div>

        {/* Controles Principales }
        <div className="flex items-center justify-between mb-8 px-4">
          <button onClick={() => {/* Lógica shuffle }} className="text-slate-500 hover:text-orange-500 transition-colors">
            <ShuffleIcon />
          </button>
          
          <div className="flex items-center gap-6">
            <button onClick={prevSong} className="text-white hover:text-orange-500 transition-transform active:scale-90">
              <PrevIcon />
            </button>
            
            <button 
              onClick={togglePlay}
              className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-orange-500/40 hover:scale-105 active:scale-95 transition-all"
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>

            <button onClick={nextSong} className="text-white hover:text-orange-500 transition-transform active:scale-90">
              <NextIcon />
            </button>
          </div>

          <button onClick={() => {/* Lógica repeat }} className="text-slate-500 hover:text-orange-500 transition-colors">
            <RepeatIcon />
          </button>
        </div>

        {/* Lista de reproducción mini }
        <div className="bg-slate-950/50 rounded-2xl p-4 max-h-40 overflow-y-auto border border-slate-800/50">
          {playlist.map((song, index) => (
            <div 
              key={song.id}
              onClick={() => setCurrentSongIndex(index)}
              className={`flex items-center gap-3 p-2 rounded-xl cursor-pointer transition-colors ${index === currentSongIndex ? 'bg-orange-500/10 border-l-2 border-orange-500' : 'hover:bg-slate-800/50'}`}
            >
              <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-orange-500 text-xs font-bold">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium truncate ${index === currentSongIndex ? 'text-orange-500' : 'text-white'}`}>{song.title}</p>
                <p className="text-[10px] text-slate-500">{song.artist}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Audio Element Oculto }
        <audio ref={audioRef} src={currentSong.url} />
      </div>
    </div>
  );
};

// --- Iconos SVG ---
const PlayIcon = () => <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>;
const PauseIcon = () => <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>;
const PrevIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" /></svg>;
const NextIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" /></svg>;
const ShuffleIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>;
const RepeatIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>;

export default MusicPlayer;

 */