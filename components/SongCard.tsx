"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { setQueue } from "@/lib/slices/playerSlice";
import { addTrackToPlaylist } from "@/lib/slices/playlistSlice";
import { toggleLike } from "@/lib/slices/likedSlice";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { MoreVertical } from "lucide-react";
import { toast } from "sonner";

const SongCard = ({ song, allSongs }: any) => {
  const dispatch = useDispatch();

  const playlists = useSelector((state: RootState) => state.playlists.playlists);
  const liked = useSelector((state: RootState) => state.liked.liked);

  const isLiked = liked.some((t) => t.id === song.trackId);


  const playSong = () => {
    if (!allSongs || allSongs.length === 0) return;

    const startIndex = allSongs.findIndex(
      (s: any) => s.trackId === song.trackId
    );

    dispatch(
      setQueue({
        tracks: allSongs.map((s: any) => ({
          title: s.trackName,
          artist: s.artistName,
          artwork: s.artworkUrl100,
          previewUrl: s.previewUrl,
          id: s.trackId,
          durationMillis: s.trackTimeMillis,
        })),
        startIndex,
      })
    );
  };

  const handleAddToPlaylist = (playlistId: string) => {
    dispatch(
      addTrackToPlaylist({
        playlistId,
        track: {
          title: song.trackName,
          artist: song.artistName,
          artwork: song.artworkUrl100,
          previewUrl: song.previewUrl,
          id: song.trackId,
          durationMillis: song.trackTimeMillis,
        },
      })
    );

    toast.success("Song added to playlist");
  };

 
  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();

    dispatch(
      toggleLike({
        id: song.trackId,
        title: song.trackName,
        artist: song.artistName,
        artwork: song.artworkUrl100,
        previewUrl: song.previewUrl,
        durationMillis: song.trackTimeMillis,
      })
    );

    toast.success(isLiked ? "Removed from liked songs" : "Added to liked songs");
  };

  return (
    <div className="cursor-pointer bg-card rounded-lg p-3 hover:bg-accent transition relative">

      <DropdownMenu>
        <DropdownMenuTrigger className="absolute top-2 right-2 p-1 rounded-full bg-black/40 hover:bg-black/60">
          <MoreVertical size={18} />
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem onClick={playSong}>Play</DropdownMenuItem>

          <DropdownMenuItem disabled>Add to playlist:</DropdownMenuItem>

          {playlists.length > 0 ? (
            playlists.map((pl) => (
              <DropdownMenuItem
                key={pl.id}
                onClick={() => handleAddToPlaylist(pl.id)}
              >
                {pl.name}
              </DropdownMenuItem>
            ))
          ) : (
            <DropdownMenuItem disabled>No playlists found</DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <button
        onClick={handleLike}
        className="absolute bottom-2 right-2 p-1 bg-black/40 rounded-full hover:bg-black/60 transition"
      >
        {isLiked ? "💙" : "🤍"}
      </button>

      <img
        src={song.artworkUrl100}
        alt={song.trackName}
        className="rounded-md w-full"
        onClick={playSong}
      />

      <h3 className="font-semibold mt-2 text-sm truncate">{song.trackName}</h3>

      <p className="text-xs text-muted-foreground truncate">
        {song.artistName}
      </p>

      <p className="text-xs opacity-60">
        {song.trackTimeMillis
          ? new Date(song.trackTimeMillis).toISOString().slice(14, 19)
          : "00:30"}
      </p>
    </div>
  );
};

export default SongCard;
