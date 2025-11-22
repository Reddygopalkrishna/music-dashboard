"use client";

import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { togglePlay, nextTrack, prevTrack } from "@/lib/slices/playerSlice";

import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";

export default function Player() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const dispatch = useDispatch();

  const { queue, currentIndex, isPlaying } = useSelector(
    (state: RootState) => state.player
  );

  const currentTrack = queue[currentIndex] || null;

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    if (!audioRef.current) return;
    if (currentTrack && isPlaying) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [currentTrack, isPlaying]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setProgress(audioRef.current.currentTime);
    setDuration(audioRef.current.duration || 0);
  };

  const handleSeek = (value: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = value;
    setProgress(value);
  };

  const handleEnded = () => dispatch(nextTrack());

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  };

  if (!currentTrack) return null;

  return (
<div className="
  fixed
  bottom-15 lg:bottom-0   /* mobile pushes up, desktop sits at bottom */
  left-0 right-0
  bg-black/90 text-white
  border-t border-white/10
  px-4 py-3
  z-50
">

      <div className="grid grid-cols-3 items-center gap-4 w-full">

        <div className="flex items-center gap-3 min-w-0">
          <img
            src={currentTrack.artwork}
            alt={currentTrack.title}
            className="w-12 h-12 rounded-md object-cover"
          />
        </div>

        <div className="flex flex-col items-center text-center min-w-0 mx-auto w-full max-w-md">

          <span className="truncate w-full font-semibold text-sm">
            {currentTrack.title}
          </span>
          <span className="truncate w-full text-xs opacity-70">
            {currentTrack.artist}
          </span>

          <div className="flex items-center gap-2 w-full mt-1">
            <span className="text-[10px] w-8 text-right opacity-70">
              {formatTime(progress)}
            </span>

            <input
              type="range"
              min={0}
              max={duration || 1}
              step={0.1}
              value={progress}
              onChange={(e) => handleSeek(parseFloat(e.target.value))}
              className="w-full"
            />

            <span className="text-[10px] w-8 opacity-70">
              {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center justify-center gap-4 mt-1">
            <button onClick={() => dispatch(prevTrack())}>
              <SkipBack size={20} />
            </button>

            <button
              onClick={() => dispatch(togglePlay())}
              className="p-2 bg-white text-black rounded-full"
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>

            <button onClick={() => dispatch(nextTrack())}>
              <SkipForward size={20} />
            </button>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 w-32">
          <button onClick={() => setVolume(volume === 0 ? 1 : 0)}>
            {volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>

          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-20 md:w-28"
          />
        </div>
      </div>

      <audio
        ref={audioRef}
        src={currentTrack.previewUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />
    </div>
  );
}
