"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import SongCard from "@/components/SongCard";

const ArtistPage = () => {
  const { id } = useParams();

  const artistQuery = useQuery({
    queryKey: ["artist", id],
    queryFn: async () => {
      const res = await fetch(
        `https://itunes.apple.com/lookup?id=${id}&entity=musicArtist`
      );
      return res.json();
    },
  });

  const songsQuery = useQuery({
    queryKey: ["artistSongs", id],
    queryFn: async () => {
      const res = await fetch(
        `https://itunes.apple.com/lookup?id=${id}&entity=song&limit=20`
      );
      return res.json();
    },
  });

  if (artistQuery.isLoading || songsQuery.isLoading)
    return <p className="p-6">Loading...</p>;

  const artist = artistQuery.data.results[0];

  return (
    <div className="p-6 space-y-6 mt-20">
 
<div className="flex items-center gap-6">
  {(() => {
    const directImage = songsQuery.data.results.find(
      (s: any) => s.artistId == id && s.artworkUrl100

    )?.artworkUrl100;

    const albumImage = songsQuery.data.results.find(
      (s: any) => s.artistId == id && s.artworkUrl100

    )?.artworkUrl100;


const fallback = (
  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-rose-500 via-purple-500 to-indigo-500 flex items-center justify-center text-5xl font-bold text-white shadow-[0_0_25px_rgba(0,0,0,0.3)] ring-4 ring-white/20">
    {artist.artistName.charAt(0)}
  </div>
);


    const finalImage = directImage || albumImage;

    return finalImage ? (
      <img
        src={finalImage.replace("100x100", "600x600")} // bigger image
        alt={artist.artistName}
        className="w-32 h-32 rounded-full object-cover shadow-lg"
      />
    ) : (
      fallback
    );
  })()}

  <div>
    <h1 className="text-3xl font-bold">{artist.artistName}</h1>
    <p className="opacity-70">Artist</p>
  </div>
  
</div>

      <div>
        <h2 className="text-xl font-bold mb-4">Top Songs</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {songsQuery.data.results
            .filter((song) => song.kind === "song")
            .map((song) => (
              <SongCard key={song.trackId} song={song} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistPage;
