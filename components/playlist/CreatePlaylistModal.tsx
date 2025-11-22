"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPlaylist } from "@/lib/slices/playlistSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CreatePlaylistModal = ({ onClose }: { onClose: () => void }) => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleCreate = () => {
    if (!name.trim()) return;

    dispatch(createPlaylist(name));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl w-80 space-y-4">
        <h2 className="text-lg font-bold">Create Playlist</h2>

        <Input
          placeholder="Playlist Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleCreate}>Create</Button>
        </div>
      </div>
    </div>
  );
};

export default CreatePlaylistModal;
