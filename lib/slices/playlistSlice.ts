"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Playlist {
  id: string;
  name: string;
  tracks: any[];
}

interface PlaylistState {
  playlists: Playlist[];
  hydrated: boolean; // 👈 NEW
}

const initialState: PlaylistState = {
  playlists: [],
  hydrated: false,
};

export const playlistSlice = createSlice({
  name: "playlists",
  initialState,
  reducers: {
    hydratePlaylists: (state, action: PayloadAction<Playlist[]>) => {
      state.playlists = action.payload;
      state.hydrated = true;
    },

    createPlaylist: (state, action: PayloadAction<string>) => {
      state.playlists.push({
        id: Date.now().toString(),
        name: action.payload,
        tracks: [],
      });

      // save
      if (typeof window !== "undefined") {
        localStorage.setItem("playlists", JSON.stringify(state.playlists));
      }
    },

    addTrackToPlaylist: (
      state,
      action: PayloadAction<{ playlistId: string; track: any }>
    ) => {
      const playlist = state.playlists.find(
        (p) => p.id === action.payload.playlistId
      );

      if (playlist) {
        playlist.tracks.push(action.payload.track);

        if (typeof window !== "undefined") {
          localStorage.setItem("playlists", JSON.stringify(state.playlists));
        }
      }
    },
    removeTrackFromPlaylist: (
      state,
      action: PayloadAction<{ playlistId: string; index: number }>
      ) => {
      const playlist = state.playlists.find(
        (p) => p.id === action.payload.playlistId
      );

      if (playlist) {
        playlist.tracks.splice(action.payload.index, 1);
        localStorage.setItem("playlists", JSON.stringify(state.playlists));
      }
    },
    renamePlaylist: (state, action) => {
  const { id, name } = action.payload;
  const pl = state.playlists.find((p) => p.id === id);
  if (pl) pl.name = name;
  localStorage.setItem("playlists", JSON.stringify(state.playlists));
},

deletePlaylist: (state, action) => {
  state.playlists = state.playlists.filter((p) => p.id !== action.payload);
  localStorage.setItem("playlists", JSON.stringify(state.playlists));
},


  },
});

export const {
  hydratePlaylists,
  createPlaylist,
  addTrackToPlaylist,
  removeTrackFromPlaylist,
  renamePlaylist,
  deletePlaylist
} = playlistSlice.actions;



export const playlistReducer = playlistSlice.reducer;
