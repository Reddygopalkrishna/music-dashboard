"use client";

import { Button } from "@/components/ui/button";

const DeletePlaylistModal = ({ playlist, onCancel, onDelete }) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl w-80 space-y-4">
        <h2 className="text-lg font-bold">Delete Playlist?</h2>
        <p className="text-sm opacity-70">
          Are you sure you want to delete "{playlist.name}"?
        </p>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeletePlaylistModal;
