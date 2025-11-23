"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface DeletePlaylistModalProps {
  playlist: {
    id: string;
    name: string;
  } | null;
  onCancel: () => void;
  onDelete: () => void;
}

const DeletePlaylistModal = ({ playlist, onCancel, onDelete }: DeletePlaylistModalProps) => {
  if (!playlist) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-md shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-4">
          Delete "{playlist.name}"?
        </h2>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button variant="destructive" onClick={onDelete}>Delete</Button>
        </div>
      </div>
    </div>
  );
};

export default DeletePlaylistModal;
