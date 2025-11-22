"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SongCard from "@/components/SongCard";
import SkeletonGrid from "@/components/SkeletonGrid";

const GENRES = [
  { label: "All", value: "" },
  { label: "Pop", value: "pop" },
  { label: "Rock", value: "rock" },
  { label: "Hip Hop", value: "hiphop" },
  { label: "Electronic", value: "electronic" },
];

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState(false);

  // Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [query]);

  // Fetch when debouncedQuery or genre changes
  useEffect(() => {
    const fetchData = async () => {
      if (!debouncedQuery) {
        setResults([]);
        return;
      }
      setLoading(true);

      const term = encodeURIComponent(
        genre ? `${debouncedQuery} ${genre}` : debouncedQuery
      );

      const res = await fetch(
        `https://itunes.apple.com/search?term=${term}&entity=song&limit=30`
      );
      const data = await res.json();
      setResults(data.results || []);
      setLoading(false);
    };

    fetchData();
  }, [debouncedQuery, genre]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    setDebouncedQuery(query.trim());
  };

  return (
    <main className="pt-28 px-6 space-y-8" aria-label="Search music">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">Search</h1>
        <p className="text-sm text-muted-foreground">
          Search for songs and filter by genre.
        </p>
      </header>

      {/* Search form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-4 items-stretch md:items-end"
        aria-label="Song search form"
      >
        <div className="flex-1 space-y-2">
          <label
            htmlFor="search-input"
            className="text-sm font-medium"
          >
            Song, artist or album
          </label>
          <Input
            id="search-input"
            placeholder="Search for a track…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="w-full md:w-48 space-y-2">
          <label
            htmlFor="genre-select"
            className="text-sm font-medium"
          >
            Genre (optional)
          </label>
          <select
            id="genre-select"
            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            {GENRES.map((g) => (
              <option key={g.value} value={g.value}>
                {g.label}
              </option>
            ))}
          </select>
        </div>

        <Button type="submit" className="md:self-auto">
          Search
        </Button>
      </form>

      {/* Results */}
      <section
        aria-label="Search results"
        aria-live="polite"
        className="space-y-4"
      >
        {loading && <SkeletonGrid />}

        {!loading && results.length === 0 && touched && (
          <p className="text-sm text-muted-foreground">
            No results found for “{debouncedQuery}”.
          </p>
        )}

        {!loading && results.length > 0 && (
          <div
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
            role="list"
          >
            {results.map((song) => (
              <article key={song.trackId} role="listitem">
                <SongCard song={song} allSongs={results} />
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default SearchPage;
