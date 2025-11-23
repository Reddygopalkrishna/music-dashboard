"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { Button } from "@/components/ui/button";
import CreatePlaylistModal from "@/components/playlist/CreatePlaylistModal";
import RenamePlaylistModal from "@/components/playlist/RenamePlaylistModal";
import DeletePlaylistModal from "@/components/playlist/DeletePlaylistModal";
import Link from "next/link";

import {
  renamePlaylist,
  deletePlaylist,
} from "@/lib/slices/playlistSlice";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { MoreVertical } from "lucide-react";
import type { Playlist } from "@/lib/types/playlist";

const PlaylistsPage = () => {
  const dispatch = useDispatch();

  // MODAL STATES (PUT THEM AT THE TOP)
  const [showModal, setShowModal] = useState(false);

const [renameTarget, setRenameTarget] = useState<Playlist | null>(null);
const [deleteTarget, setDeleteTarget] = useState<Playlist | null>(null);


  // PLAYLIST STATE
  const playlists = useSelector(
    (state: RootState) => state.playlists.playlists
  );

  //  HANDLERS (PUT THESE **INSIDE** THE COMPONENT, AFTER STATES)
const handleRename = (newName: string) => {
  if (!renameTarget) return;

  dispatch(
    renamePlaylist({
     id: renameTarget.id,
      name: newName,
    })
  );

  setRenameTarget(null);
};



  const handleDelete = () => {
    if (deleteTarget) {
      dispatch(deletePlaylist(deleteTarget.id));
    }

    setDeleteTarget(null);
  };

  return (
    <div className="p-6 pt-28">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mr-8">Your Playlists</h1>
        <Button onClick={() => setShowModal(true)}>+ Create Playlist</Button>
      </div>

      {/* PLAYLIST LIST */}
      {playlists.length === 0 ? (
        <p className="text-sm opacity-70 mt-20">No playlists yet</p>
      ) : (
        <div className="space-y-3">
          {playlists.map((pl) => (
            <div
              key={pl.id}
              className="relative p-4 rounded-xl bg-accent text-black dark:text-white dark:bg-neutral-800 hover:bg-accent/80 transition"
            >
              <Link href={`/playlists/${pl.id}`}>
                <h3 className="text-lg font-semibold">{pl.name}</h3>
                <p className="text-sm opacity-70">{pl.tracks.length} songs</p>
              </Link>

              {/* 3 DOTS MENU */}
              <DropdownMenu>
                <DropdownMenuTrigger className="absolute top-2 right-2 p-1 rounded-lg hover:bg-black/20">
                  <MoreVertical size={18} />
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setRenameTarget(pl)}>
                    Rename
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={() => setDeleteTarget(pl)}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      )}

      {/* CREATE PLAYLIST MODAL */}
      {showModal && <CreatePlaylistModal onClose={() => setShowModal(false)} />}

      {/* RENAME MODAL */}
      {renameTarget && (
        <RenamePlaylistModal
          playlist={renameTarget}
          onCancel={() => setRenameTarget(null)}
          onRename={handleRename}
        />
      )}

      {/* DELETE MODAL */}
      {deleteTarget && (
        <DeletePlaylistModal
          playlist={deleteTarget}
          onCancel={() => setDeleteTarget(null)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default PlaylistsPage;
