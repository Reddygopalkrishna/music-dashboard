"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hydratePlaylists } from "@/lib/slices/playlistSlice";
import { RootState } from "@/lib/store";
import { hydrateLikes } from "@/lib/slices/likedSlice";


const PlaylistHydrator = () => {
  const dispatch = useDispatch();
  const hydrated = useSelector((state: RootState) => state.playlists.hydrated);

  useEffect(() => {
    if (!hydrated && typeof window !== "undefined") {
      const saved = localStorage.getItem("playlists");
      dispatch(hydratePlaylists(saved ? JSON.parse(saved) : []));
    }
    const savedLikes = localStorage.getItem("liked");
    if (savedLikes) {
      dispatch(hydrateLikes(JSON.parse(savedLikes)));
    }

  }, [dispatch, hydrated]);

  return null;
};

export default PlaylistHydrator;
