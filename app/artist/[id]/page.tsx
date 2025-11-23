"use client";

import { useQuery } from "@tanstack/react-query";

interface ArtistPageProps {
  params: {
    id: string;
  };
}

interface ArtistLookupResponse {
  resultCount: number;
  results: {
    artistId: string;
    artistName: string;
    primaryGenreName?: string;
  }[];
}

interface SongItem {
  artistId: string;
  collectionId?: number;
  trackId: number;
  trackName: string;
  artistName: string;
  artworkUrl100?: string;
}

interface SongsSearchResponse {
  resultCount: number;
  results: SongItem[];
}

export default function ArtistPage({ params }: ArtistPageProps) {
  const { id } = params;

  // Fetch artist details
  const artistQuery = useQuery<ArtistLookupResponse>({
    queryKey: ["artist", id],
    queryFn: async () => {
      const res = await fetch(
        `https://itunes.apple.com/lookup?id=${id}&entity=musicArtist`
      );
      return res.json();
    },
  });

  // Fetch artist songs
  const songsQuery = useQuery<SongsSearchResponse>({
    queryKey: ["artistSongs", id],
    queryFn: async () => {
      const res = await fetch(
        `https://itunes.apple.com/search?term=${id}&entity=song&limit=20`
      );
      return res.json();
    },
  });

  if (artistQuery.isLoading || songsQuery.isLoading) {
    return <p className="p-6">Loading...</p>;
  }

  if (!artistQuery.data || !songsQuery.data) {
    return <p className="p-6">Artist not found.</p>;
  }

  const artist = artistQuery.data.results?.[0];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{artist?.artistName}</h1>

      {/* ---- Artist Image Selection Logic (Fully Typed) ---- */}
      {(() => {
        const directImage = songsQuery.data.results.find(
          (s: SongItem) =>
            s.artistId === artist?.artistId && Boolean(s.artworkUrl100)
        )?.artworkUrl100;

        const albumImage = songsQuery.data.results.find(
          (s: SongItem) => s.collectionId && s.artworkUrl100
        )?.artworkUrl100;

        const fallbackImage = "https://via.placeholder.com/300";

        const imageToShow = directImage || albumImage || fallbackImage;

        return (
          <img
            src={imageToShow}
            alt="Artist Cover"
            className="w-40 h-40 rounded-full mb-6"
          />
        );
      })()}

      <h2 className="text-xl font-semibold mb-3">Songs</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {songsQuery.data.results.map((song: SongItem) => (
          <div
            key={song.trackId}
            className="bg-card p-3 rounded-lg shadow hover:bg-accent transition"
          >
            <img
              src={song.artworkUrl100}
              className="rounded-md w-full"
              alt={song.trackName}
            />
            <p className="font-semibold text-sm mt-2 truncate">
              {song.trackName}
            </p>
            <p className="text-xs opacity-70 truncate">{song.artistName}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
