export const getUniqueArtists = (songs: any[]) => {
  const artistsMap: any = {};

  songs.forEach((song) => {
    if (!artistsMap[song.artistId]) {
      artistsMap[song.artistId] = {
        artistId: song.artistId,
        artistName: song.artistName,
        artworkUrl100: song.artworkUrl100,
      };
    }
  });

  return Object.values(artistsMap);
};
