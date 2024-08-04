import { useRef, useEffect, useState } from 'react';

const useAudio = () => {
  const audioRef = useRef(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [src, setSrc] = useState('');

  const handleFade = (startVolume, endVolume, duration, callback) => {
    const fadeSteps = Math.abs(endVolume - startVolume) * 100;
    const fadeInterval = duration / fadeSteps;
    let currentVolume = startVolume;

    const fadeAudio = () => {
      if ((endVolume > startVolume && currentVolume < endVolume) ||
          (endVolume < startVolume && currentVolume > endVolume)) {
        currentVolume += (endVolume - startVolume) / fadeSteps;
        audioRef.current.volume = Math.min(Math.max(currentVolume, 0), 1); // Ensure volume stays within [0, 1]
        setTimeout(fadeAudio, fadeInterval);
      } else {
        audioRef.current.volume = endVolume;
        if (endVolume === 0) {
          audioRef.current.pause();
        }
        if (callback) callback();
      }
    };
    fadeAudio();
  };

  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = true;

    if (isPlaying) {
      audio.play().catch(error => console.log('Failed to play audio:', error));
    }

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (src) {
      audioRef.current.src = src;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(error => console.log('Failed to play audio:', error));
      }
    }
  }, [src, isPlaying]);

  const play = () => {
    setIsPlaying(true);
    audioRef.current.play().catch(error => console.log('Failed to play audio:', error));
  };

  const pause = () => setIsPlaying(false);

  const fadeIn = (duration) => handleFade(audioRef.current.volume, volume, duration);

  const fadeOut = (duration, callback) => handleFade(audioRef.current.volume, 0, duration, callback);

  return { isPlaying, volume, setVolume, play, pause, fadeIn, fadeOut, setSrc };
};

export default useAudio;