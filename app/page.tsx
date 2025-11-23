"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTrendingSongs } from "@/lib/api/music";
import SongCard from "@/components/SongCard";
import ArtistCard from "@/components/ArtistCard";
import { getUniqueArtists } from "@/lib/utils/getUniqueArtists";
import SkeletonGrid from "@/components/SkeletonGrid";
import InfiniteScroll from "react-infinite-scroll-component";

const HomePage = () => {
  const trendingQuery = useQuery({
    queryKey: ["trendingSongs"],
    queryFn: getTrendingSongs,
  });

  const [songs, setSongs] = useState<any[]>([]);

  useEffect(() => {
    if (trendingQuery.data?.results) {
      setSongs(trendingQuery.data.results);
    }
  }, [trendingQuery.data]);

  const fetchMoreSongs = async () => {
    const offset = songs.length;

    const res = await fetch(
      `https://itunes.apple.com/search?term=top&entity=song&limit=20&offset=${offset}`
    );
    const newData = await res.json();

    setSongs((prev) => [...prev, ...newData.results]);
  };

  const uniqueArtists = trendingQuery.data
    ? getUniqueArtists(trendingQuery.data.results)
    : [];

  const newReleasesQuery = useQuery({
    queryKey: ["newReleases"],
    queryFn: async () => {
      const res = await fetch(
        "https://itunes.apple.com/search?term=new&entity=song&limit=20"
      );
      return res.json();
    },
  });

  return (
    <main
      className="pt-28 px-6 space-y-14"
      aria-label="Music dashboard home"
    >
      {/* Trending Songs */}
      <section aria-labelledby="trending-heading">
        <header className="flex items-center justify-between mb-4">
          <h1 id="trending-heading" className="text-2xl font-bold">
            Trending Songs
          </h1>
        </header>

        {trendingQuery.isLoading && <SkeletonGrid />}

        {!trendingQuery.isLoading && (
          <InfiniteScroll
            dataLength={songs.length}
            next={fetchMoreSongs}
            hasMore={true}
            loader={
              <p
                className="text-center py-4 text-sm text-muted-foreground"
                aria-live="polite"
              >
                Loading more songs…
              </p>
            }
          >
            <div
              className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
              role="list"
            >
              {songs.map((song) => (
                <article key={song.trackId} role="listitem">
                  <SongCard song={song} allSongs={songs} />
                </article>
              ))}
            </div>
          </InfiniteScroll>
        )}
      </section>

      {/* Popular Artists */}
      <section aria-labelledby="artists-heading">
        <header className="flex items-center justify-between mb-4">
          <h2 id="artists-heading" className="text-xl font-bold">
            Popular Artists
          </h2>
        </header>

        {trendingQuery.isLoading ? (
          <SkeletonGrid />
        ) : (
          <div
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4"
            role="list"
          >
           {uniqueArtists.map((artist: any) => (
  <article key={artist.artistId} role="listitem">
    <ArtistCard artist={artist} />
  </article>
))}

          </div>
        )}
      </section>

      {/* New Releases */}
      <section aria-labelledby="new-releases-heading">
        <header className="flex items-center justify-between mb-4">
          <h2 id="new-releases-heading" className="text-xl font-bold">
            New Releases
          </h2>
        </header>

        {newReleasesQuery.isLoading ? (
          <SkeletonGrid />
        ) : (
          <div
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
            role="list"
          >
            {newReleasesQuery.data?.results?.map((song: any) => (
              <article key={song.trackId} role="listitem">
                <SongCard
                  song={song}
                  allSongs={newReleasesQuery.data.results}
                />
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default HomePage;
