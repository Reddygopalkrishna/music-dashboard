"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const RenamePlaylistModal = ({ playlist, onCancel, onRename }) => {
  const [name, setName] = useState(playlist.name);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl w-80 space-y-4">
        <h2 className="text-lg font-bold">Rename Playlist</h2>

        <Input value={name} onChange={(e) => setName(e.target.value)} />

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={() => onRename(name)}>Save</Button>
        </div>
      </div>
    </div>
  );
};

export default RenamePlaylistModal;
