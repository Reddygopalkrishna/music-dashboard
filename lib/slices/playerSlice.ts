"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Track {
  title: string;
  artist: string;
  artwork: string;
  previewUrl: string;
  // optional extra fields if you want later
  id?: string | number;
  durationMillis?: number;
}

interface PlayerState {
  queue: Track[];
  currentIndex: number;
  isPlaying: boolean;
}

const initialState: PlayerState = {
  queue: [],
  currentIndex: 0,
  isPlaying: false,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    // Keep this for compatibility with SongCard (single track play)
    setTrack: (state, action: PayloadAction<Track>) => {
      state.queue = [action.payload];
      state.currentIndex = 0;
      state.isPlaying = true;
    },

    // Set full queue (e.g. play whole playlist or trending list)
    setQueue: (
      state,
      action: PayloadAction<{ tracks: Track[]; startIndex?: number }>
    ) => {
      state.queue = action.payload.tracks;
      state.currentIndex = action.payload.startIndex ?? 0;
      state.isPlaying = true;
    },

    togglePlay: (state) => {
      state.isPlaying = !state.isPlaying;
    },

    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },

    nextTrack: (state) => {
      if (state.queue.length === 0) return;

      if (state.currentIndex < state.queue.length - 1) {
        state.currentIndex += 1;
        state.isPlaying = true;
      } else {
        // reached end – stop playback
        state.isPlaying = false;
      }
    },

    prevTrack: (state) => {
      if (state.queue.length === 0) return;

      if (state.currentIndex > 0) {
        state.currentIndex -= 1;
        state.isPlaying = true;
      } else {
        // already at first – restart
        state.currentIndex = 0;
      }
    },
  },
});

export const {
  setTrack,
  setQueue,
  togglePlay,
  setIsPlaying,
  nextTrack,
  prevTrack,
} = playerSlice.actions;

export const playerReducer = playerSlice.reducer;
