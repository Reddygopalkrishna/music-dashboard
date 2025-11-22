export const searchSongs = async (query: string) => {
  const res = await fetch(
    `https://itunes.apple.com/search?term=${query}&media=music&limit=25`
  );

  if (!res.ok) throw new Error("Failed to fetch songs");

  return res.json();
};

export const getTrendingSongs = async () => {
  const res = await fetch(
    `https://itunes.apple.com/search?term=top%20hits&media=music&limit=20`
  );

  if (!res.ok) throw new Error("Failed to fetch trending songs");

  return res.json();
};
