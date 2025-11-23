"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface RenamePlaylistModalProps {
  playlist: {
    id: string;
    name: string;
  } | null;
  onCancel: () => void;
  onRename: (newName: string) => void;
}

const RenamePlaylistModal = ({ playlist, onCancel, onRename }: RenamePlaylistModalProps) => {
  const [newName, setNewName] = useState(playlist?.name || "");

  if (!playlist) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-md shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-3">Rename Playlist</h2>

        <input
          className="border w-full p-2 rounded mb-4"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button onClick={() => onRename(newName)}>Save</Button>
        </div>
      </div>
    </div>
  );
};

export default RenamePlaylistModal;
