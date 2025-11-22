import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LikedTrack {
  id: number;
  title: string;
  artist: string;
  artwork: string;
  previewUrl: string;
  durationMillis?: number;
}

interface LikedState {
  liked: LikedTrack[];
}

const initialState: LikedState = {
  liked: [],
};

const likedSlice = createSlice({
  name: "liked",
  initialState,
  reducers: {
    toggleLike(state, action: PayloadAction<LikedTrack>) {
      const exists = state.liked.find((t) => t.id === action.payload.id);

      if (exists) {
        state.liked = state.liked.filter((t) => t.id !== action.payload.id);
      } else {
        state.liked.push(action.payload);
      }
    },

    hydrateLikes(state, action: PayloadAction<LikedTrack[]>) {
      state.liked = action.payload;
    },
  },
});

export const { toggleLike, hydrateLikes } = likedSlice.actions;
export default likedSlice.reducer;
