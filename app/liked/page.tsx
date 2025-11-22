"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import SongCard from "@/components/SongCard";

export default function LikedSongsPage() {
  const liked = useSelector((state: RootState) => state.liked.liked);

  return (
    <div className="px-6 py-6">
      <h1 className="text-2xl font-bold mb-6 mt-5">Liked Songs</h1>

      {liked.length === 0 ? (
        <p className="opacity-70">You haven't liked any songs yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {liked.map((song) => (
            <SongCard 
              key={song.id} 
              song={{
                trackId: song.id,
                trackName: song.title,
                artistName: song.artist,
                artworkUrl100: song.artwork,
                previewUrl: song.previewUrl,
                trackTimeMillis: song.durationMillis,
              }} 
              allSongs={liked.map(l => ({
                trackId: l.id,
                trackName: l.title,
                artistName: l.artist,
                artworkUrl100: l.artwork,
                previewUrl: l.previewUrl,
                trackTimeMillis: l.durationMillis,
              }))}
            />
          ))}
        </div>
      )}
    </div>
  );
}
