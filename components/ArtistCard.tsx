"use client";

import Link from "next/link";

const ArtistCard = ({ artist }: { artist: any }) => {
  return (
    <Link
      href={`/artist/${artist.artistId}`}
      className="bg-slate-900/60 rounded-xl px-4 py-5 flex flex-col items-center gap-3 hover:bg-slate-800/90 hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
    >
      <img
        src={artist.artworkUrl100}
        alt={artist.artistName}
        className="w-16 h-16 rounded-full object-cover shadow-md"
      />
      <p className="text-sm font-semibold text-center truncate w-full">
        {artist.artistName}
      </p>
    </Link>
  );
};

export default ArtistCard;
