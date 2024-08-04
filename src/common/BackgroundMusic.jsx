import React, { useEffect, useRef, useState } from 'react';

const BackgroundMusic = ({ shouldPlay, musicSrc, onPlayPause, onVolumeChange }) => {
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(0.5); // Default volume

  useEffect(() => {
    console.log('Music Source:', musicSrc); // Log the music source to check the path
    if (audioRef.current) {
      audioRef.current.src = musicSrc;
      audioRef.current.load();
      if (shouldPlay) {
        audioRef.current.play().catch(error => console.log('Failed to play audio:', error));
      } else {
        audioRef.current.pause();
      }
    }
  }, [musicSrc, shouldPlay]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    onVolumeChange(newVolume);
  };

  return (
    <div>
      <audio ref={audioRef} loop>
        <source src={musicSrc} type="audio/mpeg" />
        <source src={musicSrc.replace('.mp3', '.ogg')} type="audio/ogg" />
        Your browser does not support the audio element.
      </audio>
      <div>
        <button onClick={onPlayPause}>{shouldPlay ? 'Pause' : 'Play'}</button>
        <label htmlFor="volume">Volume: </label>
        <input
          type="range"
          id="volume"
          name="volume"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  );
};

export default BackgroundMusic;
