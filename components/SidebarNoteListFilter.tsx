"use client";

import { Note } from "@/lib/redis";
import { useSearchParams } from "next/navigation";
import React from "react";
import SidebarNoteContent from "@/components/SidebarNoteContent";

export default function SidebarNoteListFilter({
  notes,
}: {
  notes: { note: Note; header: React.ReactNode }[];
}) {
  const searchParams = useSearchParams();
  const searchText = searchParams.get("q");

  return (
    <ul>
      {notes.map((value) => {
        const { note, header } = value;
        if (
          !searchText ||
          (searchText &&
            note.title.toLowerCase().includes(searchText.toLowerCase()))
        ) {
          return (
            <li>
              <SidebarNoteContent
                id={note.id}
                title={note.title}
                expandedChildren={
                  <p className="text-xl">
                    {note.content.substring(0, 20) || <i>(No content)</i>}
                  </p>
                }
              >
                {header}
              </SidebarNoteContent>
            </li>
          );
        }
        return null;
      })}
    </ul>
  );
}
