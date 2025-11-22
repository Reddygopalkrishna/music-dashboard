"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { setTrack } from "@/lib/slices/playerSlice";
import { removeTrackFromPlaylist } from "@/lib/slices/playlistSlice";
import { Trash } from "lucide-react";

const PlaylistDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const playlist = useSelector((state: RootState) =>
    state.playlists.playlists.find((p) => p.id === id)
  );

  if (!playlist) {
    return <p className="p-6">Playlist not found.</p>;
  }

  return (
    <div className="p-6 space-y-4 mt-20">
      <h1 className="text-3xl font-bold">{playlist.name}</h1>

      {playlist.tracks.length === 0 ? (
        <p className="opacity-70 text-sm">No songs in this playlist</p>
      ) : (
        <div className="space-y-3">
          {playlist.tracks.map((track, index) => (
            <div
              key={index}
              className="p-3 bg-accent rounded-md flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{track.title}</p>
                <p className="text-xs opacity-70">{track.artist}</p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  onClick={() => dispatch(setTrack(track))}
                >
                  Play
                </Button>

                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() =>
                    dispatch(
                      removeTrackFromPlaylist({
                        playlistId: playlist.id,
                        index,
                      })
                    )
                  }
                >
                  <Trash size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlaylistDetailsPage;
