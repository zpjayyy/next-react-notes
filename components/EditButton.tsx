import React from "react";
import Link from "next/link";

export default function EditButton({
  noteId,
  children,
}: {
  noteId: string;
  children: React.ReactNode;
}) {
  const isDraft = noteId == null;
  return (
    <Link
      href={`/note/edit/${noteId || ""}`}
      className="bg-blue-400 rounded-xl">
      <button className="text-xl text-white my-1 mx-2" role="menuitem">
        {children}
      </button>
    </Link>
  );
}
